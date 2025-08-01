import { reviews } from "@/app/static/data";
import ReviewCard from "../review/ReviewCard";
import styles, { combineStyles } from "@/app/styles/styles";

type Props = {};

const Reviews = (props: Props) => {
  return (
    <section
      className={combineStyles(
        styles.sectionStyles.backgroundDefault,
        "py-16 lg:py-20"
      )}
    >
      <div className={styles.sectionStyles.container}>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className={combineStyles(styles.titleStyles.h2, "mb-6")}>
            Our Students Are{" "}
            <span className={combineStyles(styles.utilityStyles.textAccent)}>
              Our Strength
            </span>
          </h2>
          <p
            className={combineStyles(
              styles.titleStyles.subtitle,
              "max-w-3xl mx-auto leading-relaxed"
            )}
          >
            Discover what our students have to say about their learning journey
            with us. Their success stories and feedback inspire us to continue
            delivering exceptional educational experiences that transform
            careers and open new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews &&
            reviews.map((item, index) => (
              <div key={index} className={index % 3 === 1 ? "lg:mt-8" : ""}>
                <ReviewCard item={item} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
