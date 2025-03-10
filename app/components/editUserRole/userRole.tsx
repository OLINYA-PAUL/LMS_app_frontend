import { styles } from "@/app/styles/style";
import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
import { useUpdateUserRoleMutation } from "@/radux/features/user/userApiSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserRole = ({
  active,
  setActive,
  data,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const { refetch } = useLoadUserQuery({}, { refetchOnMountOrArgChange: true });

  const [updateUserRole, { isLoading, isSuccess, isError, error }] =
    useUpdateUserRoleMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch(); // Refetch user data to sync with the latest changes
      toast.success("Role updated successfully");
      setActive(false);
    }
    if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.error || "Failed to update role");
    }
  }, [isSuccess, isError, error, refetch, setActive]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate if the email exists in the user list
    if (data?.users && !data.users.some((item: any) => item.email === email)) {
      toast.error("Email does not match");
      return;
    }

    if (!data?.users?.[0]?._id) {
      toast.error("User ID not found");
      return;
    }

    const id = data.users[0]._id;

    // Optimistically update the UI before waiting for API response
    await updateUserRole({ id, role });
    // .unwrap()
    // .then(() => {
    //   // Update the local state with the new role
    //   data.users &&= data.users.map((user: any) =>
    //     user._id === id ? { ...user, role } : user
    //   );
    // });
  };

  return (
    <div className="w-[50%] p-5 flex items-center justify-center">
      <div className="w-full">
        <div className="w-full">
          <div className="font-bold text-2xl text-black dark:text-white font-Poppins">
            Add New Member
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 w-full">
              <input
                type="email"
                placeholder="Email"
                className={`${styles.input}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Transparent Select */}
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`${styles.input} !bg-transparent w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md focus:outline-none text-gray-700 dark:text-white appearance-none`}
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
              >
                <option
                  value="admin"
                  className="text-gray-700 dark:text-white bg-transparent"
                >
                  Admin
                </option>
                <option
                  value="user"
                  className="text-gray-700 dark:text-white bg-transparent"
                >
                  User
                </option>
              </select>

              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                type="submit"
              >
                {isLoading ? "Updating user..." : "Add Member"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRole;
