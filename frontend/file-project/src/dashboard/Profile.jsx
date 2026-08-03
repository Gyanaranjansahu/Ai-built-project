import { Mail, Pencil, Trash2 } from "lucide-react";
import { useContext } from "react";
import { authContext } from "../authentication/authcontect.jsx";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../authentication/hookcontroll.js";

const Profile = () => {
  const { user } = useContext(authContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const { deleteUserProfile } = useAuth();

  async function handleDeleteProfile() {
    try {
      const removeAccount = await deleteUserProfile(id);

      if (removeAccount) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to delete profile:", error);
    }
  }

  function handleUpdateProfile() {
    navigate(`/update-profile/${id}`);
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500"></div>

        {/* Profile Image */}
        <div className="flex justify-center -mt-16">
          <img
            src={
              user?.data?.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>

        {/* Profile Details */}
        <div className="px-6 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">
              {user?.data?.name || "User Name"}
            </h2>

            <div className="mt-3 flex items-center justify-center gap-2 text-slate-500 break-all">
              <Mail size={18} />
              <span>{user?.data?.email || "user@example.com"}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4">
            <button
              onClick={handleUpdateProfile}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition"
            >
              <Pencil size={18} />
              Update Profile
            </button>
          </div>

          {/* Danger Zone */}
          <div className="mt-10 border-t border-slate-200 pt-8">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <h3 className="text-lg font-semibold text-red-600">
                Delete Account
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Once you delete your account, all your data will be permanently
                removed. This action cannot be undone.
              </p>

              <button
                onClick={handleDeleteProfile}
                className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition"
              >
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;