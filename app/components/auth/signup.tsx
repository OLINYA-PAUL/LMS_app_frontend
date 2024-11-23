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
interface LoginPops {
  setRoute: React.Dispatch<SetStateAction<string>>;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Login = ({ setRoute, setIsOpen }: LoginPops) => {
  const [show, setShow] = useState<boolean>(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: ({ email, password }) => {
      console.log({ email, password });
    },
  });

  const {
    errors,
    touched,
    handleChange,
    resetForm,
    values,
    status,
    handleSubmit,
  } = formik;

  return (
    <div className="flex flex-1 flex-col dark:bg-gradient-to-b  dark:from-blue-900 dark:to-black duration-300 w-full md:max-w-[50%] p-6 bg-white shadow-md rounded-lg absolute top-[6%] left-[25%] border-2 dark:border-[#ffffff1c]  transition ">
      <h1 className={`${styles.title} `}>Singup With React Prodigy</h1>
      <form onSubmit={handleSubmit} className="mt-5 mb-4">
        <div>
          <label htmlFor="email" className={`${styles.lable} `}>
            Email
          </label>
          <input
            id="text"
            name="text"
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
            value={values.name}
            className={`${
              errors.email && touched.name
                ? "border-red-600"
                : "border-transparent"
            } w-full rounded-md p-3 mt-3 bg-slate-300 text-black dark:text-white 
            border-2 border-r-slate-200 
            focus:outline-none focus:ring-4 focus:ring-blue-500
            focus:ring-opacity-50 
            transition-all duration-300 
            bg-gradient-to-r from-blue-500 to-teal-400 dark:placeholder:text-white`}
            style={{
              backgroundImage: "linear-gradient(45deg, #6ee7b7, #3b82f6)",
              borderImage: "linear-gradient(45deg, #6ee7b7, #3b82f6) 1",
            }}
          />
        </div>
        <div>
          <label htmlFor="email" className={`${styles.lable} `}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={values.email}
            className={`${
              errors.email && touched.email
                ? "border-red-600"
                : "border-transparent"
            } w-full rounded-md p-3 mt-3 bg-slate-300 text-black dark:text-white 
            border-2 border-r-slate-200 
            focus:outline-none focus:ring-4 focus:ring-blue-500
            focus:ring-opacity-50 
            transition-all duration-300 
            bg-gradient-to-r from-blue-500 to-teal-400 dark:placeholder:text-white`}
            style={{
              backgroundImage: "linear-gradient(45deg, #6ee7b7, #3b82f6)",
              borderImage: "linear-gradient(45deg, #6ee7b7, #3b82f6) 1",
            }}
          />
        </div>
        text
        <div className="mt-3">
          <label htmlFor="Password" className={`${styles.lable} `}>
            Password
          </label>
          <div className="flex items-center mt-3 rounded-md bg-gradient-to-r from-blue-500 to-teal-400 p-[2px]">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              placeholder="Enter your Password"
              onChange={handleChange}
              value={values.password}
              className={`${
                errors.email && touched.email
                  ? "border-red-600"
                  : "border-transparent"
              }  w-full p-3 text-black dark:text-white bg-transparent focus:outline-none 
            placeholder:text-gray-700 dark:placeholder:text-white`}
            />
            <div className="mr-5">
              {show ? (
                <AiOutlineEye
                  className="w-6 h-6 text-black dark:text-white cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => setShow(false)} // Toggle visibility
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="w-6 h-6 text-black dark:text-white cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => setShow(true)} // Toggle visibility
                />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={
            values.name === "" || values?.email === "" || values.password === ""
          }
          className={`${
            styles.submit
          } w-full py-3 mt-10 rounded-full cursor-pointer text-black bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 dark:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-501 ${
            values.name === "" ||
            values?.email === "" ||
            values?.password === ""
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          SIng up
        </button>
        <div className="text-black dark:text-white transition-all duration-300 transform mt-10 font-extrabold text-center font-Poppins text-[20px]">
          Join with Goole
        </div>
        <div className="flex items-center justify-center gap-3 mt-5 ">
          <FcGoogle
            className="w-8 h-8 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => setShow(false)} // Toggle visibility
          />
          <AiFillGithub
            className="w-8 h-8 cursor-pointer hover:scale-105 transition-transform duration-200 ml-5"
            onClick={() => setShow(false)} // Toggle visibility
          />
        </div>
        <div
          className="flex cursor-pointer items-center justify-center gap-3  text-black dark:text-white transition-all duration-300 transform mt-5 text-center font-Poppins text-[19px]"
          onClick={() => setRoute("Sign-up")}
        >
          <p> have an account?</p>
          <p className="text-blue-500"> Sing in </p>
          <FaLongArrowAltRight
            width={20}
            className="w-4 h-4 cursor-pointer hover:scale-105 transition-transform duration-200 "
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
