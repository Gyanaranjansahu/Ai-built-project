import React, { useState, useEffect, useContext } from "react";
import { User, Camera, ArrowLeft, ShieldCheck, Sparkles, Loader2, Save } from "lucide-react";
import { authContext } from "../authentication/authcontect.jsx";
import { useNavigate } from "react-router-dom";
import useAuth from "../authentication/hookcontroll.js";

const UpdateProfile = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const { updateUserProfile } = useAuth();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [users, setUsers] = useState({
    name: "",
    profileImage: null,
  });

  const { name, profileImage } = users;

  // Load current user details
  useEffect(() => {
    if (user?.data) {
      setUsers((prev) => ({
        ...prev,
        name: user.data.name || "",
      }));
      setPreview(user.data.profileImage || null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file" && files[0]) {
      const file = files[0];
      setUsers((prev) => ({ ...prev, profileImage: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setUsers((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedProfile = await updateUserProfile(users);
      console.log("Profile updated successfully:", updatedProfile);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Background Ambience & Lighting */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-600/20 blur-[120px]" />

      {/* Glassmorphic Container Card */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-2xl shadow-black/80 grid lg:grid-cols-12">
        {/* Left Decorative Sidebar (4 cols) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 border-r border-white/10 bg-gradient-to-b from-violet-600/10 via-transparent to-cyan-500/10 relative overflow-hidden">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition duration-200"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>

          <div className="my-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-medium text-violet-300">
              <Sparkles size={14} /> Profile Settings
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              Personalize your account details
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Keep your profile updated so recruiters and system neural engines can accurately process your career information.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-6 border-t border-white/5 text-xs text-slate-500">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Encrypted & Confidential</span>
          </div>
        </div>

        {/* Right Form Area (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {/* Header Mobile Only */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="text-sm font-semibold text-slate-300">Edit Profile</span>
            <div className="w-8" />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Update Profile
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Customize your display name and profile picture.
            </p>
          </div>

          {/* Profile Image Preview Section */}
          <div className="flex flex-col items-center sm:items-start mb-8">
            <div className="relative group">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 border-2 border-violet-500/30 bg-slate-950/80 shadow-xl overflow-hidden relative">
                <img
                  src={
                    preview ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-full transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Camera Action Overlay */}
              <label
                htmlFor="profileImage"
                className="absolute bottom-1 right-1 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white p-3 rounded-full cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <Camera size={18} />
              </label>

              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Allowed JPG, PNG or WEBP. Maximum file size 5MB.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Full Name
              </label>

              <div className="relative group">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors"
                />

                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition duration-200"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold py-3.5 px-6 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Saving Changes...
                </>
              ) : (
                <>
                  <Save size={18} /> Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;