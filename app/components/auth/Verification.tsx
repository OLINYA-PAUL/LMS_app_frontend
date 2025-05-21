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
      setRoute("Login");
      toast.success(message + "✔✔");
    }

    if (error) {
      if ("data" in error) {
        const errorData = (error as any) || "failed to activate your account";
        toast.error(errorData.data.error);
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
    await activation({
      activation_token: token,
      activation_code: verifyActivationCode,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    setIsValideError(false);
    setVerifyNumber({ ...verifyNumber, [index]: value });

    if (value === "" && index > 0) {
      InputRef[index - 1].current?.focus();
    } else if (value.length === 1 && index < 6) {
      InputRef[index + 1]?.current?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <h1 className={`${styles.title} text-sm mb-3`}>Verify Your Account</h1>

      <div className="bg-blue-800 dark:bg-white rounded-full p-1 w-10 h-10 flex items-center justify-center shadow-sm">
        <VscWorkspaceTrusted className="w-5 h-5 dark:text-blue-600 text-white" />
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-1">
        {Object.keys(verifyNumber).map((key: string, index: number) => (
          <input
            key={index}
            ref={InputRef[index]}
            maxLength={1}
            onChange={(e) => handleInputChange(index, e.target.value)}
            value={verifyNumber[key as keyof VerifyNumber]}
            className={`${
              isValideError
                ? "border border-red-500 animate-shake"
                : "border border-gray-400 focus:border-blue-500 dark:border-blue-500"
            } h-8 w-8 text-xs rounded text-center bg-transparent text-black dark:text-white`}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-col items-center">
        <button
          disabled={isDisabled}
          type="button"
          onClick={verifyHandleChange}
          className={`${
            isDisabled
              ? "cursor-not-allowed dark:text-white dark:bg-gray-500"
              : "bg-black dark:bg-white dark:text-black hover:opacity-90"
          } ${
            isValideError && "border border-red-500"
          } text-xs rounded px-3 py-1.5 mt-2 border`}
        >
          {isDisabled ? "Input OTP" : "Verify OTP"}
        </button>
      </div>

      <div
        className="flex items-center justify-center gap-2 mt-4 text-xs cursor-pointer text-black dark:text-white"
        onClick={() => setRoute("Login")}
      >
        <span>Go back to</span>
        <span className="text-blue-500">Sign in</span>
        <FaLongArrowAltRight className="w-3 h-3" />
      </div>
    </div>
  );
};

export default Verification;
