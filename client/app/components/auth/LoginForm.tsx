"use client";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import styles from "../../styles/styles";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import React, { FC, useEffect, useState } from "react";
import { useLoginMutation } from "@/redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const LoginForm: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully.");
      setOpen(false);
      //   refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1
          className={styles.combineStyles(
            styles.titleStyles.h4,
            "text-center mb-2"
          )}
        >
          Welcome Back
        </h1>
        <p className={styles.titleStyles.subtitleSmall}>
          Sign in to your Learneazy account
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className={styles.combineStyles(
          styles.formStyles.container,
          "space-y-4"
        )}
      >
        <div
          className={styles.combineStyles(styles.formStyles.group, "space-y-1")}
        >
          <label
            htmlFor="email"
            className={styles.combineStyles(
              styles.labelStyles.base,
              styles.labelStyles.small,
              styles.labelStyles.required
            )}
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="Enter your email address"
            className={styles.combineStyles(
              styles.inputStyles.base,
              errors.email && touched.email
                ? styles.inputStyles.error
                : styles.inputStyles.default,
              styles.inputStyles.small
            )}
          />
          {errors.email && touched.email && (
            <span className={styles.formStyles.error}>{errors.email}</span>
          )}
        </div>

        <div
          className={styles.combineStyles(styles.formStyles.group, "space-y-1")}
        >
          <label
            htmlFor="password"
            className={styles.combineStyles(
              styles.labelStyles.base,
              styles.labelStyles.small,
              styles.labelStyles.required
            )}
          >
            Password
          </label>
          <div className="relative">
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="Enter your password"
              className={styles.combineStyles(
                styles.inputStyles.base,
                errors.password && touched.password
                  ? styles.inputStyles.error
                  : styles.inputStyles.default,
                styles.inputStyles.small,
                "pr-10"
              )}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              onClick={() => setShow(!show)}
            >
              {!show ? (
                <AiOutlineEyeInvisible size={18} />
              ) : (
                <AiOutlineEye size={18} />
              )}
            </button>
          </div>
          {errors.password && touched.password && (
            <span className={styles.formStyles.error}>{errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.combineStyles(
            styles.buttonStyles.base,
            styles.buttonStyles.primary,
            styles.buttonStyles.small,
            "w-full"
          )}
        >
          Sign In
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-Poppins">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.secondary,
              styles.buttonStyles.small,
              "justify-center"
            )}
            onClick={() => signIn("google")}
          >
            <FcGoogle size={18} className="mr-2" />
            Google
          </button>
          <button
            type="button"
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.secondary,
              styles.buttonStyles.small,
              "justify-center"
            )}
            onClick={() => signIn("github")}
          >
            <AiFillGithub size={18} className="mr-2" />
            GitHub
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-Poppins">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className={styles.combineStyles(
                styles.utilityStyles.textAccent,
                "font-medium hover:underline cursor-pointer"
              )}
              onClick={() => setRoute("Sign-up")}
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
