import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://ai-build-project-backend.onrender.com",
  withCredentials: true,
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
export async function signup({
  email,
  name,
  password,
  profileImage,
}) {
  try {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const { data } = await api.post(
      "/api/auth/register",
      formData
    );

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

    toast.success(data?.message || "Logged out");

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
    // Ignore these errors when app loads
    if (
      error.response?.status === 401 ||
      error.response?.status === 404
    ) {
      return null;
    }

    console.error(error.response?.data || error.message);
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

    formData.append("resume", resume);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    const { data } = await api.post(
      "/api/interview/generate",
      formData
    );

    toast.success(data?.message);

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

    const { data } = await api.get(
      `/api/interview/report/${interviewId}`
    );

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
export async function updateProfile({
  name,
  email,
  profileImage,
}) {
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const { data } = await api.put(
      "/api/profile/update",
      formData
    );

    toast.success(data?.message);

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
    const { data } = await api.delete(
      "/api/profile/delete"
    );

    toast.success(data?.message);

    return data;
  } catch (error) {
    handleError(error);
  }
}