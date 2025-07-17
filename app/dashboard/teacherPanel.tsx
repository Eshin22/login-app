"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherPage() {
  const [printedPapers, setPrintedPapers] = useState<any[]>([]);

  useEffect(() => {
    fetchPrintedPapers();
  }, []);

  const fetchPrintedPapers = async () => {
    const res = await axios.get("/api/teacher/printed-papers");
    setPrintedPapers(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
      <div className="space-y-4">
        {printedPapers.map((p) => (
          <div key={p._id} className="bg-gray-800 p-4 rounded-lg">
            <p className="font-bold">{p.title}</p>
            <p className="text-gray-400">
              Collection: {p.collection?.name}
            </p>
            <p className="text-green-400">Printed ✅</p>
          </div>
        ))}
      </div>
    </div>
  );
}
