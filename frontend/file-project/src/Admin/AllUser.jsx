import React, { useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Users,
  X,
  Mail,
  ShieldCheck,
} from "lucide-react";

const AllUsers = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Gyana Ranjan",
      email: "gyana@gmail.com",
      role: "User",
      profileImage: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      role: "User",
      profileImage: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 3,
      name: "Priya Das",
      email: "priya@gmail.com",
      role: "User",
      profileImage: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 4,
      name: "Amit Sharma",
      email: "amit@gmail.com",
      role: "User",
      profileImage: "https://i.pravatar.cc/150?img=8",
    },
  ]);

  // Search
  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );
  });

  // Remove user
  const handleRemove = () => {
    setUsers((prev) =>
      prev.filter((user) => user.id !== deleteUser.id)
    );

    setDeleteUser(null);
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Users size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              All Users
            </h1>

            <p className="text-xs text-slate-500 sm:text-sm">
              Manage users of your application
            </p>
          </div>

        </div>

        {/* Total users */}

        <div className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:w-auto sm:px-5">

          <p className="text-xs text-slate-400">
            Total Users
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {users.length}
          </p>

        </div>

      </div>


      {/* ================= SEARCH ================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">

        <div className="relative w-full sm:max-w-md">

          <Search
            size={18}
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="
              w-full
              rounded-lg
              border border-slate-200
              bg-slate-50
              py-2.5
              pl-10
              pr-4
              text-sm
              outline-none
              transition
              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-500/10
              sm:rounded-xl
              sm:py-3
            "
          />

        </div>

      </div>


      {/* ================================================= */}
      {/* DESKTOP TABLE */}
      {/* ================================================= */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>

              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  User
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Role
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="transition hover:bg-slate-50"
                >

                  {/* USER */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="
                          h-10 w-10
                          rounded-full
                          object-cover
                          ring-2
                          ring-slate-100
                        "
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {user.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          ID #{user.id}
                        </p>
                      </div>

                    </div>

                  </td>


                  {/* EMAIL */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <Mail
                        size={16}
                        className="shrink-0 text-slate-400"
                      />

                      <span className="truncate">
                        {user.email}
                      </span>

                    </div>

                  </td>


                  {/* ROLE */}

                  <td className="px-5 py-4">

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">

                      <ShieldCheck size={14} />

                      {user.role}

                    </span>

                  </td>


                  {/* ACTIONS */}

                  <td className="px-5 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => setSelectedUser(user)}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-lg
                          border
                          border-slate-200
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-slate-600
                          transition
                          hover:border-blue-200
                          hover:bg-blue-50
                          hover:text-blue-600
                        "
                      >
                        <Eye size={15} />
                        View
                      </button>

                      <button
                        onClick={() => setDeleteUser(user)}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-lg
                          bg-red-50
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-red-500
                          transition
                          hover:bg-red-100
                        "
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* ================================================= */}
      {/* MOBILE CARDS */}
      {/* ================================================= */}

      <div className="space-y-3 md:hidden">

        {filteredUsers.map((user) => (

          <div
            key={user.id}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
            "
          >

            {/* User information */}

            <div className="flex items-center gap-3">

              <img
                src={user.profileImage}
                alt={user.name}
                className="
                  h-12
                  w-12
                  shrink-0
                  rounded-full
                  object-cover
                  ring-2
                  ring-slate-100
                "
              />

              <div className="min-w-0">

                <h3 className="truncate text-sm font-bold text-slate-900">
                  {user.name}
                </h3>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {user.email}
                </p>

                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-600">

                  <ShieldCheck size={12} />

                  {user.role}

                </span>

              </div>

            </div>


            {/* Actions */}

            <div className="mt-4 grid grid-cols-2 gap-2">

              <button
                onClick={() => setSelectedUser(user)}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-slate-200
                  py-2.5
                  text-xs
                  font-semibold
                  text-slate-600
                  transition
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >
                <Eye size={15} />
                View Profile
              </button>

              <button
                onClick={() => setDeleteUser(user)}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-red-50
                  py-2.5
                  text-xs
                  font-semibold
                  text-red-500
                  transition
                  hover:bg-red-100
                "
              >
                <Trash2 size={15} />
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* ================= EMPTY STATE ================= */}

      {filteredUsers.length === 0 && (

        <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">

          <Users
            size={30}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-3 text-sm font-semibold text-slate-700">
            No users found
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Try searching with another name or email.
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* PROFILE MODAL */}
      {/* ================================================= */}

      {selectedUser && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-950/50
            p-4
            backdrop-blur-sm
          "
          onClick={() => setSelectedUser(null)}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-sm
              rounded-2xl
              bg-white
              p-5
              shadow-2xl
              sm:p-6
            "
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between">

              <h2 className="font-bold text-slate-900">
                User Profile
              </h2>

              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={19} />
              </button>

            </div>


            {/* Profile */}

            <div className="mt-6 text-center">

              <img
                src={selectedUser.profileImage}
                alt={selectedUser.name}
                className="
                  mx-auto
                  h-20
                  w-20
                  rounded-full
                  object-cover
                  ring-4
                  ring-blue-50
                  sm:h-24
                  sm:w-24
                "
              />

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {selectedUser.name}
              </h3>

              <p className="mt-1 break-all text-sm text-slate-500">
                {selectedUser.email}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {selectedUser.role}
              </span>

            </div>


            {/* Close */}

            <button
              onClick={() => setSelectedUser(null)}
              className="
                mt-6
                w-full
                rounded-xl
                bg-slate-900
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-slate-800
              "
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* DELETE MODAL */}
      {/* ================================================= */}

      {deleteUser && (

        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            items-center
            justify-center
            bg-slate-950/50
            p-4
            backdrop-blur-sm
          "
        >

          <div
            className="
              w-full
              max-w-sm
              rounded-2xl
              bg-white
              p-5
              shadow-2xl
              sm:p-6
            "
          >

            <div className="text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Trash2
                  size={22}
                  className="text-red-500"
                />
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                Remove User?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Are you sure you want to remove{" "}
                <span className="font-semibold text-slate-800">
                  {deleteUser.name}
                </span>
                ?
              </p>

            </div>


            {/* Buttons */}

            <div className="mt-6 grid grid-cols-2 gap-3">

              <button
                onClick={() => setDeleteUser(null)}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  py-3
                  text-sm
                  font-semibold
                  text-slate-600
                  hover:bg-slate-50
                "
              >
                Cancel
              </button>

              <button
                onClick={handleRemove}
                className="
                  rounded-xl
                  bg-red-500
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  hover:bg-red-600
                "
              >
                Remove
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AllUsers;