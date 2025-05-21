import React, { SetStateAction, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUpSchema } from "../../../utils/authValidation";
import { styles } from "../../styles/style";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import { useRegisterMutation } from "@/radux/features/auth/authApi";
import toast from "react-hot-toast";

interface LoginPops {
  setRoute: React.Dispatch<SetStateAction<string>>;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Signup = ({ setRoute, setIsOpen }: LoginPops) => {
  const [show, setShow] = useState<boolean>(false);
  const [register, { error, isSuccess, data, reset }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      setRoute("Verification");
      toast?.success(message);
    }
    if (error && "data" in error) {
      const errorData = (error as any)?.data?.error || "Failed to register";
      toast?.error(errorData);
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async ({ name, email, password }) => {
      try {
        await register({ name, email, password });
        reset();
      } catch (error: any) {
        console.log(error.message);
      }
    },
  });

  const {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <div className="w-full max-w-md p-4 mx-auto shadow-sm rounded-md">
      <h1 className="text-[16px] font-semibold mb-3 text-center dark:text-white">
        Signup With React Prodigy
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3 text-sm">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-1 text-xs dark:text-white">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className={`w-full px-2 py-1 rounded border text-sm dark:text-white dark:bg-transparent ${
              errors.name && touched.name
                ? "border-red-600"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.name && touched.name && (
            <p className="text-red-500 mt-1 text-xs">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 text-xs dark:text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={`w-full px-2 py-1 rounded border text-sm dark:text-white dark:bg-transparent ${
              errors.email && touched.email
                ? "border-red-600"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 mt-1 text-xs">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-xs dark:text-white"
          >
            Password
          </label>
          <div className="flex items-center border rounded px-2 py-1 dark:border-gray-700">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="•••••••"
              className="w-full text-sm bg-transparent outline-none text-black dark:text-white"
            />
            {show ? (
              <AiOutlineEye
                className="w-4 h-4 text-black dark:text-white ml-2 cursor-pointer"
                onClick={() => setShow(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="w-4 h-4 text-black dark:text-white ml-2 cursor-pointer"
                onClick={() => setShow(true)}
              />
            )}
          </div>
          {errors.password && touched.password && (
            <p className="text-red-500 mt-1 text-xs">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={
            !values.name || !values.email || !values.password || isSubmitting
          }
          className={`w-full py-2 mt-1 rounded text-sm font-semibold transition-all ${
            !values.name || !values.email || !values.password
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isSubmitting ? (
            <ImSpinner className="animate-spin w-4 h-4 mx-auto" />
          ) : (
            "Sign up"
          )}
        </button>

        {/* OAuth */}
        <div className="text-center text-xs mt-4 dark:text-white">
          Or Join with
        </div>
        <div className="flex justify-center space-x-4 mt-2">
          <FcGoogle
            className="w-5 h-5 cursor-pointer"
            onClick={() => setShow(false)}
          />
          <AiFillGithub
            className="w-5 h-5 cursor-pointer"
            onClick={() => setShow(false)}
          />
        </div>

        {/* Switch to Login */}
        <div
          className="flex justify-center items-center text-xs mt-4 gap-1 text-black dark:text-white cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          <p>Already have an account?</p>
          <span className="text-blue-500">Sign in</span>
          <FaLongArrowAltRight className="w-3 h-3" />
        </div>
      </form>
    </div>
  );
};

export default Signup;
