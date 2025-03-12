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
}: // data,
{
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
    <div className="w-[30%] p-5 flex items-center justify-center bg-blue-950 rounded-md">
      <div className="w-full">
        <div className="w-full">
          <div className="font-bold text-2xl text-black dark:text-white font-Poppins text-center">
            Add New Member
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 w-full">
              <input
                type="email"
                placeholder="Email"
                className={`${styles.input} !my-2 !p-auto !text-sm `}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Transparent Select */}
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`${styles.input} !text-sm !p-auto !my-2 !bg-transparent w-full p-3 border border-gray-400 dark:border-gray-600 rounded-md focus:outline-none text-gray-700 dark:text-white appearance-none`}
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
                className={`bg-blue-500 text-white p-2 rounded-md ${
                  isLoading && "cursor-not-allowed"
                }`}
                type="submit"
                disabled={isLoading}
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
