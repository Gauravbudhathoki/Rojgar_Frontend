"use client";

import { useState, useEffect } from "react";
import CreateUserForm from "./_components/CreateUserForm";
import EditUserForm from "./_components/EditUserForm";
import {
  X,
  Pencil,
  Trash2,
  UserPlus,
  Users,
  Loader2,
  SearchX,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import axiosInstance from "@/lib/api/axios";

interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // ✅ Use axiosInstance — auto-attaches Authorization header
      const response = await axiosInstance.get("/api/admin/users/all");
      const result = response.data;
      if (result.success) {
        setUsers(result.data || []);
      } else {
        toast.error(result.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    fetchUsers();
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    setDeletingId(selectedUser._id);
    try {
      // ✅ Use axiosInstance — auto-attaches Authorization header
      const response = await axiosInstance.delete(`/api/admin/users/${selectedUser._id}`);
      const result = response.data;
      if (result.success) {
        toast.success("User deleted successfully");
        setShowDeleteModal(false);
        setSelectedUser(null);
        fetchUsers();
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5050";
    return `${baseUrl}/profile_pictures/${imagePath.split("/").pop()}`;
  };

  const closeModal = (type: "create" | "edit" | "delete") => {
    if (type === "create") setShowCreateModal(false);
    if (type === "edit") { setShowEditModal(false); setSelectedUser(null); }
    if (type === "delete") { setShowDeleteModal(false); setSelectedUser(null); }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-md shadow-amber-200 shrink-0">
              <Users size={18} className="text-[#1a3c5e]" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight">Users</h1>
              <p className="text-gray-400 text-sm">
                {loading ? "Loading..." : `${users.length} total user${users.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1a3c5e] text-white text-sm font-bold rounded-xl hover:bg-[#16324f] active:scale-[0.98] transition-all shadow-lg shadow-[#1a3c5e]/20"
          >
            <UserPlus size={16} />
            Add User
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={28} className="animate-spin text-[#1a3c5e]" />
              <p className="text-gray-400 text-sm font-medium">Loading users...</p>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center h-64 gap-3">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center">
              <SearchX size={24} className="text-amber-400" />
            </div>
            <p className="text-gray-700 font-bold">No users found</p>
            <p className="text-gray-400 text-sm">Get started by adding your first user.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-50">
              <thead>
                <tr className="bg-[#f4f7fa]">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => {
                  const imageUrl = getImageUrl(user.profilePicture);
                  const initial = user.username.charAt(0).toUpperCase();
                  return (
                    <tr key={user._id} className="hover:bg-[#f9fafb] transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="shrink-0 w-10 h-10 rounded-xl overflow-hidden bg-amber-400 flex items-center justify-center shadow-sm">
                            {imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={imageUrl}
                                alt={user.username}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-[#1a3c5e] font-extrabold text-sm">{initial}</span>
                            )}
                          </div>
                          <span className="text-sm font-semibold text-gray-800">{user.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-[#1a3c5e]/10 text-[#1a3c5e]">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/users/${user._id}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#1a3c5e] hover:bg-[#f0f4f8] transition-all"
                          >
                            <Eye size={16} />
                          </Link>
                          <button
                            onClick={() => handleEditClick(user)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-all"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => closeModal("create")}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => closeModal("create")}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center">
                <UserPlus size={16} className="text-[#1a3c5e]" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#1a3c5e]">Create User</h2>
                <p className="text-gray-400 text-xs">Add a new user to Rojgar</p>
              </div>
            </div>
            <CreateUserForm onSuccess={handleCreateSuccess} />
          </div>
        </div>
      )}

      {showEditModal && selectedUser && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => closeModal("edit")}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => closeModal("edit")}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center">
                <Pencil size={16} className="text-[#1a3c5e]" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#1a3c5e]">Edit User</h2>
                <p className="text-gray-400 text-xs">Update {selectedUser.username}&apos;s details</p>
              </div>
            </div>
            <EditUserForm user={selectedUser} onSuccess={handleEditSuccess} />
          </div>
        </div>
      )}

      {showDeleteModal && selectedUser && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => closeModal("delete")}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => closeModal("delete")}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <X size={18} />
            </button>
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-5">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-30" />
                <div className="relative w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-100">
                  <Trash2 size={26} className="text-red-500" />
                </div>
              </div>
              <h2 className="text-xl font-extrabold text-gray-800 mb-2 tracking-tight">Delete User</h2>
              <p className="text-gray-400 text-sm mb-7 leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="font-bold text-gray-700">{selectedUser.username}</span>?
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => closeModal("delete")}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={!!deletingId}
                  className="flex-1 py-3 bg-red-500 text-white rounded-2xl text-sm font-bold hover:bg-red-600 active:scale-[0.98] disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                >
                  {deletingId ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}