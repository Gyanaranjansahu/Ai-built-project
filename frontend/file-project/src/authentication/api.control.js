import axios from "axios";
import { toast } from "react-toastify";

// Use Vite environment variable if available, falling back to Render production or local dev
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://ai-build-project-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enables cross-origin cookie sharing
});

// =========================
// Common Error Handler
// =========================
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);

  const message =
    error.response?.data?.message ||
    error.response?.data?.text ||
    error.message ||
    "Something went wrong";

  toast.error(message);
  throw error;
};

// =========================
// SIGNUP
// =========================
export async function signup({ email, name, password, profileImage }) {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const { data } = await api.post("/api/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success(data?.message || "Registration successful");
    return data;
  } catch (error) {
    handleError(error);
  }
}

// =========================
// LOGIN
// =========================
export async function login({ email, password }) {
  try {
    const { data } = await api.post("/api/auth/login", {
      email,
      password,
    });

    toast.success(data?.message || "Login successful");
    return data;
  } catch (error) {
    handleError(error);
  }
}

// =========================
// LOGOUT
// =========================
export async function logout() {
  try {
    const { data } = await api.get("/api/auth/logout");
    toast.success(data?.message || "Logged out successfully");
    return data;
  } catch (error) {
    handleError(error);
  }
}

// =========================
// CURRENT USER
// =========================
export async function userMe() {
  try {
    const { data } = await api.get("/api/auth/user");
    return data;
  } catch (error) {
    // Gracefully handle unauthenticated/missing session state on page load
    if (error.response?.status === 401 || error.response?.status === 404) {
      return null;
    }

    console.error(
      "Fetch current user failed:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

// =========================
// GENERATE INTERVIEW
// =========================
export async function generateInterview({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const formData = new FormData();

    if (resume) formData.append("resume", resume);
    if (selfDescription) formData.append("selfDescription", selfDescription);
    if (jobDescription) formData.append("jobDescription", jobDescription);

    const { data } = await api.post("/api/interview/generate", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success(data?.message || "Interview generated successfully");
    return data;
  } catch (error) {
    handleError(error);
  }
}

// =========================
// GET REPORT BY ID
// =========================
export async function getInterviewReportById(interviewId) {
  try {
    if (!interviewId) {
      throw new Error("Interview ID is required");
    }

    const { data } = await api.get(`/api/interview/report/${interviewId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
}

// =========================
// GET ALL REPORTS
// =========================
export async function getAllinterviewReport() {
  try {
    const { data } = await api.get("/api/all");
    return data;
  } catch (error) {
    handleError(error);
  }
}

// =========================
// UPDATE PROFILE
// =========================
export async function updateProfile({ name, profileImage }) {
  try {
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (profileImage) formData.append("profileImage", profileImage);

    const { data } = await api.put("/api/profile/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success(data?.message || "Profile updated successfully");
    return data;
  } catch (error) {
    handleError(error);
  }
}

// =========================
// DELETE PROFILE
// =========================
export async function deleteProfile() {
  try {
    const { data } = await api.delete("/api/profile/delete");
    toast.success(data?.message || "Profile deleted successfully");
    return data;
  } catch (error) {
    handleError(error);
  }
}

// =========================
// ADMIN ACCESS
// =========================
export async function getAdmin() {
  try {
    const { data } = await api.get("/api/admin");
    return data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 404) {
      return null;
    }

    console.error("Get admin failed:", error.response?.data || error.message);
    throw error;
  }
}

// =========================
// GET ALL ACTIVE USERS
// =========================
export async function getAlluser() {
  try {
    const { data } = await api.get("/api/active_user");
    return data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 404) {
      return null;
    }

    console.error(
      "Get active users failed:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

export default api;
