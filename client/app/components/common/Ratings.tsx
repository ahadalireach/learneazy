import React, { FC } from "react";
import { BsStarHalf } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type Props = {
  rating: number;
  size?: number;
  className?: string;
};

const Ratings: FC<Props> = ({ rating, size = 20, className = "" }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={size}
          className="text-yellow-400 hover:text-yellow-500 transition-colors"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          size={size - 3}
          className="text-yellow-400 hover:text-yellow-500 transition-colors"
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={i}
          size={size}
          className="text-yellow-400 hover:text-yellow-500 transition-colors"
        />
      );
    }
  }

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {stars}
      <span className="ml-1 text-sm font-medium text-slate-600 dark:text-slate-400">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default Ratings;
