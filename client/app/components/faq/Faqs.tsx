import styles, { combineStyles } from '@/app/styles/styles';
import { useGetLayoutDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {};

const Faqs = (props: Props) => {
  const { data } = useGetLayoutDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <section className={combineStyles(styles.sectionStyles.backgroundDefault, "py-16 lg:py-20")}>
      <div className={styles.sectionStyles.container}>
        <div className="text-center mb-12 lg:mb-16">
          <h1 className={combineStyles(styles.titleStyles.h2, "mb-6")}>

          

            Frequently Asked <span className={combineStyles(
                      styles.utilityStyles.textAccent
                    )}>Questions</span>
          </h1>
          <p className={combineStyles(styles.titleStyles.subtitle, "max-w-2xl mx-auto")}>
            Find answers to common questions about our platform, courses, and learning experience.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            {questions?.map((q, index) => (
              <div
                key={q._id}
                className={`${styles.cardStyles.base} ${styles.cardStyles.paddingMedium} transition-all duration-200 ${
                  activeQuestion === q._id ? 'ring-2 ring-blue-500/20 shadow-lg' : ''
                }`}
              >
                <button
                  className="flex items-start justify-between w-full text-left focus:outline-none group"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <span className={`${styles.titleStyles.card} text-lg font-semibold leading-tight pr-8 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                    {q.question}
                  </span>
                  <span className="flex-shrink-0 ml-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      activeQuestion === q._id 
                        ? 'bg-blue-600 text-white transform rotate-180' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20'
                    }`}>
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-4 w-4" />
                      ) : (
                        <HiPlus className="h-4 w-4" />
                      )}
                    </div>
                  </span>
                </button>
                
                {activeQuestion === q._id && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className={`${styles.utilityStyles.textMuted} font-Poppins leading-relaxed`}>
                      {q.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {(!questions || questions.length === 0) && (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className={combineStyles(styles.titleStyles.h4, "mb-3")}>
                No FAQs available
              </h3>
              <p className={styles.titleStyles.subtitle}>
                Check back later for frequently asked questions.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Faqs;