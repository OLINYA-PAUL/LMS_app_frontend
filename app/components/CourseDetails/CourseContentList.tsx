import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { preconnect } from "react-dom";
import { MdOutlineOndemandVideo } from "react-icons/md";

const CourseContentList = ({
  data,
  activeVideo,
  setActiveVideo,
  isDemo,
}: {
  data: any;
  activeVideo?: number;
  setActiveVideo: React.Dispatch<React.SetStateAction<number>>;
  isDemo?: boolean;
}) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );
  const courseData = data?.courses?.courseData ?? data;

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
        isDemo && "ml-[-30px] sticky top-24 left-0 z-30 text-sm"
      }`}
    >
      {videoSections.map((section: any) => {
        const isSectionVisible = visibleSections.has(section);
        const sectionVideos = courseData.filter((item: any) => {
          return item.videoSection === section;
        });

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
                  const isActive = activeVideo === index;
                  const duration = item.videoLength;
                  const formattedItemDuration =
                    duration >= 60
                      ? `${(duration / 60).toFixed(1)}h`
                      : `${duration}m`;

                  return (
                    <div
                      key={item._id}
                      className={`flex items-center justify-between p-2 rounded hover:bg-gray-800 cursor-pointer ${
                        isActive && !isDemo ? "bg-red-700" : "bg-gray-700"
                      }`}
                      onClick={() => {
                        setActiveVideo(index);
                        alert(`You clicked on ${index}`); // Example action on click
                      }}
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
