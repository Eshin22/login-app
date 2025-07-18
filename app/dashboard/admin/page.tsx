"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function AdminPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);
  const [newCollection, setNewCollection] = useState("");
  const [newPaper, setNewPaper] = useState({
    title: "",
    subject: "",
    collectionId: "",
    driveLink: "",
  });
  const [assignReviewer, setAssignReviewer] = useState({
    paperId: "",
    reviewer: "",
  });
  const [reviewers, setReviewers] = useState<any[]>([]);

  useEffect(() => {
    fetchCollections();
    fetchPapers();
    fetchReviewers();
  }, []);

  const fetchCollections = async () => {
    try {
      const res = await axios.get("/api/admin/collections");
      setCollections(res.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const fetchPapers = async () => {
    try {
      const res = await axios.get("/api/admin/papers");
      setPapers(res.data);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  };

  const fetchReviewers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      setReviewers(res.data.reviewers);
    } catch (error) {
      console.error("Error fetching reviewers:", error);
    }
  };

  const handleAddCollection = async () => {
    if (!newCollection) return;
    await axios.post("/api/admin/collections", { name: newCollection });
    setNewCollection("");
    fetchCollections();
  };

  const handleAddPaper = async () => {
    if (!newPaper.title || !newPaper.subject || !newPaper.collectionId) {
      alert("Please fill in title, subject, and select a collection");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", newPaper.title);
      formData.append("subject", newPaper.subject);
      formData.append("collectionId", newPaper.collectionId);
      formData.append("driveLink", newPaper.driveLink);

      await axios.post("/api/admin/papers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewPaper({ title: "", subject: "", collectionId: "", driveLink: "" });
      fetchPapers();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to add paper. Please try again."
      );
    }
  };

  const handleAssignReviewer = async () => {
    if (!assignReviewer.paperId || !assignReviewer.reviewer) return;
    await axios.put("/api/admin/assign-reviewer", assignReviewer);
    setAssignReviewer({ paperId: "", reviewer: "" });
    fetchPapers();
  };

  const handleMarkPrinted = async (paperId: string) => {
    await axios.put("/api/admin/mark-printed", { paperId });
    fetchPapers();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-8">
      {/* ✅ BEAUTIFUL TOP SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-800 p-5 rounded-lg shadow-lg">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage collections, upload papers, assign reviewers, and oversee
            printing.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/admin/manage-users"
            className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
          hover:from-indigo-500 hover:to-purple-500 transition shadow-md font-medium text-white text-sm"
          >
            👥 Manage Users
          </Link>
          <Link
            href="/dashboard/admin/review-papers"
            className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-green-600 to-teal-500 
          hover:from-green-500 hover:to-teal-400 transition shadow-md font-medium text-white text-sm"
          >
            ✅ Review Papers
          </Link>
        </div>
      </div>

      {/* ✅ CREATE COLLECTION */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 border-l-4 border-indigo-500 pl-3">
          Create Paper Collection
        </h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="e.g., 2025 A/L"
            value={newCollection}
            onChange={(e) => setNewCollection(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddCollection}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
          >
            Add
          </button>
        </div>
        <ul className="mt-3 text-gray-300 space-y-1">
          {collections.map((c) => (
            <li key={c._id}>{c.name}</li>
          ))}
        </ul>
      </div>

      {/* ✅ ADD PAPER */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 border-l-4 border-indigo-500 pl-3">
          Add Paper
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Paper Title"
            value={newPaper.title}
            onChange={(e) =>
              setNewPaper({ ...newPaper, title: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Paper Subject"
            value={newPaper.subject}
            onChange={(e) =>
              setNewPaper({ ...newPaper, subject: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={newPaper.collectionId}
            onChange={(e) =>
              setNewPaper({ ...newPaper, collectionId: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          >
            <option value="">Select Collection</option>
            {collections.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Google Drive Link (Optional)
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/file/d/..."
              value={newPaper.driveLink}
              onChange={(e) =>
                setNewPaper({ ...newPaper, driveLink: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleAddPaper}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Add Paper
          </button>
        </div>
      </div>

      {/* ✅ MANAGE PAPERS */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 border-l-4 border-indigo-500 pl-3">
          Manage Papers
        </h2>
        <div className="space-y-3">
          {papers.map((p) => (
            <div
              key={p._id}
              className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition"
            >
              <p className="font-bold text-lg">{p.title}</p>
              <p className="text-sm text-gray-300">
                Collection: {p.collectionId?.name}
              </p>
              <p className="text-sm">Status: {p.status}</p>

              {p.driveLink && (
                <a
                  href={p.driveLink}
                  target="_blank"
                  className="text-blue-400 hover:underline text-sm"
                >
                  📄 View on Google Drive
                </a>
              )}

              {p.status !== "printed" && (
                <div className="mt-3 space-y-2">
                  {p.reviewer && (
                    <p className="text-sm text-gray-300">
                      Assigned Reviewer:{" "}
                      <span className="text-indigo-400 font-semibold">
                        {p.reviewer}
                      </span>
                    </p>
                  )}
                  <select
                    value={
                      assignReviewer.paperId === p._id
                        ? assignReviewer.reviewer
                        : p.reviewer || ""
                    }
                    onChange={(e) =>
                      setAssignReviewer({
                        paperId: p._id,
                        reviewer: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                  >
                    <option value="">Select Reviewer</option>
                    {reviewers.map((rev) => (
                      <option key={rev._id} value={rev.name}>
                        {rev.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAssignReviewer}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    {p.reviewer ? "Change Reviewer" : "Assign Reviewer"}
                  </button>
                </div>
              )}

              {p.status === "reviewed" && (
                <div className="mt-2">
                  <div className="text-green-400">
                    <p className="font-semibold">Reviewer Comments:</p>
                    {p.comments?.length > 0 ? (
                      <div className="mt-1 space-y-1">
                        {p.comments.map((c: any, idx: number) => (
                          <p key={idx} className="text-sm">
                            <span className="text-green-300">
                              {c.reviewer}:
                            </span>{" "}
                            {c.comment}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm">No comments yet.</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleMarkPrinted(p._id)}
                    className="mt-2 w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                  >
                    Mark Printed
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
