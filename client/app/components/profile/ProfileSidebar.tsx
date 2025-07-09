import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import styles from "../../styles/styles";
import { SiCoursera } from "react-icons/si";
import { avatar as avatarIcon } from "@/public";
import { AiOutlineLogout } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const ProfileSidebar: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const menuItemStyle =
    "w-full flex items-center px-4 py-3 cursor-pointer transition-colors duration-200";
  const activeStyle =
    "bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-600 dark:border-blue-400";
  const inactiveStyle = "hover:bg-slate-50 dark:hover:bg-slate-700/50";

  return (
    <div className="w-full">
      <div
        className={styles.combineStyles(
          menuItemStyle,
          active === 1 ? activeStyle : inactiveStyle
        )}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
          alt=""
          width={24}
          height={24}
          className="w-[20px] h-[20px] 800px:w-[24px] 800px:h-[24px] cursor-pointer rounded-full"
        />
        <h5
          className={styles.combineStyles(
            "pl-3 800px:block hidden font-Poppins text-sm font-medium",
            active === 1
              ? "text-blue-700 dark:text-blue-300"
              : "text-slate-700 dark:text-slate-300"
          )}
        >
          My Account
        </h5>
      </div>
      <div
        className={styles.combineStyles(
          menuItemStyle,
          active === 2 ? activeStyle : inactiveStyle
        )}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine
          size={20}
          className={
            active === 2
              ? "text-blue-700 dark:text-blue-300"
              : "text-slate-700 dark:text-slate-300"
          }
        />
        <h5
          className={styles.combineStyles(
            "pl-3 800px:block hidden font-Poppins text-sm font-medium",
            active === 2
              ? "text-blue-700 dark:text-blue-300"
              : "text-slate-700 dark:text-slate-300"
          )}
        >
          Change Password
        </h5>
      </div>
      <div
        className={styles.combineStyles(
          menuItemStyle,
          active === 3 ? activeStyle : inactiveStyle
        )}
        onClick={() => setActive(3)}
      >
        <SiCoursera
          size={20}
          className={
            active === 3
              ? "text-blue-700 dark:text-blue-300"
              : "text-slate-700 dark:text-slate-300"
          }
        />
        <h5
          className={styles.combineStyles(
            "pl-3 800px:block hidden font-Poppins text-sm font-medium",
            active === 3
              ? "text-blue-700 dark:text-blue-300"
              : "text-slate-700 dark:text-slate-300"
          )}
        >
          Enrolled Courses
        </h5>
      </div>
      {user.role === "admin" && (
        <Link
          className={styles.combineStyles(
            menuItemStyle,
            active === 6 ? activeStyle : inactiveStyle
          )}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className={
              active === 6
                ? "text-blue-700 dark:text-blue-300"
                : "text-slate-700 dark:text-slate-300"
            }
          />
          <h5
            className={styles.combineStyles(
              "pl-3 800px:block hidden font-Poppins text-sm font-medium",
              active === 6
                ? "text-blue-700 dark:text-blue-300"
                : "text-slate-700 dark:text-slate-300"
            )}
          >
            Admin Dashboard
          </h5>
        </Link>
      )}
      <div
        className={styles.combineStyles(
          menuItemStyle,
          active === 4 ? activeStyle : inactiveStyle
        )}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout
          size={20}
          className={
            active === 4
              ? "text-blue-700 dark:text-blue-300"
              : "text-slate-700 dark:text-slate-300"
          }
        />
        <h5
          className={styles.combineStyles(
            "pl-3 800px:block hidden font-Poppins text-sm font-medium",
            active === 4
              ? "text-blue-700 dark:text-blue-300"
              : "text-slate-700 dark:text-slate-300"
          )}
        >
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default ProfileSidebar;
