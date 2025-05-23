// import { styles } from "@/app/styles/style";
// import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
// import {
//   useGetAllUsersQuery,
//   useUpdateUserRoleMutation,
// } from "@/radux/features/user/userApiSlice";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const UserRole = ({
//   active,
//   setActive,
// }: // data,
// {
//   active: boolean;
//   setActive: React.Dispatch<React.SetStateAction<boolean>>;
//   data: any;
// }) => {
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("admin");

//   const { refetch, data } = useGetAllUsersQuery(
//     {},
//     { refetchOnMountOrArgChange: true }
//   );

//   console.log("data roles", { data });

//   const [updateUserRole, { isLoading, isSuccess, isError, error }] =
//     useUpdateUserRoleMutation();

//   useEffect(() => {
//     if (isSuccess) {
//       refetch();
//       toast.success("Role updated");
//       setActive(false);
//     }
//     if (error) {
//       const errorData = error as any;
//       toast.error(errorData?.data?.error || "Failed to update role");
//     }
//   }, [isSuccess, isError, error, refetch, setActive]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!data?.users || data.users.length === 0) {
//       toast.error("No users found");
//       return;
//     }

//     // Find the correct user using email
//     const user = data.users.find((u: any) => u.email === email);

//     if (!user) {
//       toast.error("Email does not match any user");
//       return;
//     }

//     if (!user._id) {
//       toast.error("User ID not found");
//       return;
//     }

//     // Ensure the found user's ID matches its email
//     if (
//       String(user._id) !==
//       String(data.users.find((u: any) => u.email === user.email)?._id)
//     ) {
//       toast.error("User ID and email mismatch");
//       return;
//     }

//     try {
//       await updateUserRole({ id: user._id, role });
//     } catch (error) {
//       toast.error("Failed to update user role");
//     }
//   };

//   return (
//     <div className="w-[30%] p-5 flex items-center justify-center bg-blue-950 rounded-md">
//       <div className="w-full">
//         <div className="w-full">
//           <div className="font-bold text-2xl text-black dark:text-white font-Poppins text-center">
//             Add New Member
//           </div>
//           <form className="w-full" onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-3 w-full">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className={`${styles.input} !my-2 !p-auto !text-sm `}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               {/* Transparent Select */}
//               <select
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className={`${styles.input} !text-sm !p-auto !my-2 !bg-transparent w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md focus:outline-none text-gray-700 dark:text-white appearance-none`}
//                 style={{
//                   WebkitAppearance: "none",
//                   MozAppearance: "none",
//                   appearance: "none",
//                 }}
//               >
//                 <option
//                   value="admin"
//                   className="text-gray-700 dark:text-white bg-transparent"
//                 >
//                   Admin
//                 </option>
//                 <option
//                   value="user"
//                   className="text-gray-700 dark:text-white bg-transparent"
//                 >
//                   User
//                 </option>
//               </select>

//               <button
//                 className={`bg-blue-500 text-white p-2 rounded-md ${
//                   isLoading && "cursor-not-allowed"
//                 }`}
//                 type="submit"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Updating user..." : "Add Member"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserRole;

import { styles } from "@/app/styles/style";
import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/radux/features/user/userApiSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserRole = ({
  active,
  setActive,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");

  const { refetch, data } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  console.log("data roles", { data });

  const [updateUserRole, { isLoading, isSuccess, isError, error }] =
    useUpdateUserRoleMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Role updated");
      setActive(false);
    }
    if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.error || "Failed to update role");
    }
  }, [isSuccess, isError, error, refetch, setActive]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data?.users || data.users.length === 0) {
      toast.error("No users found");
      return;
    }

    // Find the correct user using email
    const user = data.users.find((u: any) => u.email === email);

    if (!user) {
      toast.error("Email does not match any user");
      return;
    }

    if (!user._id) {
      toast.error("User ID not found");
      return;
    }

    // Ensure the found user's ID matches its email
    if (
      String(user._id) !==
      String(data.users.find((u: any) => u.email === user.email)?._id)
    ) {
      toast.error("User ID and email mismatch");
      return;
    }

    try {
      await updateUserRole({ id: user._id, role });
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xs mx-auto">
        {/* Close button */}
        <button
          onClick={() => setActive(false)}
          className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg text-sm"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Main card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-4 py-4 text-center">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white font-Poppins">
              Add Member
            </h2>
            <p className="text-blue-100 mt-1 text-xs">Assign roles</p>
          </div>

          {/* Form content */}
          <div className="px-4 py-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    className={`${styles.input} w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Role select */}
              <div className="space-y-1">
                <label
                  htmlFor="role"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  Role
                </label>
                <div className="relative">
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`${styles.input} w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer`}
                  >
                    <option value="admin" className="bg-white dark:bg-gray-700">
                      Admin
                    </option>
                    <option value="user" className="bg-white dark:bg-gray-700">
                      User
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setActive(false)}
                  className="flex-1 px-3 py-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className={`flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium text-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-1`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRole;
