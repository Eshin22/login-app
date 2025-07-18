"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewerPanel() {
  const [papers, setPapers] = useState<any[]>([]);
  const [updating, setUpdating] = useState(false);

  const reviewerName =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).name
      : "";

  const [reviewData, setReviewData] = useState({
    paperId: "",
    comments: "",
    reviewLink: "",
    reviewCount: 0,
  });

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    if (!reviewerName) return;
    const res = await axios.get(`/api/reviewer/papers?reviewer=${reviewerName}`);
    setPapers(res.data);
  };

  const handleUpdateReview = async () => {
    if (!reviewData.paperId) return alert("Select a paper to update");
    if (reviewData.reviewCount > 3)
      return alert("Maximum 3 reviews allowed per paper");

    try {
      setUpdating(true);
      await axios.put("/api/reviewer/papers", {
        paperId: reviewData.paperId,
        reviewer: reviewerName,
        comments: reviewData.comments,
        reviewLink: reviewData.reviewLink,
        reviewCount: reviewData.reviewCount,
      });

      alert("Review updated successfully!");
      setReviewData({
        paperId: "",
        comments: "",
        reviewLink: "",
        reviewCount: 0,
      });
      fetchPapers(); // ✅ Refresh papers after update
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-8">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
        Reviewer Dashboard
      </h1>
      <p className="text-gray-400">
        View assigned papers, upload reviewed files, and leave comments (max 3 reviews).
      </p>

      {papers.length === 0 ? (
        <p className="text-gray-500">No papers assigned.</p>
      ) : (
        papers.map((p) => (
          <div
            key={p._id}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-400">Subject: {p.subject}</p>
            <p className="text-sm text-gray-400">Collection: {p.collectionId?.name}</p>
            <p className="text-sm text-gray-400">Status: {p.status}</p>

            {/* ✅ SHOW REVIEW COUNT */}
            <p className="text-sm text-yellow-400 font-semibold">
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

            {/* ✅ Previous Comments */}
            {p.comments && p.comments.length > 0 && (
              <div className="mt-3 p-3 bg-gray-700 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  Previous Comments:
                </h4>
                {p.comments.map((c: any, i: number) => (
                  <p key={i} className="text-sm text-gray-400">
                    <strong className="text-green-400">{c.reviewer}:</strong> {c.comment}{" "}
                    <span className="text-xs text-gray-500">
                      ({new Date(c.createdAt).toLocaleDateString()})
                    </span>
                  </p>
                ))}
              </div>
            )}

            {/* ✅ Review Update Section */}
            {p.reviewCount < 3 ? (
              <div className="mt-4 space-y-2">
                <textarea
                  placeholder="Enter comments"
                  value={reviewData.paperId === p._id ? reviewData.comments : ""}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      paperId: p._id,
                      comments: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="url"
                  placeholder="Reviewed paper Google Drive link"
                  value={reviewData.paperId === p._id ? reviewData.reviewLink : ""}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      paperId: p._id,
                      reviewLink: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={
                    reviewData.paperId === p._id
                      ? reviewData.reviewCount
                      : p.reviewCount || 0
                  }
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      paperId: p._id,
                      reviewCount: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                >
                  {[0, 1, 2, 3].map((num) => (
                    <option key={num} value={num}>
                      Review Count: {num}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleUpdateReview}
                  disabled={updating}
                  className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  {updating ? "Saving..." : "Save Review"}
                </button>
              </div>
            ) : (
              <p className="text-red-400 mt-3">
                ❌ Maximum 3 reviews completed for this paper.
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
