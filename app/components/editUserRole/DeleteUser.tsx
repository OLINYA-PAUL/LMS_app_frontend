// import { styles } from "@/app/styles/style";
// import {
//   useGetAllUsersQuery,
//   useDeleteUserMutation,
// } from "@/radux/features/user/userApiSlice";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const DeleteUser = ({
//   isActiveDelete,
//   setIsActiveDelete,
// }: {
//   isActiveDelete: boolean;
//   setIsActiveDelete: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   const { refetch, data } = useGetAllUsersQuery(
//     {},
//     { refetchOnMountOrArgChange: true }
//   );

//   const [deleteUserMutation, { isLoading, isSuccess, error }] =
//     useDeleteUserMutation();

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("User Deleted");
//       refetch();
//       setIsActiveDelete(false);
//     }

//     if (error) {
//       console.log("deleteing user error", error);
//       const errorData = error as any;
//       toast.error(errorData?.error || "Failed to delete user");
//       console.log("deleteing user error", errorData.error);
//       setIsActiveDelete(false);
//     }
//   }, [isSuccess, error, refetch, setIsActiveDelete]);

//   const handleDeleteUser = async () => {
//     if (!data?.users || data.users.length === 0) {
//       toast.error("No users found");
//       return;
//     }

//     try {
//       await deleteUserMutation({ id: data.users[0]._id }); // Ensuring consistency with `data.users`
//     } catch (error) {
//       toast.error("No user with that ID");
//     }
//   };

//   return (
//     <div className="w-[30%] p-5 flex items-center justify-center bg-blue-950 rounded-md">
//       <div className="w-full">
//         <div className="w-full">
//           <div className="font-bold text-lg text-black dark:text-white font-Poppins text-center">
//             Are you sure you want to <br /> delete this user?
//           </div>
//           <div className="mt-10 w-full flex items-center justify-between max-sm:flex-wrap md:flex-nowrap">
//             <button
//               className="bg-red-500 text-black dark:text-white py-2 rounded-full px-6"
//               type="button"
//               onClick={() => setIsActiveDelete(false)}
//             >
//               Cancel
//             </button>
//             <button
//               className={`bg-blue-500 text-black dark:text-white py-2 rounded-full px-6 ${
//                 isLoading && "cursor-not-allowed"
//               }`}
//               type="submit"
//               disabled={isLoading}
//               onClick={handleDeleteUser}
//             >
//               {isLoading ? "Deleting user..." : "Delete"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteUser;




import { styles } from "@/app/styles/style";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "@/radux/features/user/userApiSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DeleteUser = ({
  isActiveDelete,
  setIsActiveDelete,
}: {
  isActiveDelete: boolean;
  setIsActiveDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { refetch, data } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteUserMutation, { isLoading, isSuccess, error }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Deleted");
      refetch();
      setIsActiveDelete(false);
    }

    if (error) {
      console.log("deleteing user error", error);
      const errorData = error as any;
      toast.error(errorData?.error || "Failed to delete user");
      console.log("deleteing user error", errorData.error);
      setIsActiveDelete(false);
    }
  }, [isSuccess, error, refetch, setIsActiveDelete]);

  const handleDeleteUser = async () => {
    if (!data?.users || data.users.length === 0) {
      toast.error("No users found");
      return;
    }

    try {
      await deleteUserMutation({ id: data.users[0]._id }); // Ensuring consistency with `data.users`
    } catch (error) {
      toast.error("No user with that ID");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm mx-auto">
        {/* Close button */}
        <button
          onClick={() => setIsActiveDelete(false)}
          className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
          aria-label="Close modal"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Main card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header with warning design */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 px-4 py-5 text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white font-Poppins">
              Delete User
            </h2>
            <p className="text-red-100 mt-1 text-xs">Permanent action</p>
          </div>

          {/* Content */}
          <div className="px-4 py-6">
            {/* Warning message */}
            <div className="text-center mb-6">
              <p className="text-gray-700 dark:text-gray-300 font-medium text-sm leading-relaxed">
                Are you sure you want to delete this user?
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                This action cannot be undone and will permanently remove all
                user data.
              </p>
            </div>

            {/* User info card (if available) */}
            {data?.users?.[0] && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {data.users[0].name || "User"}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {data.users[0].email || "No email"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsActiveDelete(false)}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleDeleteUser}
                className={`flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 ${
                  isLoading && "cursor-not-allowed"
                }`}
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
                    Deleting...
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete User
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
