import {
  useUpdateLayoutMutation,
  useGetLayoutDataQuery,
} from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import { toast } from "react-hot-toast";
import styles from "@/app/styles/styles";
import React, { FC, useEffect, useState } from "react";

type Props = {};

const UpdateHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [dragging, setDragging] = useState(false);
  const { data, refetch } = useGetLayoutDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] =
    useUpdateLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!isLoading) {
      await editLayout({
        type: "Banner",
        image,
        title,
        subTitle,
      });
    }
  };

  const hasChanges =
    data?.layout?.banner?.title !== title ||
    data?.layout?.banner?.subTitle !== subTitle ||
    data?.layout?.banner?.image?.url !== image;

  return (
    <div
      className={styles.combineStyles(
        styles.cardStyles.base,
        styles.cardStyles.paddingLarge
      )}
    >
      <div className="mb-6">
        <h2 className={styles.titleStyles.h3}>Hero Section</h2>
        <p className={styles.titleStyles.subtitle}>
          Customize your homepage hero section content and banner image
        </p>
      </div>

      <div className={styles.formStyles.container}>
        <div className={styles.formStyles.group}>
          <label
            className={styles.combineStyles(
              styles.labelStyles.base,
              styles.labelStyles.required
            )}
          >
            Hero Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="bannerFile"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="bannerFile"
            className={styles.combineStyles(
              "w-full min-h-[200px] border-2 border-dashed p-6 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200",
              dragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <div className="w-full">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md ring-1 ring-slate-300 dark:ring-slate-700 bg-slate-50 dark:bg-slate-900 p-4">
                  <Image
                    src={image}
                    alt="Hero Banner"
                    fill
                    className="object-contain p-2"
                    sizes="100vw"
                  />
                </div>
                <p className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
                  Click to change banner image
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Drag and drop your banner image here
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  or click to browse (PNG, JPG, JPEG up to 10MB)
                </p>
              </div>
            )}
          </label>
        </div>

        <div className={styles.formStyles.group}>
          <label
            className={styles.combineStyles(
              styles.labelStyles.base,
              styles.labelStyles.required
            )}
          >
            Hero Title
          </label>
          <textarea
            rows={3}
            placeholder="Improve Your Online Learning Experience Better Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.combineStyles(
              styles.inputStyles.base,
              styles.inputStyles.default,
              styles.inputStyles.large,
              styles.inputStyles.textarea,
              "text-xl font-semibold"
            )}
          />
          <p className={styles.formStyles.hint}>
            This will be displayed as the main headline on your homepage
          </p>
        </div>

        <div className={styles.formStyles.group}>
          <label
            className={styles.combineStyles(
              styles.labelStyles.base,
              styles.labelStyles.required
            )}
          >
            Hero Subtitle
          </label>
          <textarea
            rows={4}
            placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className={styles.combineStyles(
              styles.inputStyles.base,
              styles.inputStyles.default,
              styles.inputStyles.medium,
              styles.inputStyles.textarea
            )}
          />
          <p className={styles.formStyles.hint}>
            Supporting text that appears below the main title
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            {hasChanges && (
              <div
                className={styles.combineStyles(
                  styles.badgeStyles.base,
                  styles.badgeStyles.warning,
                  styles.badgeStyles.small
                )}
              >
                Unsaved Changes
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                if (data?.layout?.banner) {
                  setTitle(data.layout.banner.title);
                  setSubTitle(data.layout.banner.subTitle);
                  setImage(data.layout.banner.image?.url);
                }
              }}
              disabled={!hasChanges}
              className={styles.combineStyles(
                styles.buttonStyles.base,
                styles.buttonStyles.secondary,
                styles.buttonStyles.medium,
                "min-w-[120px]",
                !hasChanges ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              Reset
            </button>

            <button
              type="button"
              onClick={handleEdit}
              disabled={!hasChanges}
              className={styles.combineStyles(
                styles.buttonStyles.base,
                hasChanges
                  ? styles.buttonStyles.success
                  : styles.buttonStyles.secondary,
                styles.buttonStyles.medium,
                "min-w-[120px]",
                !hasChanges ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              {hasChanges ? "Save Changes" : "No Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHero;
