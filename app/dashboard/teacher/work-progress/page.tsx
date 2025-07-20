"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function WorkProgressPage() {
  const [papers, setPapers] = useState<any[]>([]);
  const [teacherComments, setTeacherComments] = useState<{ [paperId: string]: string }>({});
  const [loading, setLoading] = useState(false);

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

  const handleAddTeacherComment = async (paperId: string) => {
    const comment = teacherComments[paperId]?.trim();
    if (!comment) {
      alert("Please enter a comment before saving.");
      return;
    }

    try {
      setLoading(true);
      await axios.put("/api/teacher/add-comment", { paperId, comment });
      alert("Comment added successfully!");
      setTeacherComments((prev) => ({ ...prev, [paperId]: "" }));
      fetchPrintedPapers(); // ✅ Refresh the updated comments
    } catch (error: any) {
      console.error("Error adding teacher comment:", error);
      alert(error.response?.data?.message || "Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
        Work Progress - Printed Papers
      </h1>
      <p className="text-gray-400">
        View printed papers, reviewer comments, and add your own remarks.
      </p>

      <div className="space-y-4">
        {papers.length === 0 ? (
          <p className="text-gray-500">No printed papers available.</p>
        ) : (
          papers.map((p) => (
            <div
              key={p._id}
              className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition"
            >
              {/* ✅ Paper Information */}
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-400">Subject: {p.subject}</p>
              <p className="text-sm text-gray-400">Reviewer: {p.reviewer}</p>
              <p className="text-sm text-green-400 font-semibold">✅ Printed</p>

              {p.driveLink && (
                <a
                  href={p.driveLink}
                  target="_blank"
                  className="text-blue-400 hover:underline text-sm"
                >
                  📄 View Original Paper
                </a>
              )}

              {/* ✅ Reviewer Comments */}
              {p.comments?.length > 0 && (
                <div className="mt-3 bg-gray-700 p-2 rounded">
                  <p className="text-sm text-gray-300 mb-1">Reviewer Comments:</p>
                  {p.comments.map((c: any, idx: number) => (
                    <p key={idx} className="text-xs text-gray-400">
                      <span className="text-green-400">{c.reviewer}:</span> {c.comment}
                      <span className="text-xs text-gray-500 ml-1">
                        ({new Date(c.createdAt).toLocaleDateString()})
                      </span>
                    </p>
                  ))}
                </div>
              )}

              {/* ✅ Teacher Comments */}
              {p.teacherComments?.length > 0 && (
                <div className="mt-3 bg-gray-700 p-2 rounded">
                  <p className="text-sm text-gray-300 mb-1">Teacher Comments:</p>
                  {p.teacherComments.map((tc: any, idx: number) => (
                    <p key={idx} className="text-xs text-gray-400">
                      <span className="text-yellow-400">Teacher:</span> {tc.comment}
                      <span className="text-xs text-gray-500 ml-1">
                        ({new Date(tc.createdAt).toLocaleDateString()})
                      </span>
                    </p>
                  ))}
                </div>
              )}

              {/* ✅ Add Teacher Comment */}
              <div className="mt-4 space-y-2">
                <textarea
                  placeholder="Add your comment..."
                  value={teacherComments[p._id] || ""}
                  onChange={(e) =>
                    setTeacherComments((prev) => ({
                      ...prev,
                      [p._id]: e.target.value,
                    }))
                  }
                  className="w-full p-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  onClick={() => handleAddTeacherComment(p._id)}
                  disabled={loading}
                  className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg"
                >
                  {loading ? "Saving..." : "Save Comment"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
