"use client";
import styles from "../../styles/styles";
import ProfileInfo from "./ProfileInfo";
import { signOut } from "next-auth/react";
import ProfileSidebar from "./ProfileSidebar";
import ChangePassword from "./ChangePassword";
import React, { FC, useEffect, useState } from "react";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";

type Props = {
  user: any;
};

const ProfileDashboard: FC<Props> = ({ user }) => {
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  return (
    <div className={styles.sectionStyles.container}>
      <div className="flex gap-8">
        <div
          className={styles.combineStyles(
            "w-[80px] 800px:w-[320px] transition-all duration-200 sticky h-fit",
            styles.cardStyles.base
          )}
        >
          <ProfileSidebar
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logOutHandler={logOutHandler}
          />
        </div>

        <div className="flex-1">
          {active === 1 && (
            <div className={styles.cardStyles.base}>
              <ProfileInfo avatar={avatar} user={user} />
            </div>
          )}

          {active === 2 && (
            <div className={styles.cardStyles.base}>
              <ChangePassword />
            </div>
          )}

          {active === 3 && (
            <div
              className={styles.combineStyles(styles.cardStyles.base, "p-8")}
            >
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                <h1 className="text-center text-[18px] font-Poppins dark:text-white text-black">
                  Coming Soon...
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
