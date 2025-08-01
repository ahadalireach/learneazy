import { FC } from "react";
import styles from "../../styles/styles";
import { FaCheckCircle } from "react-icons/fa";
import { privacyCards } from "@/app/static/data";

const Privacy: FC = () => {
  return (
    <section
      className={styles.combineStyles(
        styles.sectionStyles.container,
        styles.sectionStyles.paddingLarge,
        "flex flex-col justify-center"
      )}
    >
      <header className="text-center mb-12">
        <h2
          className={styles.combineStyles(
            styles.titleStyles.h2,
            "mb-3 font-Poppins"
          )}
        >
          <span className={styles.utilityStyles.textAccent}>Privacy </span>
          Policy
        </h2>
        <p
          className={styles.combineStyles(
            styles.titleStyles.subtitleLarge,
            "max-w-xl mx-auto",
            styles.utilityStyles.textMuted
          )}
        >
          We value your privacy. Here&apos;s how Learneazy protects your data
          and respects your rights as a learner.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        {privacyCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className={styles.combineStyles(
                styles.cardStyles.base,
                styles.cardStyles.paddingLarge,
                "flex flex-col items-center text-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg shadow-md"
              )}
            >
              <div className="mb-3">
                <Icon size={32} className={styles.utilityStyles.textAccent} />
              </div>
              <h3
                className={styles.combineStyles(
                  styles.titleStyles.h5,
                  "mb-2 font-Poppins"
                )}
              >
                {card.title}
              </h3>
              <ul
                className={styles.combineStyles(
                  styles.utilityStyles.spacingSmall,
                  "list-none pl-0"
                )}
              >
                {card.items.map((item, idx) => (
                  <li
                    key={idx}
                    className={styles.combineStyles(
                      "flex items-center gap-3 p-2 rounded-md",
                      "bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 mb-2"
                    )}
                  >
                    <FaCheckCircle
                      size={18}
                      className={styles.combineStyles(
                        "shrink-0",
                        styles.utilityStyles.textAccent
                      )}
                    />
                    <span className="text-left text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <footer>
        <p
          className={styles.combineStyles(
            "mt-4 text-sm text-center",
            styles.utilityStyles.textMuted,
            "font-Poppins"
          )}
        >
          By using Learneazy, you agree to this privacy policy. We may update
          this policy as needed; please check back for changes.
        </p>
      </footer>
    </section>
  );
};

export default Privacy;
