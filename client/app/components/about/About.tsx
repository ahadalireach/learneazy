import React from "react";
import styles from "../../styles/styles";
import { features } from "../../static/data";
import {
  FaChalkboardTeacher,
  FaWallet,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

const About = () => {
  return (
    <section
      className={styles.combineStyles(
        styles.sectionStyles.container,
        styles.sectionStyles.paddingLarge,
        "min-h-[80vh] flex flex-col justify-center"
      )}
    >
      <div className="text-center mb-12">
        <h2
          className={
            styles.titleStyles.h2 +
            " mb-4 font-Poppins text-blue-600 dark:text-blue-400"
          }
        >
          Welcome to
          <span
            className={styles.combineStyles(styles.utilityStyles.textAccent)}
          >
            {" "}
            Learneazy
          </span>
        </h2>
        <p
          className={
            styles.titleStyles.subtitleLarge +
            " max-w-2xl mx-auto text-slate-700 dark:text-slate-300"
          }
        >
          Your journey to becoming a confident programmer starts here. Discover
          simple, affordable, and community-driven learning designed for
          everyone.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {features.map((f) => {
          const iconMap: Record<
            string,
            React.ComponentType<{ size?: number; className?: string }>
          > = {
            FaChalkboardTeacher,
            FaWallet,
            FaUsers,
          };
          const Icon = iconMap[f.icon as string];
          return (
            <article
              key={f.title}
              className={styles.combineStyles(
                styles.cardStyles.base,
                styles.cardStyles.paddingLarge,
                "flex flex-col items-center text-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              )}
            >
              <div className="mb-3">
                {Icon && (
                  <Icon size={32} className={styles.utilityStyles.textAccent} />
                )}
              </div>
              <h3
                className={styles.combineStyles(
                  styles.titleStyles.h5,
                  "mb-2 font-Poppins",
                  styles.utilityStyles.textAccent
                )}
              >
                {f.title}
              </h3>
              <ul
                className={styles.combineStyles(
                  styles.utilityStyles.spacingSmall,
                  "list-none pl-0"
                )}
              >
                <li
                  className={styles.combineStyles(
                    "flex items-center p-2 rounded-md",
                    "bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 mb-2"
                  )}
                >
                  <span className="text-sm font-Poppins">{f.desc}</span>
                </li>
              </ul>
            </article>
          );
        })}
      </div>
      <div className="text-center mt-8">
        <p
          className={
            styles.titleStyles.subtitleLarge +
            " max-w-2xl mx-auto mb-2 text-slate-700 dark:text-slate-300"
          }
        >
          At Learneazy, our mission is to make programming accessible and
          enjoyable for all. Whether you&apos;re just starting out or advancing
          your skills, we&apos;re here to support your growth every step of the
          way.
        </p>
      </div>
    </section>
  );
};

export default About;
