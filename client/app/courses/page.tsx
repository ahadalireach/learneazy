"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles, { combineStyles } from "@/app/styles/styles";
import { MdOutlineSentimentDissatisfied } from "react-icons/md";
import { useGetLayoutDataQuery } from "@/redux/features/layout/layoutApi";
import { CourseCard, Footer, Header, Loader, PageHead } from "../components";
import { useGetAllPublicCoursePreviewsQuery } from "@/redux/features/courses/coursesApi";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setcourses] = useState([]);
  const [category, setCategory] = useState("All");
  const { data: coursesData, isLoading } = useGetAllPublicCoursePreviewsQuery(
    undefined,
    {}
  );
  const { data: categoriesData } = useGetLayoutDataQuery("Categories", {});

  useEffect(() => {
    if (category === "All") {
      setcourses(coursesData?.courses);
    }
    if (category !== "All") {
      setcourses(
        coursesData?.courses.filter((item: any) => item.categories === category)
      );
    }
    if (search) {
      setcourses(
        coursesData?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [coursesData, category, search]);
  const categories = categoriesData?.layout?.categories;

  return (
    <>
      <PageHead
        title="Browse All Courses | Learneazy"
        description="Explore a wide range of courses on Learneazy. Find the best programming, technology, and professional courses to boost your skills and career."
        keywords="learneazy, courses, programming, Ahad Ali LMS"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <main
            className={`${styles.sectionStyles.container} min-h-[70vh] mt-40`}
          >
            <section className="mb-10">
              <h1 className={styles.titleStyles.h2 + " text-center mb-2"}>
                Explore Our
                <span
                  className={combineStyles(styles.utilityStyles.textAccent)}
                >
                  {" "}
                  Courses
                </span>
              </h1>
              <p
                className={
                  styles.titleStyles.subtitle + " text-center max-w-2xl mx-auto"
                }
              >
                Find the perfect course to boost your skills and career. Browse
                by category or search by title.
              </p>
            </section>
            <div className="w-full flex items-center flex-wrap justify-center mb-4">
              <button
                className={styles.combineStyles(
                  styles.buttonStyles.base,
                  category === "All"
                    ? styles.buttonStyles.primary
                    : styles.buttonStyles.secondary,
                  styles.buttonStyles.small,
                  "m-2 px-4"
                )}
                onClick={() => setCategory("All")}
              >
                All
              </button>
              {categories &&
                categories.map((item: any, index: number) => (
                  <button
                    key={index}
                    className={styles.combineStyles(
                      styles.buttonStyles.base,
                      category === item.title
                        ? styles.buttonStyles.primary
                        : styles.buttonStyles.secondary,
                      styles.buttonStyles.small,
                      "m-2 px-4"
                    )}
                    onClick={() => setCategory(item.title)}
                  >
                    {item.title}
                  </button>
                ))}
            </div>
            <div className="border-b border-slate-200 dark:border-slate-700 mb-8"></div>
            {courses && courses.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[40vh]">
                <MdOutlineSentimentDissatisfied className="text-4xl text-slate-400 dark:text-slate-500 mb-2" />
                <p className="text-xl text-slate-500 dark:text-slate-400 text-center font-Poppins">
                  {search
                    ? "No courses found!"
                    : "No courses found in this category. Please try another one!"}
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 md:gap-[32px] lg:grid-cols-3 lg:gap-[32px] 1500px:grid-cols-4 1500px:gap-[40px] mb-16">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
