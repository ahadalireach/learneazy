import { toast } from "react-hot-toast";
import React, { FC, useState } from "react";
import styles from "../../../styles/styles";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown, MdDragIndicator } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = courseContentData.map((content: any, i: number) =>
      i === index
        ? {
            ...content,
            links: content.links.filter(
              (_: any, li: number) => li !== linkIndex
            ),
          }
        : content
    );
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = courseContentData.map((content: any, i: number) =>
      i === index
        ? {
            ...content,
            links: [...content.links, { title: "", url: "" }],
          }
        : content
    );
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === "" ||
      item.videoLength === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        videoLength: "",
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can't be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
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
        <h2 className={styles.titleStyles.h3}>Course Content</h2>
        <p className={styles.titleStyles.subtitle}>
          Create sections and add video lessons for your course
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formStyles.container}>
        <div className="space-y-4">
          {courseContentData?.map((item: any, index: number) => {
            const showSectionInput =
              index === 0 ||
              item.videoSection !== courseContentData[index - 1].videoSection;

            return (
              <div
                key={index}
                className={styles.combineStyles(
                  styles.cardStyles.base,
                  styles.cardStyles.paddingMedium,
                  "bg-slate-50 dark:bg-slate-800/50"
                )}
              >
                {/* Section Header */}
                {showSectionInput && (
                  <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = courseContentData.map(
                            (content: any, i: number) =>
                              i === index
                                ? { ...content, videoSection: e.target.value }
                                : content
                          );
                          setCourseContentData(updatedData);
                        }}
                        className={styles.combineStyles(
                          "text-xl font-bold bg-transparent border-none outline-none text-slate-900 dark:text-white min-w-0 flex-1",
                          item.videoSection === "Untitled Section"
                            ? "text-slate-500"
                            : ""
                        )}
                        placeholder="Section Title"
                      />
                      <BsPencil className="text-slate-400 w-5 h-5" />
                    </div>
                  </div>
                )}

                {/* Content Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MdDragIndicator className="text-slate-400 w-5 h-5" />
                    {isCollapsed[index] ? (
                      <div className="flex items-center gap-2">
                        {item.title ? (
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            {index + 1}. {item.title}
                          </h4>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400">
                            Untitled Lesson
                          </span>
                        )}
                        <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                          {item.videoLength
                            ? `${item.videoLength} min`
                            : "No duration"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Lesson {index + 1}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = courseContentData.filter(
                            (_: any, i: number) => i !== index
                          );
                          setCourseContentData(updatedData);
                        }
                      }}
                      disabled={index === 0}
                      className={styles.combineStyles(
                        "p-2 rounded-lg transition-colors",
                        index > 0
                          ? "text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          : "text-slate-300 dark:text-slate-600 cursor-not-allowed"
                      )}
                      title={
                        index === 0
                          ? "Cannot delete first lesson"
                          : "Delete lesson"
                      }
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCollapseToggle(index)}
                      className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <MdOutlineKeyboardArrowDown
                        size={20}
                        className={styles.combineStyles(
                          "transition-transform duration-200",
                          isCollapsed[index] ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </button>
                  </div>
                </div>

                {/* Content Form */}
                {!isCollapsed[index] && (
                  <div className="space-y-4">
                    <div className={styles.formStyles.group}>
                      <label className={styles.labelStyles.base}>
                        Video Title
                      </label>
                      <input
                        type="text"
                        placeholder="Introduction to React Hooks..."
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = courseContentData.map(
                            (content: any, i: number) =>
                              i === index
                                ? { ...content, title: e.target.value }
                                : content
                          );
                          setCourseContentData(updatedData);
                        }}
                        className={styles.combineStyles(
                          styles.inputStyles.base,
                          styles.inputStyles.default,
                          styles.inputStyles.medium
                        )}
                      />
                    </div>

                    <div className={styles.formStyles.row}>
                      <div className={styles.formStyles.group}>
                        <label className={styles.labelStyles.base}>
                          Video URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://youtube.com/watch?v=..."
                          value={item.videoUrl}
                          onChange={(e) => {
                            const updatedData = courseContentData.map(
                              (content: any, i: number) =>
                                i === index
                                  ? { ...content, videoUrl: e.target.value }
                                  : content
                            );
                            setCourseContentData(updatedData);
                          }}
                          className={styles.combineStyles(
                            styles.inputStyles.base,
                            styles.inputStyles.default,
                            styles.inputStyles.medium
                          )}
                        />
                      </div>
                      <div className={styles.formStyles.group}>
                        <label className={styles.labelStyles.base}>
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          placeholder="15"
                          value={item.videoLength}
                          onChange={(e) => {
                            const updatedData = courseContentData.map(
                              (content: any, i: number) =>
                                i === index
                                  ? { ...content, videoLength: e.target.value }
                                  : content
                            );
                            setCourseContentData(updatedData);
                          }}
                          className={styles.combineStyles(
                            styles.inputStyles.base,
                            styles.inputStyles.default,
                            styles.inputStyles.medium
                          )}
                        />
                      </div>
                    </div>

                    <div className={styles.formStyles.group}>
                      <label className={styles.labelStyles.base}>
                        Video Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe what students will learn in this video..."
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = courseContentData.map(
                            (content: any, i: number) =>
                              i === index
                                ? { ...content, description: e.target.value }
                                : content
                          );
                          setCourseContentData(updatedData);
                        }}
                        className={styles.combineStyles(
                          styles.inputStyles.base,
                          styles.inputStyles.default,
                          styles.inputStyles.medium,
                          styles.inputStyles.textarea
                        )}
                      />
                    </div>

                    {/* Links Section */}
                    <div className={styles.formStyles.group}>
                      <label className={styles.labelStyles.base}>
                        Resource Links
                      </label>
                      <div className="space-y-3">
                        {item?.links.map((link: any, linkIndex: number) => (
                          <div
                            key={linkIndex}
                            className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Link {linkIndex + 1}
                              </span>
                              {linkIndex > 0 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveLink(index, linkIndex)
                                  }
                                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                  title="Remove link"
                                >
                                  <AiOutlineDelete size={16} />
                                </button>
                              )}
                            </div>
                            <div className="space-y-3">
                              <input
                                type="text"
                                placeholder="Source Code, Documentation, etc."
                                value={link.title}
                                onChange={(e) => {
                                  const updatedData = courseContentData.map(
                                    (content: any, i: number) =>
                                      i === index
                                        ? {
                                            ...content,
                                            links: content.links.map(
                                              (link: any, li: number) =>
                                                li === linkIndex
                                                  ? {
                                                      ...link,
                                                      title: e.target.value,
                                                    }
                                                  : link
                                            ),
                                          }
                                        : content
                                  );
                                  setCourseContentData(updatedData);
                                }}
                                className={styles.combineStyles(
                                  styles.inputStyles.base,
                                  styles.inputStyles.default,
                                  styles.inputStyles.small
                                )}
                              />
                              <input
                                type="url"
                                placeholder="https://github.com/..."
                                value={link.url}
                                onChange={(e) => {
                                  const updatedData = courseContentData.map(
                                    (content: any, i: number) =>
                                      i === index
                                        ? {
                                            ...content,
                                            links: content.links.map(
                                              (link: any, li: number) =>
                                                li === linkIndex
                                                  ? {
                                                      ...link,
                                                      url: e.target.value,
                                                    }
                                                  : link
                                            ),
                                          }
                                        : content
                                  );
                                  setCourseContentData(updatedData);
                                }}
                                className={styles.combineStyles(
                                  styles.inputStyles.base,
                                  styles.inputStyles.default,
                                  styles.inputStyles.small
                                )}
                              />
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddLink(index)}
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                          <BsLink45Deg size={18} />
                          <span className="text-sm font-medium">
                            Add Resource Link
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Add New Content Button */}
                    {index === courseContentData.length - 1 && (
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => newContentHandler(item)}
                          className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                        >
                          <AiOutlinePlusCircle size={18} />
                          <span className="text-sm font-medium">
                            Add New Lesson
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add New Section Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={addNewSection}
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.tertiary,
              styles.buttonStyles.medium,
              "w-full border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"
            )}
          >
            <AiOutlinePlusCircle size={20} className="mr-2" />
            Add New Section
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between pt-8 mt-8 border-t border-slate-200 dark:border-slate-700">
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
      </form>
    </div>
  );
};

export default CourseContent;
