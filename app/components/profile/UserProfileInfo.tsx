// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import customAvatar from "../../../public/assets/profile_image.jpg";
// import { BiUserCircle } from "react-icons/bi";
// import { styles } from "@/app/styles/style";
// import {
//   useUpdateUserAvatarMutation,
//   useUpdateUserNameMutation,
// } from "@/radux/features/user/userApiSlice";
// import toast from "react-hot-toast";
// import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
// import { ImSpinner } from "react-icons/im";

// interface UserProps {
//   user: any;
//   avatar: string | null;
// }

// const UserProfileInfo = ({ user, avatar }: UserProps) => {
//   const [updateUserAvatar, { isSuccess, isLoading, error, data }] =
//     useUpdateUserAvatarMutation();
//   const [
//     updateUserName,
//     {
//       isSuccess: updateNameSuccess,
//       isLoading: userLoading,
//       error: userNameError,
//       data: userData,
//     },
//   ] = useUpdateUserNameMutation();
//   const [userName, setUserName] = useState(user?.name || "");
//   const [loadUser, setLoadUser] = useState(false);
//   const {} = useLoadUserQuery(undefined, { skip: loadUser ? true : false });

//   useEffect(() => {
//     if (isSuccess) {
//       setLoadUser(true);
//       const message = data?.message || "Image uploaded successfully";
//       toast.success(message);
//     }

//     if (updateNameSuccess) {
//       toast.success("Name changed successfully.");
//     }
//     if (error) {
//       setLoadUser(false);
//       const errorMessage =
//         (error as any)?.data?.error || "Failed to upload image";
//       toast.error(errorMessage);
//     }
//     if (userNameError) {
//       toast.success("Name change failed. Please try again.");
//     }
//   }, [isSuccess, error, data, userNameError, updateNameSuccess]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     try {
//       if (e.target.files && e.target.files[0]) {
//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.onload = async () => {
//           if (reader.readyState === FileReader.DONE) {
//             await updateUserAvatar({ avatar: reader.result as string });
//           }
//         };

