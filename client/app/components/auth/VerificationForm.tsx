import { toast } from "react-hot-toast";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import React, { FC, useEffect, useRef, useState } from "react";
import { useActivationMutation } from "@/redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const VerificationForm: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [activation, { isSuccess, error }] = useActivationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully!");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occured:", error);
      }
    }
  }, [isSuccess, error, setRoute]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }

    await activation({
      activationToken: token,
      activationCode: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1
          className={styles.combineStyles(
            styles.titleStyles.h4,
            "text-center mb-2"
          )}
        >
          Verify Your Account
        </h1>
        <p className={styles.titleStyles.subtitleSmall}>
          Enter the 4-digit code sent to your email
        </p>
      </div>

      <div className="w-full flex items-center justify-center mb-6">
        <div
          className={styles.combineStyles(
            styles.utilityStyles.bgAccent,
            "w-16 h-16 rounded-full flex items-center justify-center"
          )}
        >
          <VscWorkspaceTrusted
            size={32}
            className={styles.utilityStyles.textAccent}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mb-6">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={styles.combineStyles(
              "w-12 h-12 bg-white dark:bg-slate-800 border-2 rounded-lg flex items-center justify-center text-lg outline-none text-center transition-all duration-200 focus:ring-2 focus:ring-offset-0",
              invalidError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 animate-pulse"
                : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
            )}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>

      <button
        onClick={verificationHandler}
        className={styles.combineStyles(
          styles.buttonStyles.base,
          styles.buttonStyles.primary,
          styles.buttonStyles.small,
          "w-full mb-4"
        )}
      >
        Verify OTP
      </button>

      <div className="text-center">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Go back to sign in?{" "}
          <button
            type="button"
            className={styles.combineStyles(
              styles.utilityStyles.textAccent,
              "font-medium hover:underline cursor-pointer"
            )}
            onClick={() => setRoute("Login")}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerificationForm;
