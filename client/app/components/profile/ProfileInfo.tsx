import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import Image from "next/image";
import { toast } from "react-hot-toast";
import styles from "../../styles/styles";
import { avatar as avatarIcon } from "@/public";
import { AiOutlineCamera } from "react-icons/ai";
import React, { FC, useEffect, useState } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [loadUser, setLoadUser] = useState(false);
  const [name, setName] = useState(user && user.name);

  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();

  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();

  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if (success) {
      toast.success("Profile updated successfully!");
      setLoadUser(true);
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <div className={styles.cardStyles.paddingLarge}>
      <div className="flex flex-col items-center space-y-8">
        <div className="relative">
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt="Profile"
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-4 border-blue-600 dark:border-blue-400 rounded-full object-cover"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[35px] h-[35px] bg-blue-600 dark:bg-blue-500 rounded-full absolute bottom-0 right-0 flex items-center justify-center cursor-pointer border-4 border-white dark:border-slate-800 shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              <AiOutlineCamera size={18} className="text-white" />
            </div>
          </label>
        </div>

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className={styles.combineStyles(
                  styles.labelStyles.base,
                  styles.labelStyles.default
                )}
              >
                Full Name
              </label>
              <input
                type="text"
                className={styles.combineStyles(
                  styles.inputStyles.base,
                  styles.inputStyles.default,
                  styles.inputStyles.medium
                )}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                className={styles.combineStyles(
                  styles.labelStyles.base,
                  styles.labelStyles.default
                )}
              >
                Email Address
              </label>
              <input
                type="email"
                readOnly
                className={styles.combineStyles(
                  styles.inputStyles.base,
                  styles.inputStyles.default,
                  styles.inputStyles.medium,
                  "bg-slate-50 dark:bg-slate-700 cursor-not-allowed"
                )}
                value={user?.email}
                placeholder="Email address"
              />
            </div>

            <button
              type="submit"
              className={styles.combineStyles(
                styles.buttonStyles.base,
                styles.buttonStyles.primary,
                styles.buttonStyles.medium,
                "w-full mt-6"
              )}
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
