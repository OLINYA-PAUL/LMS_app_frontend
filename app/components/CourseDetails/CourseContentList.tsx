// import { ChevronDown, ChevronUp } from "lucide-react";
// import { useState } from "react";
// import { MdOutlineOndemandVideo } from "react-icons/md";

// const CourseContentList = ({
//   data,
//   activeVideo,
//   setActiveVideo,
//   isDemo,
// }: {
//   data: any;
//   activeVideo?: number;
//   setActiveVideo?: React.Dispatch<React.SetStateAction<number>>;
//   isDemo?: boolean;
// }) => {
//   console.log("cousrContetnLisData", data);

//   const datas = data?.courses.courseData ?? [];

//   const [visibleSection, setVisibleSection] = useState<Set<string>>();

//   const videoSections: any[] = [
//     ...new Set<string>(
//       datas?.map((items: { videoSection: string }) => items.videoSection)
//     ),
//   ];

//   let totalCount: number = 0;

//   const toggleSection = (section: string) => {
//     const newVisibleSection = new Set(section);

//     if (newVisibleSection.has(section)) {
//       newVisibleSection.delete(section);
//     } else {
//       newVisibleSection.add(section);
//     }

//     setVisibleSection(newVisibleSection);
//   };

//   return (
//     <div
//       className={` mt-10 w-full ${
//         isDemo && " min-h-screen ml-[-30px] top-24 left-0 z-30"
//       }`}
//     >
//       {videoSections.map((section: string, index: number) => {
//         const isSectionVisible = visibleSection?.has(section);

//         const sectionVideos: any[] = datas.filter(
//           (items: any, index: number) => items.videoSection === section
//         );

//         const videoSectionCount = sectionVideos.length;
//         const videoSectionLength = sectionVideos.reduce(
//           (totalLength: number, items: any) => {
//             return totalLength + Number(items.videoLength), 0;
//           }
//         );

//         const sectionStartIndex = totalCount;

//         totalCount += videoSectionCount;

//         const sectioVideoHour: number = videoSectionLength / 60;

//         return (
//           <div
//             className={`${isDemo && "border-b border-[#ffffff8e] pb-2"}`}
//             key={section}
//           >
//             <div className="w-full">
//               <div className="w-full flex items-center justify-center">
//                 <h2 className="text-[20px] text-black dark:text-white ">
//                   {section}
//                 </h2>
//                 <button
//                   className="text-[20px] text-black dark:text-white mr-2"
//                   onClick={() => toggleSection(section)}
//                 >
//                   {isSectionVisible ? (
//                     <ChevronUp size={20} />
//                   ) : (
//                     <ChevronDown size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <h5 className="text-black dark:text-white mr-2">
//               {videoSectionCount}
//               {videoSectionLength < 60
//                 ? videoSectionLength
//                 : sectioVideoHour.toFixed(2)}
//               {videoSectionLength > 60 ? "hr" : "min"}
//             </h5>
//             <br />
//             {isSectionVisible &&
//               sectionVideos.map((items: any, index: number) => {
//                 const videoIndex = sectionStartIndex + index;
//                 const isActive = videoIndex === activeVideo;
//                 const contentLength = items.vdeoLength / 60;

//                 return (
//                   <div
//                     key={items._id}
//                     className={`flex items-center gap-2 cursor-pointer ${
//                       isActive && "text-blue-500"
//                     }`}
//                     onClick={() =>
//                       isDemo
//                         ? null
//                         : setActiveVideo && setActiveVideo(videoIndex)
//                     }
//                   >
//                     <div className="flex items-center gap-5">
//                       <div>
//                         <MdOutlineOndemandVideo size={20} />
//                       </div>
//                       <h5 className="text-black dark:text-white">
//                         {items.title}
//                       </h5>
//                     </div>
//                     <h5 className="text-black dark:text-white">
//                       {items.videoLength > contentLength.toFixed(2)
//                         ? contentLength.toFixed(2)
//                         : items.videoLength}
//                       {items.videoLength > contentLength.toFixed(2)
//                         ? "hrs"
//                         : "mins"}
//                     </h5>
//                   </div>
//                 );
//               })}
//           </div>
//         );
//       })}
//     </div>
//   );
// };
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { MdOutlineOndemandVideo } from "react-icons/md";

const CourseContentList = ({
  data,
  activeVideo,
  setActiveVideo,
  isDemo,
}: {
  data: any;
  activeVideo?: number;
  setActiveVideo?: React.Dispatch<React.SetStateAction<number>>;
  isDemo?: boolean;
}) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );
  const courseData = data?.courses?.courseData || [];
  const videoSections = [
    ...new Set(courseData.map((item: any) => item.videoSection)),
  ];

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    newVisibleSections.has(section)
      ? newVisibleSections.delete(section)
      : newVisibleSections.add(section);
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-10 w-full ${
        isDemo && "ml-[-30px] sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections.map((section: any) => {
        const isSectionVisible = visibleSections.has(section);
        const sectionVideos = courseData.filter(
          (item: any) => item.videoSection === section
        );

        // Calculate total section duration
        const sectionDuration = sectionVideos.reduce(
          (total: number, item: any) => total + Number(item.videoLength),
          0
        );
        const formattedDuration =
          sectionDuration >= 60
            ? `${(sectionDuration / 60).toFixed(2)} hours`
            : `${sectionDuration} minutes`;

        return (
          <div key={section} className=" pb-4">
            {/* Section Header */}
            <div className="flex items-center justify-between p-2">
              <div className="flex flex-col">
                <h2 className="text-lg font-medium text-white">{section}</h2>
                <p className="text-gray-400 text-sm">
                  {sectionVideos.length} Lessons · {formattedDuration}
                </p>
              </div>
              <button
                onClick={() => toggleSection(section)}
                className="text-white"
              >
                {isSectionVisible ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>

            {/* Lessons List */}
            {isSectionVisible && (
              <div className="ml-4">
                {sectionVideos.map((item: any, index: number) => {
                  const isActive = index === activeVideo;
                  const duration = item.videoLength;
                  const formattedItemDuration =
                    duration >= 60
                      ? `${(duration / 60).toFixed(1)}h`
                      : `${duration}m`;

                  return (
                    <div
                      key={item._id}
                      className={`flex items-center justify-between p-2 rounded hover:bg-gray-800 cursor-pointer ${
                        isActive ? "bg-gray-700" : ""
                      }`}
                      onClick={() => !isDemo && setActiveVideo?.(index)}
                    >
                      <div className="flex items-center">
                        <MdOutlineOndemandVideo className="mr-2 flex-shrink-0 text-gray-400" />
                        <span className="text-sm text-white truncate">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formattedItemDuration}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
