import React, { useEffect, useState } from "react";
import SideBarProfile from "../../components/SideBarProfile";
import { useDispatch } from "react-redux";
import { useLazyLogoutUserQuery } from "@/radux/features/auth/authApi";
import toast from "react-hot-toast";
import { userLogout } from "@/radux/features/auth/authSlice";
import { signOut } from "next-auth/react";

const Profile = ({ user }: { user: any }) => {
  const [scroll, setscroll] = useState(false);
  const [isActive, setIsActive] = useState<number>(1);
  const [avatar, SetAvatar] = useState<string | null>(null);
  const [logOut, SetlogOut] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [
    logoutUser,
    { isSuccess: logoutSuccess, error: logoutError, isLoading },
  ] = useLazyLogoutUserQuery();

  useEffect(() => {
    if (logoutSuccess) {
      toast.success("You have logged out successfully");
      // Clear user data from Redux store
      dispatch(userLogout());
    }
    if (logoutError) {
      toast.error("There was an error logging out");
      console.error("Logout Error: ", logoutError);
    }
  }, [logoutSuccess, logoutError, dispatch]);

  const handleLogoutUser = async () => {
    await logoutUser(undefined); // Triggers the API call
    await signOut(); // signout from social auth
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setscroll(true);
      else setscroll(false);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-[90%] mx-auto">
      <div
        className={`${
          scroll ? "top-[130px]" : "top-[30px]"
        } w-full flex rounded-md  sticky my-[8px]`}
      >
        <div className="w-full flex flex-col tems-center justify-center">
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
