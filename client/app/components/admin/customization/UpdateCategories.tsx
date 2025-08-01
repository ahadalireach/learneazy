import {
  useGetLayoutDataQuery,
  useUpdateLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import { Loader } from "../../common";
import { toast } from "react-hot-toast";
import styles from "@/app/styles/styles";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

type Props = {};

const UpdateCategories = (props: Props) => {
  const [categories, setCategories] = useState<any[]>([]);

  const { data, isLoading, refetch } = useGetLayoutDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useUpdateLayoutMutation();

  useEffect(() => {
    if (data) {
      setCategories(data.layout?.categories || []);
    }
  }, [data]);

  useEffect(() => {
    if (layoutSuccess) {
      toast.success("Categories updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [layoutSuccess, error, refetch]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    const lastCategory = categories[categories.length - 1];
    if (lastCategory && lastCategory.title === "") {
      toast.error(
        "Please complete the previous category before adding a new one"
      );
    } else {
      setCategories((prevCategory: any) => [
        ...prevCategory,
        { _id: Date.now().toString(), title: "" },
      ]);
    }
  };

  const deleteCategoryHandler = (id: any) => {
    setCategories((prevCategory: any) =>
      prevCategory.filter((i: any) => i._id !== id)
    );
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    if (!originalCategories || !newCategories) return false;
    if (originalCategories.length !== newCategories.length) return false;

    const normalizeCategory = (category: any) => ({
      _id: category._id,
      title: category.title || "",
    });

    const normalizedOriginal = originalCategories.map(normalizeCategory);
    const normalizedNew = newCategories.map(normalizeCategory);

    return JSON.stringify(normalizedOriginal) === JSON.stringify(normalizedNew);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((category) => category.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data?.layout?.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  const hasChanges = !areCategoriesUnchanged(
    data?.layout?.categories,
    categories
  );
  const hasEmptyFields = isAnyCategoryTitleEmpty(categories);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={styles.combineStyles(
        styles.cardStyles.base,
        styles.cardStyles.paddingLarge
      )}
    >
      <div className="mb-6">
        <h2 className={styles.titleStyles.h3}>Course Categories</h2>
        <p className={styles.titleStyles.subtitle}>
          Manage your course categories to help organize and filter content
        </p>
      </div>

      <div className={styles.formStyles.container}>
        <div className="space-y-4">
          {categories?.length > 0 ? (
            categories.map((category: any, index: number) => (
              <div
                key={category._id || index}
                className={styles.combineStyles(
                  "border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-800/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Enter category title..."
                      value={category.title}
                      onChange={(e) =>
                        handleCategoriesAdd(category._id, e.target.value)
                      }
                      className={styles.combineStyles(
                        styles.inputStyles.base,
                        styles.inputStyles.default,
                        styles.inputStyles.medium,
                        "border-transparent bg-transparent focus:border-slate-300 dark:focus:border-slate-600"
                      )}
                    />
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => deleteCategoryHandler(category._id)}
                      className={styles.combineStyles(
                        "flex items-center justify-center w-8 h-8 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      )}
                    >
                      <AiOutlineDelete className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                <AiOutlinePlus className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                No categories added yet
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Click the &quot;Add Category&quot; button to get started
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={newCategoriesHandler}
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.tertiary,
              styles.buttonStyles.medium,
              "w-full max-w-sm"
            )}
          >
            <AiOutlinePlus className="w-5 h-5 mr-2" />
            Add New Category
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between pt-6 border-t border-slate-200 dark:border-slate-slate-700">
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
            {hasEmptyFields && (
              <div
                className={styles.combineStyles(
                  styles.badgeStyles.base,
                  styles.badgeStyles.danger,
                  styles.badgeStyles.small
                )}
              >
                Empty Fields
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                if (data?.layout?.categories) {
                  setCategories(data.layout.categories);
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
              onClick={editCategoriesHandler}
              disabled={!hasChanges || hasEmptyFields}
              className={styles.combineStyles(
                styles.buttonStyles.base,
                hasChanges && !hasEmptyFields
                  ? styles.buttonStyles.success
                  : styles.buttonStyles.secondary,
                styles.buttonStyles.medium,
                "min-w-[120px]",
                !hasChanges || hasEmptyFields
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              )}
            >
              {hasChanges && !hasEmptyFields
                ? "Save Changes"
                : hasEmptyFields
                ? "Complete Fields"
                : "No Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategories;
