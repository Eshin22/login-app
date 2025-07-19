"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function WorkProgressPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    const res = await axios.get("/api/admin/work-summary");
    setData(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
        ⏳ Reviewer Work Progress
      </h1>

      {data.map((r, i) => (
        <div
          key={i}
          className="bg-gray-800 p-5 rounded-lg shadow hover:bg-gray-700 mb-4"
        >
          <h2 className="text-lg font-semibold text-indigo-300 mb-2">
            {r._id || "Unassigned"}
          </h2>
          {r.papers.map((p: any, idx: number) => (
            <div key={idx} className="mb-2">
              <p className="text-sm font-medium">{p.title}</p>
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    p.reviewCount === 3
                      ? "bg-green-500"
                      : p.reviewCount === 2
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${(p.reviewCount / 3) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400">
                Status: {p.status} | Reviews: {p.reviewCount} / 3
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
