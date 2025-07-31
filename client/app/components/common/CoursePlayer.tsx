import axios from "axios";
import { BiPlay } from "react-icons/bi";
import styles from "@/app/styles/styles";
import { MdError, MdRefresh } from "react-icons/md";
import React, { FC, useEffect, useState } from "react";

type Props = {
  videoUrl: string;
  title: string;
  className?: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title, className = "" }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVideoData = React.useCallback(async () => {
    if (!videoUrl) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/courses/video/getVdoCipherOTP`,
        {
          videoId: videoUrl,
        }
      );

      if (response.data?.otp && response.data?.playbackInfo) {
        setVideoData(response.data);
      } else {
        setError("Invalid video data received");
      }
    } catch (err: any) {
      console.error("Video loading error:", err);
      setError(
        err.response?.data?.message || "Failed to load video. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [videoUrl]);

  useEffect(() => {
    fetchVideoData();
  }, [videoUrl, fetchVideoData]);

  const retryLoad = () => {
    fetchVideoData();
  };

  if (loading) {
    return (
      <div
        className={`relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-2xl ${className}`}
        style={{ aspectRatio: "16/9" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200/30 rounded-full"></div>
              <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="text-center">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Loading Video Player
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Preparing your learning experience...
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-10 h-10 sm:w-20 sm:h-20 bg-blue-500 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 w-8 h-8 sm:w-16 sm:h-16 bg-purple-500 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-32 sm:h-32 bg-indigo-500 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`relative w-full bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-200 dark:border-red-700 rounded-xl overflow-hidden shadow-lg ${className}`}
        style={{ aspectRatio: "16/9" }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
          <div className="text-center max-w-xs sm:max-w-md">
            <div className="w-12 h-12 sm:w-20 sm:h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
              <MdError className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-red-800 dark:text-red-300 mb-3">
              Video Unavailable
            </h3>
            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 mb-6 leading-relaxed">
              {error}
            </p>
            <button
              onClick={retryLoad}
              className={styles.combineStyles(
                styles.buttonStyles.base,
                "w-full bg-red-600 text-white cursor-not-allowed opacity-75",
                styles.buttonStyles.large
              )}
            >
              <MdRefresh className="w-4 h-4 sm:w-5 sm:h-5" />
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!videoUrl) {
    return (
      <div
        className={`relative w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden shadow-lg ${className}`}
        style={{ aspectRatio: "16/9" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center shadow-inner">
              <span className="flex items-center justify-center w-full h-full">
                <BiPlay
                  className="w-12 h-12 text-slate-400"
                  style={{ marginLeft: "2px" }}
                />
              </span>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3">
              No Video Available
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Video preview will appear here when available
            </p>
          </div>
        </div>

        <div className="absolute top-4 left-4 w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full opacity-50"></div>
        <div className="absolute top-4 right-4 w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full opacity-50"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full opacity-50"></div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-900/10 dark:ring-white/10 ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      {videoData.otp && videoData.playbackInfo && (
        <>
          {(() => {
            const playerId = process.env.NEXT_PUBLIC_VDOCIPHER_PLAYER_ID;
            const playerUrl = `https://player.vdocipher.com/v2/?otp=${
              videoData.otp
            }&playbackInfo=${videoData.playbackInfo}${
              playerId ? `&player=${playerId}` : ""
            }`;

            return (
              <iframe
                src={playerUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true}
                allow="encrypted-media"
                title={title || "Course Video"}
                loading="lazy"
                style={{ zIndex: 10 }}
              />
            );
          })()}

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursePlayer;
