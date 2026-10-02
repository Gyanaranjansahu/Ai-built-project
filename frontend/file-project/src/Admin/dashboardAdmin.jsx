import React, { useState } from "react";
import {
  Menu,
  X,
  Users,
  LogOut,
  Bell,
  UserCircle,
} from "lucide-react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen w-64
          bg-slate-900 text-white
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-700 px-5">

          <h1 className="text-xl font-bold">
            Admin<span className="text-blue-400">Panel</span>
          </h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-800 lg:hidden"
          >
            <X size={22} />
          </button>

        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6 px-3">

          <button
            className="
              flex w-full items-center gap-3
              rounded-lg
              bg-blue-600
              px-4 py-3
              text-sm font-medium
              text-white
            "
            onClick={() => setSidebarOpen(false)}
          >
            <Users size={20} />

            <span>Users</span>
          </button>

        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 w-full border-t border-slate-700 p-3">

          <button
            className="
              flex w-full items-center gap-3
              rounded-lg
              px-4 py-3
              text-sm
              text-slate-300
              transition
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            <LogOut size={20} />

            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <div className="lg:ml-64">

        {/* Header */}
        <header
          className="
            sticky top-0 z-30
            flex h-16
            items-center justify-between
            border-b border-gray-200
            bg-white
            px-4
            shadow-sm
            sm:px-6
          "
        >

          {/* Left */}
          <div className="flex items-center gap-3">

            {/* Mobile Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="
                rounded-lg
                p-2
                text-gray-600
                hover:bg-gray-100
                lg:hidden
              "
            >
              <Menu size={24} />
            </button>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Users
              </h2>

              <p className="hidden text-xs text-gray-500 sm:block">
                Manage application users
              </p>
            </div>

          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Notification */}
            <button
              className="
                relative rounded-full
                p-2
                text-gray-600
                hover:bg-gray-100
              "
            >
              <Bell size={21} />

              <span
                className="
                  absolute right-1 top-1
                  h-2 w-2
                  rounded-full
                  bg-red-500
                "
              />
            </button>

            {/* Admin */}
            <div
              className="
                flex items-center gap-2
                border-l border-gray-200
                pl-3 sm:pl-4
              "
            >

              <UserCircle
                size={34}
                className="text-gray-500"
              />

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  Admin
                </p>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>

            </div>

          </div>

        </header>

        {/* ================= EMPTY MAIN ================= */}
        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">

          {/* User table/content will come here */}

        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;