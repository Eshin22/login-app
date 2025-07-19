"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function PrintedPapersPage() {
  const [papers, setPapers] = useState<any[]>([]);

  useEffect(() => {
    fetchPrintedPapers();
  }, []);

  const fetchPrintedPapers = async () => {
    try {
      const res = await axios.get("/api/teacher/printed-papers");
      setPapers(res.data);
    } catch (error) {
      console.error("Error fetching printed papers:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6">
      {/* ✅ Top Section with Title and Work Progress Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
            Printed Papers
          </h1>
          <p className="text-gray-400">
            View all printed papers with their final comments and review details.
          </p>
        </div>
        <Link
          href="/dashboard/teacher/work-progress"
          className="mt-4 md:mt-0 inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 
            hover:from-yellow-400 hover:to-orange-400 transition shadow-md font-medium text-white text-sm"
        >
          📊 View Work Progress
        </Link>
      </div>

      {/* ✅ Printed Papers List */}
      <div className="space-y-4">
        {papers.length === 0 ? (
          <p className="text-gray-500">No printed papers available.</p>
        ) : (
          papers.map((p) => (
            <div
              key={p._id}
              className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition"
            >
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-400">Subject: {p.subject}</p>
              <p className="text-sm text-gray-400">
                Collection: {p.collectionId?.name}
              </p>
              <p className="text-sm text-green-400 font-semibold">
                ✅ Printed
              </p>

              {p.driveLink && (
                <a
                  href={p.driveLink}
                  target="_blank"
                  className="text-blue-400 hover:underline text-sm"
                >
                  📄 View Original Paper
                </a>
              )}

              {p.comments?.length > 0 && (
                <div className="mt-3 bg-gray-700 p-2 rounded">
                  <p className="text-sm text-gray-300 mb-1">Final Comments:</p>
                  {p.comments.map((c: any, idx: number) => (
                    <p key={idx} className="text-xs text-gray-400">
                      <span className="text-green-400 font-semibold">
                        {c.reviewer}:
                      </span>{" "}
                      {c.comment}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
