import React from "react";

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
}: {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
}) => {
  return <div className="w-full">{data.benefits[0].title}</div>;
};

export default CourseContentMedia;
