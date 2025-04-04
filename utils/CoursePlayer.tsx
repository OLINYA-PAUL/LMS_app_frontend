"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const CoursePlayer = ({
  videoID,
  title,
  isCoursePlayer,
}: {
  videoID: string;
  title: string;
  isCoursePlayer?: boolean;
}) => {
  const [videoData, setVideoData] = useState<{ embedUrl: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoID) return;

    const fetchVideo = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/getVideo-url`,
          { videoID },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Video Data:", response.data); // Debugging log

        if (response.data?.embedUrl) {
          setVideoData(response.data);
          setError(null);
        } else {
          throw new Error("Invalid video URL received");
        }
      } catch (err) {
        console.error("Error fetching video data:", err);
        setError("Failed to load video. Please try again.");
      }
    };

    fetchVideo();
  }, [videoID]);

  return (
    <div className="w-full mt-5">
      {error ? (
        <p className="text-red-500 flex items-center justify-center mt-20">
          {error}
        </p>
      ) : videoData ? (
        <iframe
          width="100%"
          height={isCoursePlayer ? "300px" : "500px"}
          src={`${videoData.embedUrl}?controls=1&modestbranding=1&rel=0&disablekb=1`}
          title={title}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          style={{ userSelect: "none" }}
        ></iframe>
      ) : (
        <p className="flex items-center justify-center mt-20">
          Loading video...
        </p>
      )}
    </div>
  );
};

export default CoursePlayer;
