/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getLesson } from "./title";
import { useSearchParams } from "next/navigation";

const Video = () => {
  const [video, setVideo] = useState<any>({});
  const { data, isLoading } = getLesson(); // Assuming this is a hook that fetches data
  const searchParams = useSearchParams();

  const videoId =
    searchParams.get("videoId") ||
    (data?.video && data.video.length > 0 ? data.video[0].id : undefined);

  useEffect(() => {
    // Check if data is still loading
    if (isLoading) {
      return; // Exit early if data is loading
    }

    // Proceed only if data is loaded
    const video = data?.video?.find((video: any) => video.id === videoId);
    // if (!video) {
    //   return notFound(); // Handle the case where the video is not found
    // }
    setVideo(video);
  }, [videoId, data, isLoading]);

  if (!video) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center border border-gray-500 border-dashed">
        <span className="text-muted text-3xl">لم يتم اضافة دروس بعد</span>
      </div>
    );
  }

  return (
    // <div style={{ position: "relative", paddingTop: "56.25%" }}>
    <div className="w-full h-[500px] max-w-5xl mx-auto rounded-2xl shadow-large overflow-hidden border border-secondary-container smooth clr-text-primary relative">
      <iframe
        src={`${video?.url}`}
        loading="lazy"
        style={{
          border: 0,
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default Video;