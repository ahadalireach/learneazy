import styles from "@/app/styles/styles";
import React, { FC, useState } from "react";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentSections: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // Find unique video sections
  const videoSections: string[] = [
    ...Array.from(
      new Set<string>(props.data?.map((item: any) => item.videoSection))
    ),
  ];

  let totalCount: number = 0; // Total count of videos from previous sections

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };
  return (
    <div
      className={styles.combineStyles(
        "mt-4 w-full",
        !props.isDemo ? "min-h-screen sticky top-24 left-0 z-30" : ""
      )}
    >
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);
        // Filter videos by section
        const sectionVideos: any[] = props.data.filter(
          (item: any) => item.videoSection === section
        );
        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );
        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;
        const sectionContentHours: number = sectionVideoLength / 60;
        return (
          <div
            className={styles.combineStyles(
              styles.cardStyles.base,
              styles.cardStyles.paddingMedium,
              "mb-6",
              !props.isDemo
                ? "border-b border-slate-200 dark:border-slate-700"
                : ""
            )}
            key={section}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className={styles.titleStyles.h5}>{section}</h2>
              <button
                className={styles.combineStyles(
                  styles.buttonStyles.base,
                  styles.buttonStyles.ghost,
                  "rounded-full p-2"
                )}
                onClick={() => toggleSection(section)}
                aria-label={
                  isSectionVisible ? `Collapse ${section}` : `Expand ${section}`
                }
              >
                {isSectionVisible ? (
                  <BsChevronUp size={20} />
                ) : (
                  <BsChevronDown size={20} />
                )}
              </button>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {sectionVideoCount} Lessons
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {sectionVideoLength < 60
                  ? sectionVideoLength
                  : sectionContentHours.toFixed(2)}{" "}
                {sectionVideoLength > 60 ? "hours" : "minutes"}
              </span>
            </div>
            {isSectionVisible && (
              <div className="w-full space-y-2 mt-2">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;
                  return (
                    <div
                      className={styles.combineStyles(
                        "flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer",
                        videoIndex === props.activeVideo
                          ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-400 dark:border-blue-500"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      )}
                      key={item._id}
                      onClick={() =>
                        props.isDemo ? null : props?.setActiveVideo(videoIndex)
                      }
                    >
                      <MdOutlineOndemandVideo
                        size={25}
                        className="mr-2 text-blue-500 dark:text-blue-400"
                      />
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-slate-900 dark:text-white">
                          {item.title}
                        </h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {item.videoLength > 60
                            ? contentLength.toFixed(2)
                            : item.videoLength}{" "}
                          {item.videoLength > 60 ? "hours" : "minutes"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentSections;
