import { Ratings } from "../common";
import styles from "@/app/styles/styles";

type Props = {
  item: any;
};

const ReviewCard = (props: Props) => {
  return (
    <div
      className={`${styles.cardStyles.base} ${styles.cardStyles.default} ${styles.cardStyles.paddingMedium} h-full`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-lg flex-shrink-0 border-2 border-blue-200 dark:border-blue-600`}
        >
          {props.item.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h5 className={`${styles.titleStyles.card} text-lg mb-1 truncate`}>
            {props.item.name}
          </h5>
          <p className={`${styles.utilityStyles.textMuted} text-sm mb-2`}>
            {props.item.profession}
          </p>
          <div className="flex items-center">
            <Ratings rating={5} size={16} />
          </div>
        </div>
      </div>

      <p
        className={`${styles.utilityStyles.textMuted} leading-relaxed text-sm`}
      >
        {props.item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
