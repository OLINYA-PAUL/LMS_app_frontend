import { styles } from "@/app/styles/style";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaLongArrowAltRight } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/radux/features/auth/authApi";

interface VerificationPops {
  setRoute: React.Dispatch<SetStateAction<string>>;
}
interface VerifyNumber {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
}

const Verification = ({ setRoute }: VerificationPops) => {
  const { token } = useSelector((state: any) => state?.auth);

  const [isValideError, setIsValideError] = useState<boolean>(false);
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
  });
  const [activation, { isSuccess, error, data }] = useActivationMutation();

  useEffect(() => {
    if (isSuccess) {
      const message: any = data?.message || "Token verified! ✔✔";
      // Navigate to Home screen
      setRoute("Login");
      toast.success(message + "✔✔");
    }

    if (error) {
      if ("data" in error) {
        const errorData = (error as any) || "failed to activate your account";
        toast.success(errorData.data.error);

        setIsValideError(true);
      }
    }
  }, [isSuccess, error]);

  const InputRef = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const isDisabled = Object.values(verifyNumber).some((value) => value === "");

  const verifyHandleChange = async () => {
    const verifyActivationCode: any = Object.values(verifyNumber).join("");

    if (verifyActivationCode.length !== 6) {
      setIsValideError(true);
      return;
    }
    const activeCode = await activation({
      activation_token: token,
      activation_code: verifyActivationCode,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only numbers or empty values
    setIsValideError(false);
    setVerifyNumber({ ...verifyNumber, [index]: value });

    // Auto-focus next input or previous input
    if (value === "" && index > 0) {
      InputRef[index - 1].current?.focus();
    } else if (value.length === 1 && index < 6) {
      InputRef[index + 1]?.current?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={`${styles.title} `}>Verify Your Account</h1>
      <div className="bg-blue-800 dark:bg-white rounded-full p-2 w-16 h-16 flex items-center justify-center mt-3 shadow-md">
        <VscWorkspaceTrusted className="w-10 h-10 dark:text-blue-600 text-white font-extrabold " />
      </div>
      <div className=" mt-5">
        {Object.keys(verifyNumber).map((key: string, index: number) => (
          <input
            key={index}
            ref={InputRef[index]}
            maxLength={1}
            onChange={(e) => handleInputChange(index, e.target.value)}
            value={verifyNumber[key as keyof VerifyNumber]}
            className={`${
              isValideError
                ? "border-2 border-red-600 shake_animation"
                : "border focus:border-blue-500 dark:border-blue-500 "
            } h-[65px] w-[65px] font-Poppins text-black dark:text-white text-[18px] p-2 ml-3 rounded-lg text-center bg-transparent border_colour`}
          />
        ))}

        <div className="mt-10 flex flex-col items-center justify-center">
          <button
            disabled={isDisabled}
            type="button"
            className={`${isValideError && " border-2 border-red-600"}  ${
              isDisabled
                ? " cursor-not-allowed dark:text-white dark:bg-gray-500"
                : "bg-black dark:bg-white dark:text-black"
            } font-Poppins text-black font-extrabold text-[18px] border-2 focus:border-blue-500 dark:border-blue-500 ml-3 px-5 p-3 rounded-lg text-center bg-transparent border_colour`}
            onClick={() => verifyHandleChange()}
          >
            {isDisabled ? "Input OTP" : "Verify OTP"}
          </button>
        </div>

        <div
          className="flex cursor-pointer items-center justify-center gap-3  text-black dark:text-white transition-all duration-300 transform mt-10 text-center font-Poppins text-[19px]"
          onClick={() => setRoute("Login")}
        >
          <p> Go back to Sign in? </p>
          <p className="text-blue-500"> Sign in </p>
          <FaLongArrowAltRight
            width={20}
            className="w-4 h-4 cursor-pointer hover:scale-105 transition-transform duration-200 "
          />
        </div>
      </div>
    </div>
  );
};

export default Verification;
