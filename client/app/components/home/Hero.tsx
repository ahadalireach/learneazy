"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/styles";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useGetLayoutDataQuery } from "@/redux/features/layout/layoutApi";
import { Loader } from "../common";

type Props = {};

const Hero: FC<Props> = () => {
  const { data, isLoading } = useGetLayoutDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/courses?title=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={styles.combineStyles(
            styles.sectionStyles.backgroundDefault,
            "min-h-screen"
          )}
        >
          <div className="absolute inset-0"></div>

          <div
            className={styles.combineStyles(
              styles.sectionStyles.container,
              styles.sectionStyles.paddingMedium,
              "relative z-10"
            )}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div
                  className={styles.combineStyles(
                    styles.utilityStyles.bgAccent,
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800/50"
                  )}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span
                    className={styles.combineStyles(
                      styles.utilityStyles.textAccent,
                      "font-Poppins font-medium text-sm"
                    )}
                  >
                    Learn Anything
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className={styles.titleStyles.h1}>
                    {data?.layout?.banner?.title ? (
                      data.layout.banner.title
                    ) : (
                      <>
                        <span className="text-slate-900 dark:text-white">
                          Master
                        </span>
                        <span className={styles.utilityStyles.textAccent}>
                          Top Skills
                        </span>
                        <span className="text-slate-900 dark:text-white">
                          from Learneazy
                        </span>
                      </>
                    )}
                  </h1>

                  <p
                    className={styles.combineStyles(
                      styles.titleStyles.subtitle,
                      "max-w-xl mx-auto lg:mx-0"
                    )}
                  >
                    {data?.layout?.banner?.subTitle ||
                      "Learn from industry experts and build real-world projects. Start your learning journey today with our modern LMS platform."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/courses"
                    className={styles.combineStyles(
                      styles.commonStyles.primaryButton,
                      "group transform"
                    )}
                  >
                    Start Learning
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>

                  <Link
                    href="/about"
                    className={styles.combineStyles(
                      styles.commonStyles.secondaryButton,
                      "transform"
                    )}
                  >
                    View Courses
                  </Link>
                </div>

                <div className="relative max-w-md mx-auto lg:mx-0">
                  <input
                    type="search"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.combineStyles(
                      styles.inputStyles.base,
                      styles.inputStyles.default,
                      styles.inputStyles.search
                    )}
                  />
                  <button
                    onClick={handleSearch}
                    className={styles.combineStyles(
                      styles.buttonStyles.base,
                      styles.buttonStyles.success,
                      styles.buttonStyles.small,
                      "absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md"
                    )}
                  >
                    <BiSearch size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="flex -space-x-2">
                    {["client1", "client2", "client3"].map((img, i) => (
                      <Image
                        key={i}
                        src={`/assets/${img}.png`}
                        alt={`Student ${i + 1}`}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-slate-700 dark:text-slate-300 font-Poppins font-medium">
                      <span
                        className={styles.combineStyles(
                          styles.utilityStyles.textAccent,
                          "font-bold"
                        )}
                      >
                        25,000+
                      </span>{" "}
                      students
                    </p>
                    <p
                      className={styles.combineStyles(
                        styles.utilityStyles.textMuted,
                        "text-sm"
                      )}
                    >
                      learning daily
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md lg:max-w-lg">
                  <Image
                    src={
                      data?.layout?.banner?.image?.url || "/assets/heroImg.png"
                    }
                    width={400}
                    height={400}
                    alt="Programming Learning"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
