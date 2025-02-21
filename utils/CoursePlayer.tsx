import React, { useState, useEffect } from "react";
import axios from "axios";

const CoursePlayer = ({
  videoID,
  title,
}: {
  videoID: string;
  title: string;
}) => {
  const [videoData, setVideoData] = useState<{ embedUrl: string } | null>(null);

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
        if (response.data?.embedUrl) {
          setVideoData(response.data);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideo();
  }, [videoID]);

  return (
    <div className="w-full mt-5">
      {videoData ? (
        <iframe
          width="100%"
          height="450"
          src={`${videoData.embedUrl}?controls=0&modestbranding=1&rel=0&disablekb=1`} // Removes playback controls
          title={title}
          allowFullScreen
          sandbox="allow-scripts allow-presentation"
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
