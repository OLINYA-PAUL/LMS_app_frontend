import React, { useEffect, useState } from "react";
import SideBarProfile from "../../components/SideBarProfile";
import { useDispatch } from "react-redux";
import { useLazyLogoutUserQuery } from "@/radux/features/auth/authApi";
import toast from "react-hot-toast";
import { userLogout } from "@/radux/features/auth/authSlice";
import { signOut } from "next-auth/react";

const Profile = ({ user }: { user: any }) => {
  const [scroll, setScroll] = useState(false);
  const [isActive, setIsActive] = useState<number>(1);
  const [avatar, setAvatar] = useState<string | null>(null);

  const dispatch = useDispatch();

  const [
    logoutUser,
    { isSuccess: logoutSuccess, error: logoutError, isLoading },
  ] = useLazyLogoutUserQuery();

  useEffect(() => {
    if (logoutSuccess) {
      toast.success("You have logged out successfully");
      dispatch(userLogout()); // Clear user data from Redux store
    }
    if (logoutError) {
      toast.error("There was an error logging out");
      console.error("Logout Error: ", logoutError);
    }
  }, [logoutSuccess, logoutError, dispatch]);

  const handleLogoutUser = async () => {
    try {
      // Call backend logout first
      const response = await logoutUser({});
      if ("error" in response) {
        toast.error("Logout failed, please try again.");
        return;
      }

      // NextAuth sign-out without immediate redirection
      await signOut();

      // Clear user data from Redux store
      dispatch(userLogout());

      toast.success("You have logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 100);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-[90%] mx-auto">
      <div
        className={`${
          scroll ? "top-[130px]" : "top-[30px]"
        } w-full flex rounded-md sticky my-[8px]`}
      >
        <div className="w-full flex flex-col items-center justify-center">
          <SideBarProfile
            user={user}
            isActive={isActive}
            setIsActive={setIsActive}
            avatar={avatar}
            logOutUser={handleLogoutUser}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
