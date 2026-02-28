import { getAuthToken } from "@/lib/actions/auth-action";
import { AxiosError } from "axios";
import axios from "../axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

const handleError = (error: unknown, fallback: string): never => {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data?.message || fallback);
  }
  if (error instanceof Error) {
    throw new Error(error.message || fallback);
  }
  throw new Error(fallback);
};

export const createUser = async (userData: unknown) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: userData as FormData,
    });
    return await response.json();
  } catch (error) {
    handleError(error, "Failed to create user");
  }
};

export const getAllUsers = async () => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/admin/users/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    handleError(error, "Failed to fetch users");
  }
};

export const getUserById = async (userId: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    handleError(error, "Failed to fetch user");
  }
};

export const updateUser = async (userId: string, userData: unknown) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: userData as FormData,
    });
    return await response.json();
  } catch (error) {
    handleError(error, "Failed to update user");
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    handleError(error, "Failed to delete user");
  }
};

export const getUserJobs = async (userId: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/jobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    handleError(error, "Failed to fetch user job applications");
  }
};

export const updateUserStatus = async (userId: string, status: "active" | "inactive" | "banned") => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    return await response.json();
  } catch (error) {
    handleError(error, "Failed to update user status");
  }
};

export const updateUserRole = async (userId: string, role: "admin" | "user") => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/role`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: role.trim() }),
    });
    return await response.json();
  } catch (error) {
    handleError(error, "Failed to update user role");
  }
};

export const uploadUserResume = async (userId: string, resumeData: FormData) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/resume`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: resumeData,
    });
    return await response.json();
  } catch (error) {
    handleError(error, "Failed to upload resume");
  }
};

export const changeUserPassword = async (userId: string, data: { currentPassword: string; newPassword: string }) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/change-password`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    handleError(error, "Failed to change password");
  }
};