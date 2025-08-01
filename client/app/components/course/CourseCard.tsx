import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import { Ratings } from "../common";
import { instructor1 } from "@/public";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineBookOpen } from "react-icons/hi";
import styles from "@/app/styles/styles";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
      className={`${styles.cardStyles.base} ${styles.cardStyles.interactive} block overflow-hidden`}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={item.thumbnail?.url}
          width={400}
          height={250}
          alt={item.name || "Course thumbnail"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div
          className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm border border-white/20 ${
            item.price === 0
              ? "bg-emerald-500/90 text-white"
              : "bg-blue-600/90 text-white"
          }`}
        >
          {item.price === 0 ? "Free" : `$${item.price}`}
        </div>
      </div>

      <div className={styles.cardStyles.paddingMedium}>
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={item.instructor?.avatar?.url || instructor1}
            width={32}
            height={32}
            alt={item.instructor?.name || "Ahad Ali"}
            className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-600 object-cover"
          />
          <span
            className={`${styles.utilityStyles.textMuted} text-sm font-medium`}
          >
            Ahad Ali
          </span>
        </div>

        <h3
          className={`${styles.titleStyles.card} mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}
        >
          {item.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Ratings rating={item.ratings || 0} size={14} />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            ({item.ratings?.toFixed(1) || "0.0"})
          </span>
        </div>

        <div
          className={`${styles.cardStyles.footer} flex items-center justify-between text-sm ${styles.utilityStyles.textMuted}`}
        >
          <div className="flex items-center gap-1.5">
            <AiOutlineUser className="w-4 h-4" />
            <span>{item.purchased || 0} Students</span>
          </div>

          <div className="flex items-center gap-1.5">
            <HiOutlineBookOpen className="w-4 h-4" />
            <span>{item.courseData?.length || 0} Lessons</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
