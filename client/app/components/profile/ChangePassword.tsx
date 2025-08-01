import { toast } from "react-hot-toast";
import styles from "../../styles/styles";
import React, { FC, useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";

type Props = {};

const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className={styles.cardStyles.paddingLarge}>
      <div className="max-w-md mx-auto">
        <h1
          className={styles.combineStyles(
            styles.titleStyles.section,
            "text-center mb-8"
          )}
        >
          Change Password
        </h1>

        <form onSubmit={passwordChangeHandler} className="space-y-6">
          <div>
            <label
              className={styles.combineStyles(
                styles.labelStyles.base,
                styles.labelStyles.default
              )}
            >
              Current Password
            </label>
            <input
              type="password"
              className={styles.combineStyles(
                styles.inputStyles.base,
                styles.inputStyles.default,
                styles.inputStyles.medium
              )}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your current password"
            />
          </div>

          <div>
            <label
              className={styles.combineStyles(
                styles.labelStyles.base,
                styles.labelStyles.default
              )}
            >
              New Password
            </label>
            <input
              type="password"
              className={styles.combineStyles(
                styles.inputStyles.base,
                styles.inputStyles.default,
                styles.inputStyles.medium
              )}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </div>

          <div>
            <label
              className={styles.combineStyles(
                styles.labelStyles.base,
                styles.labelStyles.default
              )}
            >
              Confirm New Password
            </label>
            <input
              type="password"
              className={styles.combineStyles(
                styles.inputStyles.base,
                styles.inputStyles.default,
                styles.inputStyles.medium
              )}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
          </div>

          <button
            type="submit"
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.primary,
              styles.buttonStyles.medium,
              "w-full mt-8"
            )}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
