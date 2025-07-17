"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewerPage() {
  const [papers, setPapers] = useState<any[]>([]);
  const [reviewComments, setReviewComments] = useState<{ [key: string]: string }>({});
  const reviewer = "reviewer@example.com"; // you can replace with logged-in user's email

  useEffect(() => {
    fetchAssignedPapers();
  }, []);

  const fetchAssignedPapers = async () => {
    const res = await axios.get(`/api/reviewer/assignments?reviewer=${reviewer}`);
    setPapers(res.data);
  };

  const handleSubmitReview = async (paperId: string) => {
    if (!reviewComments[paperId]) return;
    await axios.put("/api/reviewer/submit-review", {
      paperId,
      comments: reviewComments[paperId],
    });
    fetchAssignedPapers();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Reviewer Dashboard</h1>
      <div className="space-y-4">
        {papers.map((p) => (
          <div key={p._id} className="bg-gray-800 p-4 rounded-lg">
            <p className="font-bold">{p.title}</p>
            <p className="text-gray-400">Status: {p.status}</p>
            {p.status === "draft" && (
              <>
                <textarea
                  placeholder="Add review comments"
                  value={reviewComments[p._id] || ""}
                  onChange={(e) =>
                    setReviewComments({ ...reviewComments, [p._id]: e.target.value })
                  }
                  className="w-full mt-2 px-3 py-2 bg-gray-700 rounded-lg text-white"
                />
                <button
                  onClick={() => handleSubmitReview(p._id)}
                  className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Submit Review
                </button>
              </>
            )}
            {p.status === "reviewed" && (
              <p className="text-green-400">Already Reviewed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
