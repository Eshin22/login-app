"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PrintedPapersPage() {
  const [papers, setPapers] = useState<any[]>([]);

  useEffect(() => {
    fetchPrintedPapers();
  }, []);

  const fetchPrintedPapers = async () => {
    const res = await axios.get("/api/admin/printed-papers");
    setPapers(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
        Printed Papers
      </h1>
      {papers.length === 0 ? (
        <p className="text-gray-400">No printed papers yet.</p>
      ) : (
        papers.map((p) => (
          <div
            key={p._id}
            className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition mb-3"
          >
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-400">Subject: {p.subject}</p>
            <p className="text-sm text-gray-400">Collection: {p.collectionId?.name}</p>
            <p className="text-sm text-gray-400">Reviewer: {p.reviewer}</p>
            <p className="text-sm text-gray-400">Reviews: {p.reviewCount} / 3</p>
            {p.reviewLink && (
              <a
                href={p.reviewLink}
                target="_blank"
                className="text-blue-400 hover:underline text-sm"
              >
                📄 View Final Reviewed Paper
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
}
