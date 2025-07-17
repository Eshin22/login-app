"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);
  const [newCollection, setNewCollection] = useState("");
  const [newPaper, setNewPaper] = useState({ title: "", subject: "", collectionId: "" });
  const [assignReviewer, setAssignReviewer] = useState({ paperId: "", reviewer: "" });

  useEffect(() => {
    fetchCollections();
    fetchPapers();
  }, []);

  const fetchCollections = async () => {
    const res = await axios.get("/api/admin/collections");
    setCollections(res.data);
  };

  const fetchPapers = async () => {
    const res = await axios.get("/api/admin/papers");
    setPapers(res.data);
  };

  const handleAddCollection = async () => {
    if (!newCollection) return;
    await axios.post("/api/admin/collections", { name: newCollection });
    setNewCollection("");
    fetchCollections();
  };

  const handleAddPaper = async () => {
  if (!newPaper.title || !newPaper.subject || !newPaper.collectionId) return;

  await axios.post("/api/admin/papers", {
    title: newPaper.title,
    subject: newPaper.subject,
    collectionId: newPaper.collectionId,
  });

  setNewPaper({ title: "", subject: "", collectionId: "" });
  fetchPapers();
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
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Create Collection */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl mb-3">Create Paper Collection</h2>
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

      {/* Add Paper */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl mb-3">Add Paper</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Paper Title"
            value={newPaper.title}
            onChange={(e) => setNewPaper({ ...newPaper, title: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Paper Subject"
            value={newPaper.subject}
            onChange={(e) => setNewPaper({ ...newPaper, subject: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={newPaper.collectionId}
            onChange={(e) => setNewPaper({ ...newPaper, collectionId: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
          >
            <option value="">Select Collection</option>
            {collections.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={handleAddPaper}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
          >
            Add Paper
          </button>
        </div>
      </div>

      {/* Manage Papers */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl mb-3">Manage Papers</h2>
        <div className="space-y-3">
          {papers.map((p) => (
            <div key={p._id} className="bg-gray-700 p-3 rounded-lg">
              <p className="font-bold">{p.title}</p>
              <p className="text-sm text-gray-300">Collection: {p.collection?.name}</p>
              <p className="text-sm">Status: {p.status}</p>
              {p.status === "draft" && (
                <div className="mt-2 space-y-2">
                  <input
                    type="text"
                    placeholder="Assign Reviewer"
                    value={assignReviewer.paperId === p._id ? assignReviewer.reviewer : ""}
                    onChange={(e) =>
                      setAssignReviewer({ paperId: p._id, reviewer: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                  />
                  <button
                    onClick={handleAssignReviewer}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    Assign
                  </button>
                </div>
              )}
              {p.status === "reviewed" && (
                <div className="mt-2">
                  <p className="text-green-400">Reviewer Comments: {p.comments}</p>
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
