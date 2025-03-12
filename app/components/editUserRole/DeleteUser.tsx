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
    <div className="w-[30%] p-5 flex items-center justify-center bg-blue-950 rounded-md">
      <div className="w-full">
        <div className="w-full">
          <div className="font-bold text-lg text-black dark:text-white font-Poppins text-center">
            Are you sure you want to <br /> delete this user?
          </div>
          <div className="mt-10 w-full flex items-center justify-between max-sm:flex-wrap md:flex-nowrap">
            <button
              className="bg-red-500 text-black dark:text-white py-2 rounded-full px-6"
              type="button"
              onClick={() => setIsActiveDelete(false)}
            >
              Cancel
            </button>
            <button
              className={`bg-blue-500 text-black dark:text-white py-2 rounded-full px-6 ${
                isLoading && "cursor-not-allowed"
              }`}
              type="submit"
              disabled={isLoading}
              onClick={handleDeleteUser}
            >
              {isLoading ? "Deleting user..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
