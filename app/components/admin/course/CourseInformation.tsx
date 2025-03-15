import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/radux/features/layout/layoutApi";
import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosCheckmark } from "react-icons/io";

interface CourseInfo {
  name: string;
  description: string;
  categories: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnails: string;
}

interface Category {
  title: string;
  _id: string;
}

interface courseInfoProps {
  active: number;
  setActive: React.Dispatch<SetStateAction<number>>;
  courseInfo: CourseInfo;
  setCourseInfo: React.Dispatch<React.SetStateAction<CourseInfo>>;
}

const CourseInformation = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}: courseInfoProps) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const { data, isLoading, refetch } = useGetHeroDataQuery(
    { type: "Categories" },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const [categories, setCategories] = useState<Category[]>([]);

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setCourseInfo(() => ({
            ...courseInfo,
            thumbnails: fileReader.result as string,
          }));
        }
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setCourseInfo(() => ({
            ...courseInfo,
            thumbnail: fileReader.result as string,
          }));
        }
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (
      !courseInfo.name ||
      !courseInfo.description ||
      !courseInfo.price ||
      !courseInfo.estimatedPrice ||
      !courseInfo.tags ||
      !courseInfo.level ||
      !courseInfo.demoUrl ||
      !courseInfo.thumbnails
    ) {
      return toast.error("Please fill all the fields");
    }

    setActive(active + 1);
  };

  useEffect(() => {
    if (data?.layout?.categories) {
      const categoriesData = JSON.parse(JSON.stringify(data.layout.categories));
      setCategories(categoriesData);
    }
  }, [data]);

  console.log("categories", courseInfo);

  return (
    <div className="w-[100%] px-10 max-sm:px-0">
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <label className={`${styles.lable} `}>Course Name</label>
            <input
              type="text"
              className={`${styles.input}`}
              placeholder="Course name"
              required
              name=""
              value={courseInfo.name}
              onChange={(e) => {
                setCourseInfo({ ...courseInfo, name: e.target.value });
              }}
            />
          </div>
          <div className="w-full">
            <label className={`${styles.lable} `}>Description</label>
            <textarea
              className={`${styles.input}`}
              cols={30}
              rows={10}
              placeholder="Course Description"
              required
              name=""
              value={courseInfo.description}
              onChange={(e) => {
                setCourseInfo({ ...courseInfo, description: e.target.value });
              }}
            />
          </div>
          <div className="w-full flex items-start gap-3 justify-between max-sm:flex-wrap md:flex-nowrap">
            <div className="w-full">
              <label className={`${styles.lable} `}>Course Price</label>
              <input
                type="text"
                className={`${styles.input}`}
                placeholder="Course price"
                required
                name=""
                value={courseInfo.price}
                onChange={(e) => {
                  setCourseInfo({
                    ...courseInfo,
                    price: Number(e.target.value),
                  });
                }}
              />
            </div>
            <div className="w-full">
              <label className={`${styles.lable} `}>estimated Price</label>
              <input
                type="text"
                className={`${styles.input}`}
                placeholder="estimatedPrice"
                required
                name=""
                value={courseInfo.estimatedPrice}
                onChange={(e) => {
                  setCourseInfo({
                    ...courseInfo,
                    estimatedPrice: Number(e.target.value),
                  });
                }}
              />
            </div>
          </div>
          <div className="w-full flex items-start gap-3 justify-between max-sm:flex-wrap md:flex-nowrap">
            <div className="w-full">
              <label className={`${styles.lable} `}>Course Tags</label>
              <input
                type="text"
                className={`${styles.input}`}
                placeholder="tags"
                required
                name=""
                value={courseInfo.tags}
                onChange={(e) => {
                  setCourseInfo({ ...courseInfo, tags: e.target.value });
                }}
              />
            </div>

            <div className="w-full">
              <label className={`${styles.lable}`}>Course Categories</label>
              <div
                className={`${styles.lable} w-full mt-3 bg-transparent rounded-md`}
              >
                <select
                  name="categories"
                  className="w-full px-3 border border-gray-400 rounded-md focus:outline-none py-2"
                  onChange={(e) => {
                    setIsSelected(true);
                    setCourseInfo({
                      ...courseInfo,
                      categories: e.target.value,
                    });
                  }}
                >
                  {categories.map((category: Category) => (
                    <option
                      key={category._id}
                      value={category.title}
                      className="bg-transparent border-none outline-none"
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="w-full flex items-start gap-3 justify-between max-sm:flex-wrap md:flex-nowrap">
            <div className="w-full">
              <label className={`${styles.lable} `}>Course Levels</label>
              <input
                type="text"
                className={`${styles.input}`}
                placeholder="levels"
                required
                name=""
                value={courseInfo.level}
                onChange={(e) => {
                  setCourseInfo({
                    ...courseInfo,
                    level: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-full">
              <label className={`${styles.lable} `}>demo Url</label>
              <input
                type="text"
                className={`${styles.input}`}
                placeholder="https://www.google.com"
                required
                name=""
                value={courseInfo.demoUrl}
                onChange={(e) => {
                  setCourseInfo({
                    ...courseInfo,
                    demoUrl: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <label className={`${styles.lable} `}>demo Url</label>
            <input
              type="file"
              name="fileUpload"
              id="fileUpload"
              accept="image/*"
              className={`${"styles.input"} hidden`}
              required
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileUpload"
              className={`w-full min-h-[15vh] border border-gray-400 p-3 flex items-center justify-center ${
                dragging ? "bg-blue-400" : "bg-transparent "
              } mt-10 rounded-md`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {courseInfo.thumbnails ? (
                <img
                  src={courseInfo.thumbnails}
                  alt="Thumbnail"
                  className="w-full max-h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">
                  Drag and drop an image here
                </span>
              )}
            </label>
          </div>
          <div className="w-full flex items-end justify-end mt-10">
            <button
              className="py-2 px-10 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
               hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseInformation;