//         reader.readAsDataURL(file);
//       }
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       if (userName !== "") {
//         await updateUserName({
//           name: userName,
//         });
//       }
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="w-full p-4 mx-auto">
//       <div className=" flex items-center justify-center">
//         <div className="relative inline-block">
//           {isLoading ? (
//             <div className="flex items-center justify-center gap-3">
//               <ImSpinner className="w-5 h-5 text-black dark:text-green-400 " />
//               <p>Please wait...</p>
//             </div>
//           ) : (
//             <label htmlFor="profile_picture" className="cursor-pointer">
//               <Image
//                 src={user.avatar?.url ? user.avatar?.url : customAvatar}
//                 alt="profile_picture"
//                 className="rounded-full sm:w-[50px] sm:h-[50px] md:w-[80px] md:h-[80px] border-2 border-white "
//                 width={50}
//                 height={50}
//               />

//               <div className="absolute right-0 bottom-0 bg-black rounded-full p-1 border-2 border-white">
//                 <BiUserCircle className="text-white w-6 h-6 z-1" />
//               </div>
//             </label>
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             id="profile_picture"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//         </div>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="w-full">
//           <label htmlFor="name" className={`${styles.lable} mt-5`}>
//             Full Name
//           </label>
//           <br />
//           <input
//             type="text"
//             value={userName}
//             onChange={(e: any) => setUserName(e.target.value)}
//             className="w-full p-3 outline-none rounded-lg bg-transparent border border-gray-400 mt-5"
//           />
//           <div className=" mt-[15px]">
//             <label htmlFor="email" className={`${styles.lable}`}>
//               Email
//             </label>
//             <br />
//             <input
//               type="email"
//               readOnly
//               value={user?.email}
//               className="w-full p-3 outline-none rounded-lg  border bg-gray-300 mt-5 cursor-not-allowed"
//             />
//           </div>
//         </div>
//         {/* Submit Button */}
//         <div className="w-full mt-5">
//           {userLoading ? (
//             <div className="flex items-center justify-center gap-3">
//               <ImSpinner className="w-5 h-5 text-black dark:text-green-400 " />
//               <p>Please wait...</p>
//             </div>
//           ) : (
//             <button
//               type="submit"
//               className="mt-5 w-full p-3 rounded-lg bg-blue-500 text-white text-center hover:bg-blue-600 transition duration-300"
//             >
//               Submit
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserProfileInfo;

import Image from "next/image";
import React, { useEffect, useState } from "react";
import customAvatar from "../../../public/assets/profile_image.jpg";
import { BiUserCircle } from "react-icons/bi";
import { styles } from "@/app/styles/style";
import {
  useUpdateUserAvatarMutation,
  useUpdateUserNameMutation,
} from "@/radux/features/user/userApiSlice";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
import { ImSpinner } from "react-icons/im";

interface UserProps {
  user: any;
  avatar: string | null;
}

const UserProfileInfo = ({ user, avatar }: UserProps) => {
  const [updateUserAvatar, { isSuccess, isLoading, error, data }] =
    useUpdateUserAvatarMutation();
  const [updateUserName, { isSuccess: nameUpdated, isLoading: nameLoading }] =
    useUpdateUserNameMutation();
  const [userName, setUserName] = useState(user?.name || "");

  // Fetch user data (this will auto-refresh after mutations)
  const { refetch } = useLoadUserQuery(undefined);

  useEffect(() => {
    if (isSuccess) {
      refetch(); // Reload user data after avatar update
      toast.success(data?.message || "Image uploaded successfully");
    }

    if (nameUpdated) {
      refetch(); // Reload user data after name update
      toast.success("Name changed successfully.");
    }

    if (error) {
      toast.error((error as any)?.data?.error || "Failed to upload image");
    }
  }, [isSuccess, nameUpdated, error, data, refetch]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.readyState === FileReader.DONE) {
          await updateUserAvatar({ avatar: reader.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName) {
      await updateUserName({ name: userName });
    }
  };

  return (
    <div className="w-full p-4 mx-auto">
      <div className="flex items-center justify-center">
        <div className="relative inline-block">
          {isLoading ? (
            <div className="flex items-center justify-center gap-3">
              <ImSpinner className="w-5 h-5 text-black dark:text-green-400" />
              <p>Please wait...</p>
            </div>
          ) : (
            <label htmlFor="profile_picture" className="cursor-pointer">
              <Image
                src={user?.avatar?.url || customAvatar}
                alt="profile_picture"
                className="rounded-full sm:w-[50px] sm:h-[50px] md:w-[80px] md:h-[80px] border-2 border-white"
                width={50}
                height={50}
              />
              <div className="absolute right-0 bottom-0 bg-black rounded-full p-1 border-2 border-white">
                <BiUserCircle className="text-white w-6 h-6 z-1" />
              </div>
            </label>
          )}
          <input
            type="file"
            accept="image/*"
            id="profile_picture"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <label htmlFor="name" className={`${styles.lable} mt-5`}>
            Full Name
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 outline-none rounded-lg bg-transparent border border-gray-400 mt-5"
          />
          <div className="mt-[15px]">
            <label htmlFor="email" className={`${styles.lable}`}>
              Email
            </label>
            <input
              type="email"
              readOnly
              value={user?.email}
              className="w-full p-3 outline-none rounded-lg border bg-gray-300 mt-5 cursor-not-allowed"
            />
          </div>
        </div>
        <div className="w-full mt-5">
          {nameLoading ? (
            <div className="flex items-center justify-center gap-3">
              <ImSpinner className="w-5 h-5 text-black dark:text-green-400" />
              <p>Please wait...</p>
            </div>
          ) : (
            <button
              type="submit"
              className="mt-5 w-full p-3 rounded-lg bg-blue-500 text-white text-center hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfileInfo;
