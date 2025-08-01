import {
  useGetLayoutDataQuery,
  useUpdateLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import { Loader } from "../../common";
import { toast } from "react-hot-toast";
import styles from "@/app/styles/styles";
import { HiMinus, HiPlus } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

type Props = {};

const UpdateFaqs = (props: Props) => {
  const [questions, setQuestions] = useState<any[]>([]);

  const { data, isLoading, refetch } = useGetLayoutDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useUpdateLayoutMutation();

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq || []);
    }
  }, [data]);

  useEffect(() => {
    if (layoutSuccess) {
      toast.success("FAQ updated successfully.");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [layoutSuccess, error, refetch]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        _id: Date.now().toString(),
        question: "",
        answer: "",
        active: true,
      },
    ]);
  };

  const deleteFaqHandler = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((item) => item._id !== id)
    );
  };

  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    if (!originalQuestions || !newQuestions) return false;
    if (originalQuestions.length !== newQuestions.length) return false;

    const normalizeQuestion = (q: any) => ({
      _id: q._id,
      question: q.question || "",
      answer: q.answer || "",
    });

    const normalizedOriginal = originalQuestions.map(normalizeQuestion);
    const normalizedNew = newQuestions.map(normalizeQuestion);

    return JSON.stringify(normalizedOriginal) === JSON.stringify(normalizedNew);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data?.layout?.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      const questionsToSave = questions.map(({ active, ...rest }) => rest);

      await editLayout({
        type: "FAQ",
        faq: questionsToSave,
      });
    }
  };

  const hasChanges = !areQuestionsUnchanged(data?.layout?.faq, questions);
  const hasEmptyFields = isAnyQuestionEmpty(questions);

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
        <h2 className={styles.titleStyles.h3}>Frequently Asked Questions</h2>
        <p className={styles.titleStyles.subtitle}>
          Manage your FAQ section to help users find answers to common questions
        </p>
      </div>

      <div className={styles.formStyles.container}>
        <div className="space-y-4 mb-6">
          {questions?.length > 0 ? (
            questions.map((q: any, index: number) => (
              <div
                key={q._id}
                className={styles.combineStyles(
                  "border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-800/50"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => toggleQuestion(q._id)}
                      className={styles.combineStyles(
                        "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                        q.active
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {q.active ? (
                        <HiMinus className="w-4 h-4" />
                      ) : (
                        <HiPlus className="w-4 h-4" />
                      )}
                    </button>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      FAQ {index + 1}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteFaqHandler(q._id)}
                    className={styles.combineStyles(
                      "flex items-center justify-center w-8 h-8 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    )}
                  >
                    <AiOutlineDelete className="w-4 h-4" />
                  </button>
                </div>

                <div className={styles.formStyles.group}>
                  <label className={styles.labelStyles.base}>Question</label>
                  <input
                    type="text"
                    placeholder="Enter your question here..."
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(q._id, e.target.value)
                    }
                    className={styles.combineStyles(
                      styles.inputStyles.base,
                      styles.inputStyles.default,
                      styles.inputStyles.medium
                    )}
                  />
                </div>

                {q.active && (
                  <div
                    className={styles.combineStyles(
                      styles.formStyles.group,
                      "mt-4"
                    )}
                  >
                    <label className={styles.labelStyles.base}>Answer</label>
                    <textarea
                      rows={3}
                      placeholder="Enter your answer here..."
                      value={q.answer}
                      onChange={(e) =>
                        handleAnswerChange(q._id, e.target.value)
                      }
                      className={styles.combineStyles(
                        styles.inputStyles.base,
                        styles.inputStyles.default,
                        styles.inputStyles.medium,
                        styles.inputStyles.textarea
                      )}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                <HiPlus className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                No FAQs added yet
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Click the &quot;Add FAQ&quot; button to get started
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={newFaqHandler}
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.tertiary,
              styles.buttonStyles.medium,
              "w-full max-w-sm"
            )}
          >
            <AiOutlinePlus className="w-5 h-5 mr-2" />
            Add New FAQ
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
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
                if (data?.layout?.faq) {
                  setQuestions(
                    data.layout.faq.map((q: any) => ({ ...q, active: false }))
                  );
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
              onClick={handleEdit}
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

export default UpdateFaqs;
