import Link from "next/link";
import Image from "next/image";
import { format } from "timeago.js";
import { BsCode } from "react-icons/bs";
import styles from "@/app/styles/styles";
import { CoursePlayer, Ratings } from "../common";
import React, { useEffect, useState } from "react";
import { VscVerifiedFilled } from "react-icons/vsc";
import CourseContentList from "./CourseContentList";
import { MdAccessTime, MdSupport } from "react-icons/md";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";

type Props = {
  data: any;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({ data, setRoute, setOpen: openAuthModal }: Props) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const dicountPercentenge =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentengePrice = dicountPercentenge.toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

  return (
    <div className={styles.sectionStyles.container}>
      <div
        className={styles.combineStyles(
          styles.cardStyles.base,
          styles.cardStyles.paddingLarge,
          "my-12"
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h1 className={styles.titleStyles.h2}>{data?.name}</h1>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Ratings rating={data?.ratings || 0} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    ({data?.reviews?.length || 0} Reviews)
                  </span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {data?.purchased || 0} Students
                </span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  {data?.level}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className={styles.titleStyles.h4}>What you&apos;ll learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data?.benefits?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <IoCheckmarkDoneOutline className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className={styles.titleStyles.h4}>Prerequisites</h2>
              <div className="space-y-3">
                {data?.prerequisites?.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <IoCheckmarkDoneOutline className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className={styles.titleStyles.h4}>Course Overview</h2>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 p-4">
                <CourseContentList data={data?.courseData} isDemo={true} />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className={styles.titleStyles.h4}>Course Details</h2>
              <p className="text-base mt-2 whitespace-pre-line w-full overflow-hidden text-slate-700 dark:text-slate-300">
                {data.description}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className={styles.titleStyles.h4}>Reviews</h2>
              <div className="flex items-center gap-3">
                <Ratings rating={data?.ratings || 0} />
                <span className="text-lg font-semibold text-slate-900 dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  Course Rating • {data?.reviews?.length || 0} Reviews
                </span>
              </div>
              <div className="space-y-6">
                {(data?.reviews && [...data.reviews].reverse()).map(
                  (item: any, index: number) => (
                    <div className="flex gap-4" key={index}>
                      <Image
                        src={
                          item.user.avatar
                            ? item.user.avatar.url
                            : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                        }
                        width={50}
                        height={50}
                        alt="User avatar"
                        className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {item.user.name}
                          </span>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 mt-1">
                          {item.comment}
                        </p>
                        <small className="text-slate-400 dark:text-slate-500">
                          {format(item.createdAt)} •
                        </small>
                        {item.commentReplies.map((i: any, idx: number) => (
                          <div className="flex gap-3 mt-4 ml-6" key={idx}>
                            <Image
                              src={
                                i.user.avatar
                                  ? i.user.avatar.url
                                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                              }
                              width={40}
                              height={40}
                              alt="User avatar"
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-900 dark:text-white">
                                  {i.user.name}
                                </span>
                                <VscVerifiedFilled className="text-blue-500 ml-1 text-lg" />
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 mt-1">
                                {i.comment}
                              </p>
                              <small className="text-slate-400 dark:text-slate-500">
                                {format(i.createdAt)} •
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div
              className={styles.combineStyles(
                styles.cardStyles.base,
                styles.cardStyles.elevated,
                styles.cardStyles.paddingMedium,
                "sticky top-24 left-0 z-10 w-full"
              )}
            >
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center gap-3 mt-6">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {data.price === 0 ? "Free" : data.price + "$"}
                </span>
                {data.estimatedPrice > data.price && (
                  <span className="text-lg line-through opacity-70 text-slate-500 dark:text-slate-400">
                    {data.estimatedPrice}$
                  </span>
                )}
                {data.estimatedPrice > data.price && (
                  <span className="ml-2 px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold">
                    {discountPercentengePrice}% Off
                  </span>
                )}
              </div>
              <div className="flex items-center mt-4">
                {isPurchased ? (
                  <Link
                    className={styles.combineStyles(
                      styles.buttonStyles.base,
                      styles.buttonStyles.success,
                      styles.buttonStyles.large,
                      "w-full text-center my-2"
                    )}
                    href={`/course-access/${data._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <button
                    className={styles.combineStyles(
                      styles.buttonStyles.base,
                      styles.buttonStyles.primary,
                      styles.buttonStyles.large,
                      "w-full text-center my-2"
                    )}
                    onClick={handleOrder}
                  >
                    Buy Now {data.price}$
                  </button>
                )}
              </div>
              <div className="space-y-3 mt-6">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  This course includes:
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <BsCode className="w-4 h-4" />
                    <span>Source code included</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <MdAccessTime className="w-4 h-4" />
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <AiTwotoneSafetyCertificate className="w-4 h-4" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <MdSupport className="w-4 h-4" />
                    <span>Premium support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white dark:bg-slate-800 rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black dark:text-white cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              {/* Payment form/modal can go here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
