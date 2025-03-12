import { styles } from "@/app/styles/style";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiSolidAddToQueue, BiSolidBank, BiSolidPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface Link {
  title: string;
  url: string;
}

interface CourseContent {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  link: Link[];
  suggestion: string;
}

interface CourseContentProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  courseContentData: CourseContent[];
  setCourseContentData: React.Dispatch<React.SetStateAction<CourseContent[]>>;
  handleSubmit: () => void;
}

const CourseContentData = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit,
}: CourseContentProps) => {
  const [iscollapses, setIscollapses] = useState(
    Array(courseContentData.length).fill(false)
  );

  const handleCourseSubmit = () => {
    console.log("courseContentData", courseContentData);
  };

  const handleCollapse = (index: number) => () => {
    const updateCollapses = [...iscollapses];
    updateCollapses[index] = !updateCollapses[index];
    setIscollapses(updateCollapses);
  };

  const handleDeleteLink = (index: number, i: number) => () => {
    if (i === 0) return toast.error("First field cannot be deleted");
    const updateItem = [...courseContentData];

    updateItem[index].link = updateItem[index].link.filter(
      (_, idx) => idx !== i
    );
    setCourseContentData(updateItem);
  };

  const handleAddLink = (index: any) => {
    const updateItem = [...courseContentData];
    updateItem[index]?.link.push({ title: "", url: "" });
    setCourseContentData(updateItem);
  };

  const newContentHandler = (items: CourseContent) => {
    if (
      items.title === "" ||
      items.videoUrl === "" ||
      items.description === "" ||
      items.videoSection === "" ||
      items.link[0].title === "" ||
      items.link[0].url === ""
    ) {
      return toast.error("Please fill all the fields");
    }
    let videoSection = "";

    if (courseContentData.length > 0) {
      const lastVideoSection =
        courseContentData[courseContentData.length - 1].videoSection;

      if (lastVideoSection) videoSection = lastVideoSection;

      const addNewSection = [...courseContentData];

      setCourseContentData([
        ...addNewSection,
        {
          videoUrl: "",
          title: "",
          description: "",
          videoSection,
          link: [{ title: "", url: "" }],
          suggestion: "",
        },
      ]);
    }
  };

  const newSectionHandler = (items: CourseContent) => {
    if (
      !items.title ||
      !items.videoUrl ||
      !items.description ||
      !items.videoSection ||
      !items.link[0].title ||
      !items.link[0].url
    ) {
      return toast.error("Please fill all the fields");
    }

    const addNewSection = [...courseContentData];

    setCourseContentData([
      ...addNewSection,
      {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${courseContentData.length + 1}`,
        link: [{ title: "", url: "" }],
        suggestion: "",
      },
    ]);
  };

  const handleNext = () => {
    const { title, description, videoUrl, videoSection } =
      courseContentData[courseContentData.length - 1];

    if (
      title === "" ||
      videoUrl === "" ||
      description === "" ||
      videoSection === "" ||
      courseContentData[courseContentData.length - 1].link[0].title === "" ||
      courseContentData[courseContentData.length - 1].link[0]?.url === ""
    ) {
      return toast.error("Please fill all the fields");
    }

    setActive(active + 1);
    handleCourseSubmit();
  };

  const prev = () => {
    setActive(active - 1);
  };

  return (
    <div className="w-[90%] px-20 max-sm:px-0 mt-10">
      <div className="w-full">
        <form onSubmit={handleCourseSubmit}>
          {courseContentData.map((items: CourseContent, index: number) => {
            const showSection =
              index === 0 ||
              items.videoSection !== courseContentData[index - 1].videoSection;

            return (
              <div key={index}>
                <div
                  className={` ${
                    showSection ? "mt-5" : "mb-0"
                  } w-full bg-[#cdc8c817] p-4`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div>
                      {showSection && (
                        <div className="flex items-center">
                          <input
                            type="text"
                            className={`${
                              items.videoSection === "Untitled Section"
                                ? "w-[170px] font-bold"
                                : "w-max font-semibold"
                            } text[20px] font-Poppins  border-gray-500 bg-transparent border-b outline-none p-1 text-black dark:text-white  `}
                            placeholder="Untitled Section"
                            value={items.videoSection}
                            onChange={(e) => {
                              setCourseContentData((prevData) =>
                                prevData.map((item, idx) => {
                                  if (idx === index) {
                                    return {
                                      ...item,
                                      videoSection: e.target.value,
                                    };
                                  }
                                  return item;
                                })
                              );
                            }}
                          />
                          <BiSolidPencil className="text-black dark:text-gray-500 text-[20px] cursor-pointer" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <AiOutlineDelete
                        className={`${
                          index > 0 ? "cursor-pointer" : "cursor-no-drop"
                        } dark:text-white text-[20px] mr-2 text-black`}
                        onClick={() => {
                          if (index && index !== 0) {
                            const updateItem = [...courseContentData];
                            updateItem.splice(index, 1);
                            setCourseContentData(updateItem);
                          }
                        }}
                      />

                      <MdOutlineKeyboardArrowDown
                        className="dark:text-white text-[20px]  text-black cursor-pointer"
                        style={{
                          transform: iscollapses[index]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                        onClick={handleCollapse(index)}
                      />
                    </div>
                  </div>
                  <div className="w-full mt-5">
                    {iscollapses[0] ? (
                      <div className="text-bold text-xl font-Poppins">
                        {items.title && (
                          <p>
                            {items.title} {index + 1}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {!iscollapses[index] && (
                      <div className="w-full my-5">
                        <div>
                          <label htmlFor="" className={`${styles.lable}`}>
                            Video Title
                          </label>
                          <input
                            type="text"
                            className={`${styles.input} `}
                            placeholder="Project title"
                            value={items.title}
                            onChange={(e) => {
                              // const updateItem = [...courseContentData];
                              // updateItem[index].title = e.target.value;
                              // setCourseContentData(updateItem);

                              setCourseContentData((prevData) =>
                                prevData.map((item, idx) => {
                                  if (idx === index) {
                                    return {
                                      ...item,
                                      title: e.target.value,
                                    };
                                  }
                                  return item;
                                })
                              );
                            }}
                          />
                        </div>
                        <div className="mt-auto w-full">
                          <label htmlFor="" className={`${styles.lable}`}>
                            Video url
                          </label>
                          <input
                            type="text"
                            className={`${styles.input} `}
                            placeholder="Video url"
                            value={items.videoUrl}
                            onChange={(e) => {
                              setCourseContentData((prev: CourseContent[]) =>
                                prev.map((items, idx) => {
                                  if (idx === index) {
                                    return {
                                      ...items,
                                      videoUrl: e.target.value,
                                    };
                                  }
                                  return items;
                                })
                              );
                            }}
                          />
                        </div>
                        <div className="mt-auto w-full">
                          <label htmlFor="" className={`${styles.lable}`}>
                            Video Description
                          </label>
                          <textarea
                            cols={20}
                            rows={10}
                            className={`${styles.input} `}
                            placeholder="Video Description"
                            value={items.description}
                            onChange={(e) => {
                              setCourseContentData((prev: CourseContent[]) =>
                                prev.map((items, idx) => {
                                  if (idx === index) {
                                    return {
                                      ...items,
                                      description: e.target.value,
                                    };
                                  }
                                  return items; // ✅ Always return an item to maintain the array structure
                                })
                              );
                            }}
                          />
                        </div>
                        <div className="mt-auto w-full">
                          {items?.link?.map((link: Link, i: number) => (
                            <div className="w-full" key={i}>
                              <div className="w-full">
                                <div className="flex items-center justify-between gap-5">
                                  <label
                                    htmlFor=""
                                    className={`${styles.lable}`}
                                  >
                                    Link {i + 1}
                                  </label>
                                  <AiOutlineDelete
                                    className={`${
                                      i === 0
                                        ? " cursor-no-drop"
                                        : "cursor-pointer"
                                    } dark:text-white text-[20px]  text-black cursor-pointer`}
                                    onClick={handleDeleteLink(index, i)}
                                  />
                                </div>
                                <input
                                  type="text"
                                  className={`${styles.input} `}
                                  placeholder="Source Code Link Title"
                                  value={link.title}
                                  onChange={(e) => {
                                    const updateItem = [...courseContentData];
                                    updateItem[index].link[i].title =
                                      e.target.value;
                                    setCourseContentData(updateItem);
                                  }}
                                />
                              </div>
                              <div className="w-full">
                                <label htmlFor="" className={`${styles.lable}`}>
                                  Link Url
                                </label>
                                <input
                                  type="text"
                                  className={`${styles.input} `}
                                  placeholder="Source Code Url"
                                  value={link.url}
                                  onChange={(e) => {
                                    const updateItem = [...courseContentData];
                                    updateItem[index].link[i].url =
                                      e.target.value;
                                    setCourseContentData(updateItem);
                                  }}
                                />
                              </div>
                              <div
                                className="flex items-center justify-start gap-5 cursor-pointer"
                                onClick={() => handleAddLink(index)}
                              >
                                <BiSolidAddToQueue
                                  className={`${""} dark:text-white text-[20px] gap-auto text-black `}
                                />
                                Add Link
                              </div>
                              <div className="w-full mt-5 ">
                                {index === courseContentData.length - 1 && (
                                  <div
                                    className="flex items-center justify-start gap-5 cursor-pointer"
                                    onClick={() => newContentHandler(items)}
                                  >
                                    <AiOutlinePlusCircle
                                      className={`${""} dark:text-white text-[20px] gap-auto text-black `}
                                    />
                                    Add New Content
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-center">
                      {/* <div className="w-full mt-5 ">
                      {index === courseContentData.length - 1 && (
                        <div
                          className="flex items-center justify-start gap-5 cursor-pointer"
                          onClick={() => newContentHandler(items)}
                        >
                          <AiOutlinePlusCircle
                            className={`${""} dark:text-white text-[20px] gap-auto text-black `}
                          />
                          Add New Content
                        </div>
                      )}
                    </div> */}
                      <div className="w-full mt-5 flex items-end justify-end">
                        {index === courseContentData.length - 1 && (
                          <div
                            className="flex items-center justify-start gap-5 cursor-pointer"
                            onClick={() => newSectionHandler(items)}
                          >
                            <AiOutlinePlusCircle
                              className={`${""} dark:text-white text-[20px] gap-auto text-black `}
                            />
                            Add New Section
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </form>
      </div>
      <div className="w-full flex items-center justify-between mt-10">
        <button
          className="py-2 px-10 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
               hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
          onClick={prev}
        >
          Prev
        </button>

        <button
          className="py-2 px-10 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
               hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseContentData;
