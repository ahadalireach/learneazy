import React from "react";
import ReviewCard from "../review/ReviewCard";
import styles, { combineStyles } from "@/app/styles/styles";

type Props = {};

export const reviews = [
  {
    name: "Gene Bates",
    profession: "Student | Cambridge University",
    comment:
      "Learneazy offers a wide range of tech courses for every level. The structure, depth, and clarity make it one of the best learning platforms I’ve used. Highly recommended for anyone serious about tech.",
  },
  {
    name: "Verna Santos",
    profession: "Full Stack Developer | Quarter Ltd.",
    comment:
      "Absolutely love the tutorials on Learneazy! Complex topics are broken down so well, and the real-world examples make everything click. This platform truly stands out in the programming education space.",
  },
  {
    name: "Jay Gibbs",
    profession: "Computer Systems Engineering Student | Zimbabwe",
    comment:
      "Learneazy has completely changed the way I learn programming. The balance between theory and hands-on practice is perfect. It's like having a personal mentor guiding you through every concept.",
  },
  {
    name: "Mina Davidson",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "I explored Learneazy and was impressed by the course quality and variety. Whether you're just starting or upskilling, it's a great place to learn and grow.",
  },
  {
    name: "Rosemary Smith",
    profession: "Full Stack Web Developer | Algeria",
    comment:
      "What I love about Learneazy is the depth. The long-form tutorials cover everything in detail, making it beginner-friendly yet comprehensive. Looking forward to more content!",
  },
  {
    name: "Laura Mckenzie",
    profession: "Full Stack Web Developer | Canada",
    comment:
      "Learneazy focuses on real-world application. I built a complete web marketplace using React, step by step. It’s a game-changer if you want to build projects, not just watch theory.",
  },
];

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
