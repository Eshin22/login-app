"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUsersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [reviewers, setReviewers] = useState<any[]>([]);
  const [unassigned, setUnassigned] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Convert any name to Camel Case (Eshin Menusha Fernando)
  const toCamelCase = (name: string) =>
    name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // ✅ Fetch users from backend (teachers, reviewers, unassigned)
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await axios.get("/api/admin/users");
    setTeachers(res.data.teachers);
    setReviewers(res.data.reviewers);
    setUnassigned(res.data.unassigned);
    setLoading(false);
  };

  // ✅ Change role of user (teacher, reviewer, unassigned)
  const handleAssignRole = async (userId: string, role: string) => {
    await axios.put("/api/admin/assign-role", { userId, role });
    fetchUsers();
  };

  // ✅ Delete user
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await axios.delete("/api/admin/delete-user", { data: { userId } });
    fetchUsers();
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;

  // ✅ Dynamic Role Badge Colors
  const RoleBadge = ({ role }: { role: string }) => {
    const colors: any = {
      teacher: "bg-blue-600",
      reviewer: "bg-green-600",
      unassigned: "bg-yellow-600",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
          colors[role] || "bg-gray-600"
        }`}
      >
        {role}
      </span>
    );
  };

  // ✅ Reusable User Card for Teachers & Reviewers
  const UserCard = ({
    user,
    defaultRole,
  }: {
    user: any;
    defaultRole: string;
  }) => (
    <div className="bg-gray-700 p-4 rounded-lg mb-3 hover:bg-gray-600 transition flex justify-between items-center">
      {/* User Name & Role Badge */}
      <div className="flex items-center space-x-3">
        <p className="text-lg font-semibold text-white">
          {toCamelCase(user.name)}
        </p>
        <RoleBadge role={defaultRole} />
      </div>

      {/* Role Dropdown & Delete Button */}
      <div className="flex items-center space-x-2">
        <select
          defaultValue={defaultRole}
          onChange={(e) => handleAssignRole(user._id, e.target.value)}
          className="bg-gray-600 text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="teacher">Teacher</option>
          <option value="reviewer">Reviewer</option>
          <option value="unassigned">Unassigned</option>
        </select>
        <button
          onClick={() => handleDeleteUser(user._id)}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
  <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6">
    {/* ✅ BEAUTIFUL TOP SECTION */}
    <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg">
        Manage Users
      </h1>
      <p className="text-gray-400 text-sm mt-1">
        Assign roles, manage teachers & reviewers, or remove unassigned users.
      </p>
    </div>

    {/* ✅ Unassigned Users Section */}
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-3 border-l-4 border-yellow-500 pl-3">
        Unassigned Users
      </h2>
      {unassigned.length === 0 ? (
        <p className="text-gray-400">No unassigned users</p>
      ) : (
        unassigned.map((user) => (
          <div
            key={user._id}
            className="bg-gray-700 p-4 rounded-lg mb-3 hover:bg-gray-600 transition flex justify-between items-center"
          >
            <div className="flex items-center space-x-3">
              <p className="text-lg font-semibold text-white">
                {toCamelCase(user.name)}
              </p>
              <RoleBadge role="unassigned" />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAssignRole(user._id, "teacher")}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
              >
                Make Teacher
              </button>
              <button
                onClick={() => handleAssignRole(user._id, "reviewer")}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-sm"
              >
                Make Reviewer
              </button>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>

    {/* ✅ Teachers Section */}
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-3 border-l-4 border-blue-500 pl-3">
        Teachers
      </h2>
      {teachers.length === 0 ? (
        <p className="text-gray-400">No teachers</p>
      ) : (
        teachers.map((user) => (
          <UserCard key={user._id} user={user} defaultRole="teacher" />
        ))
      )}
    </div>

    {/* ✅ Reviewers Section */}
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-3 border-l-4 border-green-500 pl-3">
        Reviewers
      </h2>
      {reviewers.length === 0 ? (
        <p className="text-gray-400">No reviewers</p>
      ) : (
        reviewers.map((user) => (
          <UserCard key={user._id} user={user} defaultRole="reviewer" />
        ))
      )}
    </div>
  </div>
);
}