"use server";

import {
  createUser,
  updateUser,
  deleteUser,
  updateUserRole,
  updateUserStatus,
  uploadUserResume,
  changeUserPassword,
} from "@/lib/api/admin/user";
import { revalidatePath } from "next/cache";

export const handleCreateUser = async (data: FormData) => {
  try {
    const response = await createUser(data);
    if (response.success) {
      revalidatePath("/admin/users");
      return {
        success: true,
        message: "Registration successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Registration failed",
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Registration action failed",
    };
  }
};

export const handleUpdateUser = async (userId: string, data: FormData) => {
  try {
    const response = await updateUser(userId, data);
    if (response.success) {
      revalidatePath("/admin/users");
      revalidatePath(`/admin/users/${userId}`);
      return {
        success: true,
        message: "Update successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Update failed",
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Update action failed",
    };
  }
};

export const handleDeleteUser = async (userId: string) => {
  try {
    const response = await deleteUser(userId);
    if (response.success) {
      revalidatePath("/admin/users");
      return {
        success: true,
        message: "User deleted successfully",
      };
    }
    return {
      success: false,
      message: response.message || "Delete failed",
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Delete action failed",
    };
  }
};

export const handleUpdateUserRole = async (
  userId: string,
  role: "admin" | "user"
) => {
  try {
    const response = await updateUserRole(userId, role);
    if (response.success) {
      revalidatePath("/admin/users");
      revalidatePath(`/admin/users/${userId}`);
      return {
        success: true,
        message: `Role updated to "${role}" successfully`,
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Role update failed",
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Role update action failed",
    };
  }
};

export const handleUpdateUserStatus = async (
  userId: string,
  status: "active" | "inactive" | "banned"
) => {
  try {
    const response = await updateUserStatus(userId, status);
    if (response.success) {
      revalidatePath("/admin/users");
      revalidatePath(`/admin/users/${userId}`);
      return {
        success: true,
        message: `User status updated to "${status}" successfully`,
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Status update failed",
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Status update action failed",
    };
  }
};

export const handleUploadUserResume = async (
  userId: string,
  data: FormData
) => {
  try {
    const response = await uploadUserResume(userId, data);
    if (response.success) {
      revalidatePath("/admin/users");
      revalidatePath(`/admin/users/${userId}`);
      revalidatePath("/dashboard/profile");
      return {
        success: true,
        message: "Resume uploaded successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Resume upload failed",
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Resume upload action failed",
    };
  }
};

export const handleChangeUserPassword = async (
  userId: string,
  data: { currentPassword: string; newPassword: string }
) => {
  try {
    const response = await changeUserPassword(userId, data);
    if (response.success) {
      return {
        success: true,
        message: "Password changed successfully",
      };
    }
    return {
      success: false,
      message: response.message || "Password change failed",
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Password change action failed",
    };
  }
};