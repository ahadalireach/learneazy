import React, { FC } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-hot-toast";
import styles from "../../../styles/styles";
import { AiOutlinePlusCircle } from "react-icons/ai";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = benefits.map((benefit, i) =>
      i === index ? { ...benefit, title: value } : benefit
    );
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleRemoveBenefit = (index: number) => {
    if (benefits.length > 1) {
      const updatedBenefits = benefits.filter((_, i) => i !== index);
      setBenefits(updatedBenefits);
    }
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = prerequisites.map((prerequisite, i) =>
      i === index ? { ...prerequisite, title: value } : prerequisite
    );
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleRemovePrerequisite = (index: number) => {
    if (prerequisites.length > 1) {
      const updatedPrerequisites = prerequisites.filter((_, i) => i !== index);
      setPrerequisites(updatedPrerequisites);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields to continue!");
    }
  };

  return (
    <div
      className={styles.combineStyles(
        styles.cardStyles.base,
        styles.cardStyles.paddingLarge
      )}
    >
      <div className="mb-6">
        <h2 className={styles.titleStyles.h3}>
          Course Benefits & Prerequisites
        </h2>
        <p className={styles.titleStyles.subtitle}>
          Define what students will learn and what they need to know beforehand
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
            What are the benefits for students in this course?
          </label>
          <div className="space-y-3">
            {benefits.map((benefit: any, index: number) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    name="benefit"
                    placeholder="You will be able to build a full stack LMS Platform..."
                    required
                    value={benefit.title}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    className={styles.combineStyles(
                      styles.inputStyles.base,
                      styles.inputStyles.default,
                      styles.inputStyles.medium
                    )}
                  />
                </div>
                {benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Remove benefit"
                  >
                    <MdClose size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddBenefit}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <AiOutlinePlusCircle size={20} />
              <span className="text-sm font-medium">Add another benefit</span>
            </button>
          </div>
        </div>

        <div className={styles.formStyles.group}>
          <label
            className={styles.combineStyles(
              styles.labelStyles.base,
              styles.labelStyles.required
            )}
          >
            What are the prerequisites for starting this course?
          </label>
          <div className="space-y-3">
            {prerequisites.map((prerequisite: any, index: number) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    name="prerequisite"
                    placeholder="You need basic knowledge of MERN stack"
                    required
                    value={prerequisite.title}
                    onChange={(e) =>
                      handlePrerequisitesChange(index, e.target.value)
                    }
                    className={styles.combineStyles(
                      styles.inputStyles.base,
                      styles.inputStyles.default,
                      styles.inputStyles.medium
                    )}
                  />
                </div>
                {prerequisites.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePrerequisite(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Remove prerequisite"
                  >
                    <MdClose size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddPrerequisites}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <AiOutlinePlusCircle size={20} />
              <span className="text-sm font-medium">
                Add another prerequisite
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between pt-6">
          <button
            type="button"
            onClick={prevButton}
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.secondary,
              styles.buttonStyles.medium,
              "w-full sm:w-auto min-w-[180px]"
            )}
          >
            Previous Step
          </button>
          <button
            type="button"
            onClick={handleOptions}
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.primary,
              styles.buttonStyles.medium,
              "w-full sm:w-auto min-w-[180px]"
            )}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseData;
