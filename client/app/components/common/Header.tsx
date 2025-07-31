/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  HiOutlineMenuAlt3,
  HiOutlineUserCircle,
  HiOutlineX,
} from "react-icons/hi";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import Link from "next/link";
import Image from "next/image";
import { avatar } from "@/public";
import NavItems from "./Navigation";
import toast from "react-hot-toast";
import CustomModal from "./CustomModal";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import ThemeSwitcher from "./ThemeToggle";
import { useSession } from "next-auth/react";
import { useEffect, useState, type FC } from "react";
import { LoginForm, SignupForm, VerificationForm } from "../auth";

interface HeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
}

const Header: FC<HeaderProps> = ({
  activeItem,
  setOpen,
  route,
  open,
  setRoute,
}) => {
  const { data } = useSession();
  const [active, setActive] = useState(false);
  const [logout, setLogout] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data.user?.image,
        });
      }
    }

    if (data === null && isSuccess) {
      toast.success("Login Successfully");
    }
  }, [data, user, isSuccess, socialAuth]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
  return (
    <div className="w-full relative">
      <div
        className={`fixed top-0 left-0 w-full h-[80px] z-[80] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition duration-300 ${
          active ? "shadow-lg backdrop-blur-md" : ""
        }`}
      >
        <div className={styles.sectionStyles.container}>
          <div className="w-full h-[80px] flex items-center justify-between">
            <div>
              <Link href="/" className={styles.navStyles.brand}>
                Learneazy
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <NavItems isMobile={false} />
              <ThemeSwitcher />

              {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user.avatar ? user.avatar.url : avatar}
                    alt="User Avatar"
                    width={25}
                    height={25}
                    className={`w-[25px] h-[25px] rounded-full cursor-pointer ${
                      activeItem === 5 &&
                      "border-2 border-blue-600 dark:border-blue-400"
                    }`}
                  />
                </Link>
              ) : (
                <button
                  className="hidden 800px:block cursor-pointer text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-600 transition-colors"
                  onClick={() => setOpen(true)}
                >
                  <HiOutlineUserCircle size={25} />
                </button>
              )}

              <div className="800px:hidden">
                <button
                  className="p-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-600 transition-colors"
                  onClick={() => setOpenSidebar(true)}
                >
                  <HiOutlineMenuAlt3 size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {openSidebar && (
          <div className="fixed w-full h-screen top-0 left-0 z-[99999] bg-black/50 dark:bg-black/70">
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 top-0 right-0 shadow-2xl">
              <div
                className="p-4 flex justify-end cursor-pointer text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-600"
                onClick={() => setOpenSidebar(false)}
              >
                <HiOutlineX size={25} />
              </div>
              <NavItems isMobile={true} />
              <button
                onClick={() => setOpen(true)}
                className="flex items-center py-5 px-6 font-Poppins font-[400] text-[18px] text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-600 cursor-pointer transition-colors"
              >
                <HiOutlineUserCircle size={25} className="mr-2" />
                <span>Account</span>
              </button>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={LoginForm}
            />
          )}
        </>
      )}
      {route === "Sign-up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignupForm}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={VerificationForm}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
