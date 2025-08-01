import Link from "next/link";
import styles, { combineStyles } from "@/app/styles/styles";
import { IoCall, IoLocation, IoMail } from "react-icons/io5";
import { FaBook, FaCertificate, FaGraduationCap } from "react-icons/fa";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer
      className={combineStyles(
        "relative overflow-hidden border-t border-gray-200 dark:border-slate-700",
        styles.sectionStyles.backgroundDefault
      )}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gray-200 dark:bg-slate-700"></div>

      <div className="hidden lg:block absolute top-10 left-10 opacity-10 dark:opacity-5 pointer-events-none">
        <FaGraduationCap className="text-6xl text-blue-600" />
      </div>
      <div className="hidden lg:block absolute top-20 right-20 opacity-10 dark:opacity-5 pointer-events-none">
        <FaBook className="text-5xl text-indigo-600" />
      </div>
      <div className="hidden lg:block absolute bottom-20 left-1/4 opacity-10 dark:opacity-5 pointer-events-none">
        <FaCertificate className="text-4xl text-purple-600" />
      </div>

      <div
        className={combineStyles(
          "relative z-10",
          styles.sectionStyles.paddingSmall
        )}
      >
        <div className={styles.sectionStyles.container}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2
                className={combineStyles(
                  styles.titleStyles.h3,
                  styles.utilityStyles.textAccent
                )}
              >
                Learneazy
              </h2>
            </div>
            <p
              className={combineStyles(
                styles.titleStyles.subtitleLarge,
                "max-w-2xl mx-auto"
              )}
            >
              Empowering minds through innovative education. Join thousands of
              learners on their journey to success.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className={styles.utilityStyles.spacingSmall}>
              <div className="flex items-center mb-4">
                <h3
                  className={combineStyles(
                    styles.titleStyles.h6,
                    styles.utilityStyles.textAccent
                  )}
                >
                  About
                </h3>
              </div>
              <ul className={styles.utilityStyles.spacingXSmall}>
                <li>
                  <Link
                    href="/about"
                    className={combineStyles(
                      "text-slate-700 dark:text-gray-300 transition-colors duration-200",
                      "hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className={combineStyles(
                      "text-slate-700 dark:text-gray-300 transition-colors duration-200",
                      "hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className={combineStyles(
                      "text-slate-700 dark:text-gray-300 transition-colors duration-200",
                      "hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.utilityStyles.spacingSmall}>
              <div className="flex items-center mb-4">
                <h3
                  className={combineStyles(
                    styles.titleStyles.h6,
                    styles.utilityStyles.textAccent
                  )}
                >
                  Quick Links
                </h3>
              </div>
              <ul className={styles.utilityStyles.spacingXSmall}>
                <li>
                  <Link
                    href="/courses"
                    className={combineStyles(
                      "text-slate-700 dark:text-gray-300 transition-colors duration-200",
                      "hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className={combineStyles(
                      "text-slate-700 dark:text-gray-300 transition-colors duration-200",
                      "hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/course-dashboard"
                    className={combineStyles(
                      "text-slate-700 dark:text-gray-300 transition-colors duration-200",
                      "hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.utilityStyles.spacingSmall}>
              <div className="flex items-centermb-4">
                <h3
                  className={combineStyles(
                    styles.titleStyles.h6,
                    styles.utilityStyles.textAccent
                  )}
                >
                  Social Links
                </h3>
              </div>
              <ul className={styles.utilityStyles.spacingXSmall}>
                <li>
                  <Link
                    href="https://www.ahadali.me"
                    className={combineStyles(
                      "flex items-center text-slate-700 dark:text-gray-300 transition-colors duration-200",
                      "hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/ahadalireach/"
                    className={combineStyles(
                      "flex items-center text-slate-700 dark:text-gray-300 transition-colors duration-200",
                      "hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    Linkedin
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.github.com/ahadalireach"
                    className={combineStyles(
                      "flex items-center text-slate-700 dark:text-gray-300 transition-colors duration-200",
                      "hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.utilityStyles.spacingSmall}>
              <div className="flex items-center mb-4">
                <h3
                  className={combineStyles(
                    styles.titleStyles.h6,
                    styles.utilityStyles.textAccent
                  )}
                >
                  Contact Info
                </h3>
              </div>
              <div className={styles.utilityStyles.spacingXSmall}>
                <div className="flex items-center gap-2">
                  <IoCall
                    className={combineStyles(
                      styles.utilityStyles.textAccent,
                      "text-sm"
                    )}
                  />
                  <p
                    className={combineStyles(
                      styles.titleStyles.subtitleSmall,
                      "text-slate-700 dark:text-gray-300"
                    )}
                  >
                    +92 324-1441444
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <IoLocation
                    className={combineStyles(
                      styles.utilityStyles.textAccent,
                      "text-sm mt-1"
                    )}
                  />
                  <p
                    className={combineStyles(
                      styles.titleStyles.subtitleSmall,
                      "text-slate-700 dark:text-gray-300"
                    )}
                  >
                    Lahore, Punjab Pakistan
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <IoMail
                    className={combineStyles(
                      styles.utilityStyles.textAccent,
                      "text-sm"
                    )}
                  />
                  <p
                    className={combineStyles(
                      styles.titleStyles.subtitleSmall,
                      "text-slate-700 dark:text-gray-300"
                    )}
                  >
                    hello@learneazy.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={combineStyles(
              "mt-12 pt-8",
              styles.sectionStyles.borderTop
            )}
          >
            <div className="flex justify-center items-center">
              <p
                className={combineStyles(
                  styles.titleStyles.subtitleSmall,
                  "text-center text-slate-600 dark:text-slate-300"
                )}
              >
                Copyright © {new Date().getFullYear()} Learneazy | All Rights
                Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
