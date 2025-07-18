"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewPapersPage() {
  const [papers, setPapers] = useState<any[]>([]);
  const [updateData, setUpdateData] = useState<{
    paperId: string;
    adminComment: string;
    reviewLink: string;
  }>({
    paperId: "",
    adminComment: "",
    reviewLink: "",
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    const res = await axios.get("/api/admin/papers");
    setPapers(res.data);
  };

  const handleUpdatePaper = async () => {
    if (!updateData.paperId) return alert("Select a paper to update");
    if (!updateData.reviewLink.trim())
      return alert("Please enter a Google Drive link for the reviewed paper.");

    try {
      setUpdating(true);
      await axios.put("/api/admin/review-paper", {
        paperId: updateData.paperId,
        adminComment: updateData.adminComment,
        reviewLink: updateData.reviewLink,
      });

      alert("Paper updated successfully!");
      setUpdateData({ paperId: "", adminComment: "", reviewLink: "" });
      fetchPapers(); // ✅ Refresh updated details
    } catch (error: any) {
      console.error("Error updating paper:", error);
      alert(error.response?.data?.message || "Failed to update paper");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
        Admin Review Papers
      </h1>
      <div className="space-y-4">
        {papers.map((p) => (
          <div
            key={p._id}
            className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition"
          >
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-400">Subject: {p.subject}</p>
            <p className="text-sm text-yellow-400">
              Review Count: {p.reviewCount} / 3
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

            {p.reviewLink && (
              <p className="text-green-400 text-sm mt-1">
                ✅ Final Reviewed Paper:{" "}
                <a
                  href={p.reviewLink}
                  target="_blank"
                  className="underline hover:text-green-300"
                >
                  Open Link
                </a>
              </p>
            )}

            {/* ✅ Show Previous Comments */}
            {p.comments?.length > 0 && (
              <div className="mt-3 bg-gray-700 p-2 rounded">
                <p className="text-gray-300 text-sm mb-1">Reviewer Comments:</p>
                {p.comments.map((c: any, idx: number) => (
                  <p key={idx} className="text-xs text-gray-400">
                    <span className="text-indigo-400 font-semibold">
                      {c.reviewer}:
                    </span>{" "}
                    {c.comment}
                  </p>
                ))}
              </div>
            )}

            {/* ✅ Update Paper Section */}
            <div className="mt-4 space-y-2">
              <textarea
                placeholder="Admin final comment (optional)"
                value={
                  updateData.paperId === p._id ? updateData.adminComment : ""
                }
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    paperId: p._id,
                    adminComment: e.target.value,
                  })
                }
                className="w-full p-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="url"
                placeholder="Final reviewed paper Google Drive link"
                value={
                  updateData.paperId === p._id ? updateData.reviewLink : ""
                }
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    paperId: p._id,
                    reviewLink: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleUpdatePaper}
                disabled={updating}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                {updating ? "Saving..." : "Save Final Review"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
