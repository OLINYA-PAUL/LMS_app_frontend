// import React, { useEffect, useState } from "react";
// import { styles } from "@/app/styles/style";
// import { useUpdateUserPasswordMutation } from "@/radux/features/user/userApiSlice";
// import toast from "react-hot-toast";
// import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
// import { ImSpinner } from "react-icons/im";

// interface UserProps {
//   user: any;
// }

// const UserPasswordInfo = ({ user }: UserProps) => {
//   const [updateUserPassword, { isSuccess, isLoading, error, data }] =
//     useUpdateUserPasswordMutation();

//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [comfirmPassword, setComfirmedPassword] = useState("");
//   const [loadUser, setLoadUser] = useState(false);
//   const {} = useLoadUserQuery(undefined, { skip: loadUser ? true : false });

//   const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       if (newPassword !== comfirmPassword) {
//         toast.error("Password not match");

//         return;
//       } else {
//         await updateUserPassword({
//           oldpassword: oldPassword,
//           newpassword: newPassword,
//         });
//       }
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       setLoadUser(true);
//       const message = data?.message || "Password changed successfully";
//       toast.success(message);
//     }

//     if (error) {
//       setLoadUser(false);
//       const errorMessage =
//         (error as any)?.data?.error || "Failed to changed Password try again!";
//       toast.error(errorMessage);
//     }
//   }, [isSuccess, error, data]);

//   return (
//     <div className="w-full p-4 mx-auto">
//       <div className=" flex items-center justify-center  font-semibold md:text-2xl text-3xl mb-5  sm:text-xl sm:mb-5">
//         Change Password
//       </div>
//       <form onSubmit={handlePasswordSubmit}>
//         <div className="w-full">
//           <label htmlFor="name" className={`${styles.lable} mt-5`}>
//             Old Password
//           </label>
//           <br />
//           <input
//             type="password"
//             value={oldPassword}
//             onChange={(e: any) => setOldPassword(e.target.value)}
//             className="w-full p-3 outline-none rounded-lg bg-transparent border border-gray-400 mt-5"
//           />
//           <div className=" mt-[15px]">
//             <label htmlFor="email" className={`${styles.lable}`}>
//               New Password
//             </label>
//             <br />
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e: any) => setNewPassword(e.target.value)}
//               className="w-full p-3 outline-none rounded-lg border mt-5 bg-transparent "
//             />
//           </div>
//           <div className=" mt-[15px]">
//             <label htmlFor="email" className={`${styles.lable}`}>
//               Comfirm Password
//             </label>
//             <br />
//             <input
//               type="password"
//               value={comfirmPassword}
//               onChange={(e: any) => setComfirmedPassword(e.target.value)}
//               className="w-full p-3 outline-none rounded-lg border mt-5 bg-transparent "
//             />
//           </div>
//         </div>
//         <div className="w-full mt-5">
//           {isLoading ? (
//             <div className="flex items-center justify-center gap-3">
//               <ImSpinner className="w-5 h-5 text-black dark:text-green-400 " />
//               <p>Please wait...</p>
//             </div>
//           ) : (
//             <button
//               type="submit"
//               className="mt-5 font-bold w-full font-Poppins p-3 rounded-lg bg-blue-500 text-white text-center hover:bg-blue-600 transition duration-300"
//             >
//               Update Password
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserPasswordInfo;

import React, { useEffect, useState } from "react";
import { useUpdateUserPasswordMutation } from "@/radux/features/user/userApiSlice";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
import { ImSpinner } from "react-icons/im";

interface UserProps {
  user: any;
}

const UserPasswordInfo = ({ user }: UserProps) => {
  const [updateUserPassword, { isSuccess, isLoading, error, data }] =
    useUpdateUserPasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [comfirmPassword, setComfirmedPassword] = useState("");
  const [loadUser, setLoadUser] = useState(false);
  useLoadUserQuery(undefined, { skip: loadUser });

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== comfirmPassword) {
      toast.error("Password not match");
      return;
    }
    try {
      await updateUserPassword({
        oldpassword: oldPassword,
        newpassword: newPassword,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
      toast.success(data?.message || "Password changed successfully");
    }

    if (error) {
      setLoadUser(false);
      const errorMessage =
        (error as any)?.data?.error || "Failed to change password, try again!";
      toast.error(errorMessage);
    }
  }, [isSuccess, error, data]);

  return (
    <div className="w-full p-2 mx-auto text-sm">
      <h2 className="text-center font-medium text-base mb-3">
        Change Password
      </h2>
      <form onSubmit={handlePasswordSubmit} className="space-y-3">
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-xs font-medium mb-1"
          >
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-2 py-1 border border-gray-700 rounded bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-xs font-medium mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-2 py-1 border border-gray-700 rounded bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={comfirmPassword}
            onChange={(e) => setComfirmedPassword(e.target.value)}
            className="w-full px-2 py-1 border border-gray-700 rounded bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        <div className="mt-3">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 text-xs text-white">
              <ImSpinner className="animate-spin w-4 h-4" />
              <span>Please wait...</span>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-1.5 text-xs font-semibold border border-gray-700 rounded transition duration-200 text-white"
            >
              Update Password
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserPasswordInfo;
