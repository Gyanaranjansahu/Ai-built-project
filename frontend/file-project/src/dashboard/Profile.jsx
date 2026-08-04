import { useState, useContext } from "react";
import { Mail, Pencil, Trash2, ShieldCheck, User, Sparkles, AlertTriangle, IdCard, CheckCircle2 } from "lucide-react";
import { authContext } from "../authentication/authcontect.jsx";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../authentication/hookcontroll.js";

const Profile = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const { deleteUserProfile } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function handleDeleteProfile() {
    try {
      setIsDeleting(true);
      const removeAccount = await deleteUserProfile();

      if (removeAccount) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to delete profile:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  }

  const userData = user?.data;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-4 lg:px-0 pb-8">
      
      {/* Main Profile Card */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
        
        {/* Cover Banner */}
        <div className="h-32 sm:h-44 md:h-52 w-full bg-gradient-to-r from-violet-900/50 via-cyan-900/40 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent pointer-events-none" />
          
          {/* Badge */}
          <div className="absolute top-3 right-3 sm:top-5 sm:right-5 flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-950/70 border border-slate-700/60 text-[10px] sm:text-xs font-semibold text-cyan-300 backdrop-blur-md">
            <Sparkles size={12} className="text-cyan-400 animate-pulse sm:w-3.5 sm:h-3.5" />
            <span>Pro Workspace</span>
          </div>
        </div>

        {/* Profile Content Container */}
        <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 relative">
          
          {/* Avatar & Action Button Row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-16 md:-mt-20 gap-4 mb-6">
            
            {/* Avatar */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-[#030712] bg-slate-950 shadow-xl">
                {userData?.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-slate-950 text-slate-400">
                    <User size={36} className="sm:w-12 sm:h-12" />
                  </div>
                )}
              </div>
              <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-emerald-500 border-2 border-[#030712]" title="Active" />
            </div>

            {/* Action Link */}
            <Link
              to="/dashboard/update-profile"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition-all duration-200"
            >
              <Pencil size={15} />
              <span>Edit Profile</span>
            </Link>
          </div>

          {/* User Details */}
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight break-words">
                {userData?.name || "User Name"}
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 size={11} /> Verified
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-2 pt-0.5 break-all">
              <Mail size={14} className="text-cyan-400 shrink-0 sm:w-4 sm:h-4" />
              <span>{userData?.email || "user@example.com"}</span>
            </p>
          </div>

          {/* Metrics & Spec Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 shrink-0">
                <IdCard size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">User ID</p>
                <p className="text-xs font-mono font-semibold text-slate-200 truncate">
                  {userData?._id || "N/A"}
                </p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <ShieldCheck size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Security</p>
                <p className="text-xs font-semibold text-slate-200 truncate">
                  Password Protected
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Danger Zone Section */}
      <div className="rounded-2xl sm:rounded-3xl border border-rose-500/20 bg-rose-950/10 backdrop-blur-xl p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0">
            <AlertTriangle size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-base sm:text-lg font-bold text-rose-400">
              Danger Zone
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              Deleting your account will permanently remove all saved documents, scores, and prep history. This step is irreversible.
            </p>
            <div className="mt-4 sm:mt-5">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95"
              >
                <Trash2 size={15} />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Confirmation Window */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7 shadow-2xl space-y-4 sm:space-y-5 relative">
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 w-fit">
              <AlertTriangle size={20} className="sm:w-6 sm:h-6" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white">Are you sure?</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                All records registered under <span className="text-slate-200 font-semibold break-all">{userData?.email}</span> will be permanently erased.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteProfile}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;