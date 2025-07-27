import Image from "next/image";
import styles from "../../../styles/styles";
import React, { FC, useEffect, useState } from "react";
import { useGetLayoutDataQuery } from "@/redux/features/layout/layoutApi";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState([]);
  const { data } = useGetLayoutDataQuery("Categories", {});

  useEffect(() => {
    if (data) {
      setCategories(data.layout?.categories);
    }
  }, [data]);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
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
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  return (
    <div
      className={styles.combineStyles(
        styles.cardStyles.base,
        styles.cardStyles.paddingLarge
      )}
    >
      <div className="mb-6">
        <h2 className={styles.titleStyles.h3}>Course Information</h2>
        <p className={styles.titleStyles.subtitle}>
          Provide basic information about your course
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formStyles.container}>
        <div className={styles.formStyles.group}>
          <label
            className={styles.combineStyles(
              styles.labelStyles.base,
              styles.labelStyles.required
            )}
          >
            Course Name
          </label>
          <input
            type="text"
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="MERN stack LMS platform with Next.js 13"
            className={styles.combineStyles(
              styles.inputStyles.base,
              styles.inputStyles.default,
              styles.inputStyles.medium
            )}
          />
        </div>

        <div className={styles.formStyles.group}>
          <label
            className={styles.combineStyles(
              styles.labelStyles.base,
              styles.labelStyles.required
            )}
          >
            Course Description
          </label>
          <textarea
            cols={30}
            rows={8}
            placeholder="Write something amazing about your course..."
            value={courseInfo.description}
            required
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            className={styles.combineStyles(
              styles.inputStyles.base,
              styles.inputStyles.default,
              styles.inputStyles.medium,
              styles.inputStyles.textarea
            )}
          />
        </div>

        <div className={styles.formStyles.row}>
          <div className={styles.formStyles.group}>
            <label
              className={styles.combineStyles(
                styles.labelStyles.base,
                styles.labelStyles.required
              )}
            >
              Course Price
            </label>
            <input
              type="number"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="29"
              className={styles.combineStyles(
                styles.inputStyles.base,
                styles.inputStyles.default,
                styles.inputStyles.medium
              )}
            />
          </div>
          <div className={styles.formStyles.group}>
            <label className={styles.labelStyles.base}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="79"
              className={styles.combineStyles(
                styles.inputStyles.base,
                styles.inputStyles.default,
                styles.inputStyles.medium
              )}
            />
          </div>
        </div>

        <div className={styles.formStyles.row}>
          <div className={styles.formStyles.group}>
            <label
              className={styles.combineStyles(
                styles.labelStyles.base,
                styles.labelStyles.required
              )}
            >
              Course Tags
            </label>
            <input
              type="text"
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              placeholder="MERN, Next.js, Socket.io, TailwindCSS, LMS"
              className={styles.combineStyles(
                styles.inputStyles.base,
                styles.inputStyles.default,
                styles.inputStyles.medium
              )}
            />
          </div>
          <div className={styles.formStyles.group}>
            <label
              className={styles.combineStyles(
                styles.labelStyles.base,
                styles.labelStyles.required
              )}
            >
              Course Category
            </label>
            <select
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
              className={styles.combineStyles(
                styles.inputStyles.base,
                styles.inputStyles.default,
                styles.inputStyles.medium
              )}
              required
            >
              <option value="">Select Category</option>
              {categories &&
                categories.map((item: any) => (
                  <option value={item.title} key={item._id}>
                    {item.title}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className={styles.formStyles.row}>
          <div className={styles.formStyles.group}>
            <label
              className={styles.combineStyles(
                styles.labelStyles.base,
                styles.labelStyles.required
              )}
            >
              Course Level
            </label>
            <select
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              className={styles.combineStyles(
                styles.inputStyles.base,
                styles.inputStyles.default,
                styles.inputStyles.medium
              )}
              required
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className={styles.formStyles.group}>
            <label
              className={styles.combineStyles(
                styles.labelStyles.base,
                styles.labelStyles.required
              )}
            >
              Demo URL
            </label>
            <input
              //   type="url"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="https://youtube.com/watch?v=..."
              className={styles.combineStyles(
                styles.inputStyles.base,
                styles.inputStyles.default,
                styles.inputStyles.medium
              )}
            />
          </div>
        </div>

        <div className={styles.formStyles.group}>
          <label
            className={styles.combineStyles(
              styles.labelStyles.base,
              styles.labelStyles.required
            )}
          >
            Course Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
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
            {courseInfo.thumbnail ? (
              <div className="w-full">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md ring-1 ring-slate-300 dark:ring-slate-700">
                  <Image
                    src={courseInfo.thumbnail}
                    alt="Course thumbnail"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <p className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
                  Click to change thumbnail
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
                  Drag and drop your thumbnail here
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  or click to browse (PNG, JPG, JPEG up to 10MB)
                </p>
              </div>
            )}
          </label>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.primary,
              styles.buttonStyles.medium,
              "min-w-[180px]"
            )}
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
