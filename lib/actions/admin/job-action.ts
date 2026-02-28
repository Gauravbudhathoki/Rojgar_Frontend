"use server";

import { revalidatePath } from "next/cache";
import { getAuthToken } from "@/lib/actions/auth-action";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

export async function handleCreateJob(data: FormData) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, message: "No authentication token found" };
    }

    console.log("handleCreateJob - URL:", `${API_BASE_URL}/api/jobs`);
    console.log("handleCreateJob - Fields:", {
      title: data.get("title"),
      company: data.get("company"),
      location: data.get("location"),
      deadline: data.get("deadline"),
      salary: data.get("salary"),
      vacancies: data.get("vacancies"),
      description: data.get("description"),
      jobType: data.get("jobType"),
      category: data.get("category"),
    });

    const response = await fetch(`${API_BASE_URL}/api/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    });

    console.log("handleCreateJob - Status:", response.status);

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const rawText = await response.text();
      console.error("handleCreateJob - Raw response:", rawText.substring(0, 500));
      return {
        success: false,
        message: `Server error: Status ${response.status}`,
      };
    }

    const result = await response.json();
    console.log("handleCreateJob - Result:", JSON.stringify(result, null, 2));

    if (result.success) {
      revalidatePath("/admin/jobs");
      return {
        success: true,
        message: result.message || "Job created successfully",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to create job",
    };
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Network error");
    console.error("handleCreateJob - Error:", err.message);
    return { success: false, message: err.message };
  }
}

export async function handleUpdateJob(jobId: string, data: FormData) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, message: "No authentication token found" };
    }

    const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      cache: "no-store",
    });

    console.log("handleUpdateJob - Status:", response.status);

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const rawText = await response.text();
      console.error("handleUpdateJob - Raw response:", rawText.substring(0, 500));
      return {
        success: false,
        message: `Server error: Status ${response.status}`,
      };
    }

    const result = await response.json();

    if (result.success) {
      revalidatePath("/admin/jobs");
      revalidatePath(`/admin/jobs/${jobId}`);
      return {
        success: true,
        message: result.message || "Job updated successfully",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update job",
    };
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Network error");
    return { success: false, message: err.message };
  }
}

export async function handleDeleteJob(jobId: string) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, message: "No authentication token found" };
    }

    const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log("handleDeleteJob - Status:", response.status);

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const rawText = await response.text();
      console.error("handleDeleteJob - Raw response:", rawText.substring(0, 500));
      return {
        success: false,
        message: `Server error: Status ${response.status}`,
      };
    }

    const result = await response.json();

    if (result.success) {
      revalidatePath("/admin/jobs");
      return {
        success: true,
        message: result.message || "Job deleted successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to delete job",
    };
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Network error");
    return { success: false, message: err.message };
  }
}

export async function handleToggleJobStatus(jobId: string, isActive: boolean) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, message: "No authentication token found" };
    }

    const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive }),
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const rawText = await response.text();
      console.error("handleToggleJobStatus - Raw response:", rawText.substring(0, 500));
      return {
        success: false,
        message: `Server error: Status ${response.status}`,
      };
    }

    const result = await response.json();

    if (result.success) {
      revalidatePath("/admin/jobs");
      revalidatePath(`/admin/jobs/${jobId}`);
      return {
        success: true,
        message: `Job ${isActive ? "activated" : "deactivated"} successfully`,
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update job status",
    };
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Network error");
    return { success: false, message: err.message };
  }
}

export async function handleGetAllJobs() {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, message: "No authentication token found" };
    }

    const response = await fetch(`${API_BASE_URL}/api/jobs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const rawText = await response.text();
      console.error("handleGetAllJobs - Raw response:", rawText.substring(0, 500));
      return {
        success: false,
        message: `Server error: Status ${response.status}`,
      };
    }

    const result = await response.json();

    if (result.success) {
      return { success: true, data: result.data };
    }

    return {
      success: false,
      message: result.message || "Failed to fetch jobs",
    };
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Network error");
    return { success: false, message: err.message };
  }
}

export async function handleGetMyJobs() {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, message: "No authentication token found" };
    }

    const response = await fetch(`${API_BASE_URL}/api/jobs/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const rawText = await response.text();
      console.error("handleGetMyJobs - Raw response:", rawText.substring(0, 500));
      return {
        success: false,
        message: `Server error: Status ${response.status}`,
      };
    }

    const result = await response.json();

    if (result.success) {
      return { success: true, data: result.data };
    }

    return {
      success: false,
      message: result.message || "Failed to fetch my jobs",
    };
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Network error");
    return { success: false, message: err.message };
  }
}

export async function handleGetJobById(jobId: string) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, message: "No authentication token found" };
    }

    const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const rawText = await response.text();
      console.error("handleGetJobById - Raw response:", rawText.substring(0, 500));
      return {
        success: false,
        message: `Server error: Status ${response.status}`,
      };
    }

    const result = await response.json();

    if (result.success) {
      return { success: true, data: result.data };
    }

    return {
      success: false,
      message: result.message || "Failed to fetch job",
    };
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Network error");
    return { success: false, message: err.message };
  }
}