import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

// Common Error Handler
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);

  const data = error.response?.data;

  // Validation Errors
  if (data?.errors && Array.isArray(data.errors)) {
    data.errors.forEach((err) => toast.error(err));
  }
  // Normal Error Message
  else if (data?.message) {
    toast.error(data.message);
  } else if (data?.text) {
    toast.error(data.text);
  }
  // Axios Error
  else {
    toast.error(error.message || "Something went wrong");
  }

  throw error;
};

// Signup
export async function signup({ email, name, password }) {
  try {
    const { data } = await api.post("/api/auth/register", {
      email,
      name,
      password,
    });

    toast.success(data.message || data.text);

    return data;
  } catch (error) {
    handleError(error);
  }
}

// Login
export async function login({ email, password }) {
  try {
    const { data } = await api.post("/api/auth/login", {
      email,
      password,
    });

    toast.success(data.message || data.text);

    return data;
  } catch (error) {
    handleError(error);
  }
}

// Logout
export async function logout() {
  try {
    const { data } = await api.get("/api/auth/logout");

    toast.success(data.message || data.text);

    return data;
  } catch (error) {
    handleError(error);
  }
}

// Current User
export async function userMe() {
  try {
    const { data } = await api.get("/api/auth/user");
    return data;
  } catch (error) {
    handleError(error);
  }
}

// Generate Interview
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

    const { data } = await api.post("/api/interview", formData);

    toast.success(data.message || data.text);

    return data;
  } catch (error) {
    handleError(error);
  }
}