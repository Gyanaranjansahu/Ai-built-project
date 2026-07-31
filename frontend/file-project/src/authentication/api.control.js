import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

// Common Error Handler
const handleError = (error) => {
  console.error(
    "API Error:",
    error.response?.data || error.message
  );

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
export async function signup({ email, name, password }) {
  try {
    const { data } = await api.post("/api/auth/register", {
      email,
      name,
      password,
    });

    toast.success(data.message);

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

    toast.success(data.message);

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

    toast.success(data.message);

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
    if (error.response?.status === 401) {
      return null;
    }

    handleError(error);
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

    // console.log("Resume:", resume);
    // console.log("Self Description:", selfDescription);
    // console.log("Job Description:", jobDescription);

    const { data } = await api.post(
      "/api/interview/generate",
      formData
    );

    toast.success(data.message);
    return data;
  } catch (error) {
    handleError(error);
  }
}

// =========================
// GET REPORT BY ID
// =========================
export async function getInterviewReportById(interviewId) {
  console.log(interviewId);
  
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