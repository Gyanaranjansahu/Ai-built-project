import { useState, useEffect, useContext } from "react";
import { User, Mail, Camera } from "lucide-react";
import { authContext } from "../authentication/authcontect.jsx";
import { useNavigate } from "react-router-dom";
import useAuth from "../authentication/hookcontroll.js";

const UpdateProfile = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const { updateUserProfile } = useAuth();

  const [users, setUsers] = useState({
    name: "",
    email: "",
    profileImage: null,
  });

  const { name, email, profileImage } = users;

  // Load current user details into the form
  useEffect(() => {
    if (user?.data) {
      setUsers({
        name: user.data.name || "",
        email: user.data.email || "",
        profileImage: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setUsers((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProfile = await updateUserProfile(users);

      console.log("Profile updated successfully:", updatedProfile);

      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8 text-black">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-500 text-white p-10">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : user?.data?.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="mt-6 text-3xl font-bold">Update Profile</h2>

          <p className="mt-3 text-center text-indigo-100 max-w-sm">
            Update your personal information and keep your account details
            up-to-date.
          </p>
        </div>

        {/* Right Section */}
        <div className="p-6 sm:p-8 md:p-10">
          {/* Mobile Heading */}
          <div className="lg:hidden text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Update Profile
            </h2>

            <p className="text-slate-500 mt-2">
              Manage your account information
            </p>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : user?.data?.profileImage ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-md"
              />

              <label
                htmlFor="profileImage"
                className="absolute bottom-1 right-1 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full cursor-pointer transition"
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

            <p className="mt-4 text-sm text-slate-500">
              Click the camera icon to upload a new photo
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;