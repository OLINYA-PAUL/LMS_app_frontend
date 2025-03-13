"use client";
import React, { useEffect, useState } from "react";
import { useGetHeroDataQuery } from "@/radux/features/layout/layoutApi";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";

const AdminHero = () => {
  const [image, setImage] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [title, setTitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery(
    { type: "Banner" },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(data);

  const handleUpdate = (e: any) => {
    // File upload handler
    console.log(e.target.files[0]);
    // Implementation for image upload would go here
  };

  const handleEdit = () => {
    // Save changes logic
    console.log("Saving changes:", {
      title,
      subTitle,
      image,
    });
    // Implementation for saving changes would go here
  };

  useEffect(() => {
    if (data?.layout?.banner) {
      setImage(data.layout.banner.image?.url || "");
      setSubTitle(data.layout.banner.subTitle || "");
      setTitle(data.layout.banner.title || "");
    }
  }, [data]);

  // Guard clause for when data is not yet loaded
  if (!data) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const isChanged =
    data.layout?.banner?.title !== title ||
    data.layout?.banner?.SubTitle !== subTitle ||
    image !== data.layout?.banner?.image?.url;

  return (
    <div className="w-full p-4 md:p-6 mt-5">
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Image section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-md">
            <div className="hero_animation rounded-xl overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
              {image ? (
                <img
                  src={image}
                  alt="Banner"
                  className="object-contain w-full h-auto max-h-[400px] z-10"
                />
              ) : (
                <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No image selected
                  </p>
                </div>
              )}
              <input
                type="file"
                name="banner"
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />
              <label
                htmlFor="banner"
                className="absolute bottom-4 right-4 z-20 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md cursor-pointer"
              >
                <AiOutlineCamera className="text-gray-700 dark:text-white text-xl" />
              </label>
            </div>
          </div>
        </div>

        {/* Text content section */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col w-full">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Title
              </label>
              <textarea
                id="title"
                className="w-full p-3 border rounded-md resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-900 text-lg md:text-xl lg:text-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Improve Your Online Learning Experience Better Instantly"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={4}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Subtitle
              </label>
              <textarea
                id="subtitle"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="We have 40k+ Online courses & 500k+ Online registered student. Find your desired Courses from them."
                className="w-full p-3 border rounded-md resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-700 font-medium text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end mt-6">
        <button
          className={`px-6 py-2 rounded-md transition-colors font-medium ${
            isChanged
              ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
          onClick={isChanged ? handleEdit : () => null}
          disabled={!isChanged}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminHero;
