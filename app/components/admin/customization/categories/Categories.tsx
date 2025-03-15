"use client";

import { styles } from "@/app/styles/style";
import {
  useUpdateCategoriesMutation,
  useGetHeroDataQuery,
} from "@/radux/features/layout/layoutApi";
import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Category {
  title: string;
  _id: string;
}

const Categories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery(
    { type: "Categories" },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [originalCategories, setOriginalCategories] = useState<Category[]>([]);

  const [updateCategories, { isSuccess, error, isLoading: isEditLoading }] =
    useUpdateCategoriesMutation();

  useEffect(() => {
    if (data?.layout?.categories) {
      const categoriesData = JSON.parse(JSON.stringify(data.layout.categories));
      setCategories(categoriesData);
      setOriginalCategories(categoriesData);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }
    if (error) {
      toast.error("Failed to update categories");
    }
  }, [isSuccess, error, refetch]);

  const handleCategoryUpdate = (id: string, value: string) => {
    setCategories((prevCategories: Category[]) =>
      prevCategories.map((category: Category) =>
        category._id === id ? { ...category, title: value } : category
      )
    );
  };

  const handleCategoryDelete = (id: string) => {
    if (categories.length === 1) {
      toast.error("At least one category is required");
      return;
    }
    setCategories((prevCategories: Category[]) =>
      prevCategories.filter((category: Category) => category._id !== id)
    );
  };

  const isCategoriesUnchanged = (
    orignalCategories: Category[],
    newCategories: Category[]
  ) => {
    if (orignalCategories.length && newCategories.length) {
      return (
        JSON.stringify(orignalCategories) === JSON.stringify(newCategories)
      );
    }
  };

  const hasCategoriesEmptyTitle = () => {
    return categories.some(
      (category: Category) => category.title.trim() === ""
    );
  };

  const handleSubmitCategories = () => {
    if (hasCategoriesEmptyTitle()) {
      toast.error("Category titles cannot be empty");
      return;
    }

    updateCategories({
      type: "Categories",
      categories,
    });
  };

  const handleAddCategories = () => {
    if (
      categories.length > 0 &&
      categories[categories.length - 1].title.trim() === ""
    ) {
      toast.error(
        "Please fill the current empty category before adding a new one"
      );
      return;
    }

    setCategories((prevCategories: Category[]) => [
      ...prevCategories,
      {
        _id: `temp-id-${Date.now()}`,
        title: "",
      },
    ]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />
      </div>
    );
  }

  const isUpdateButtonDisabled =
    isEditLoading ||
    categories.length === 0 ||
    hasCategoriesEmptyTitle() ||
    isCategoriesUnchanged(data.layout.categories, categories);

  return (
    <div className="w-[95%] 800px:w-[95%] m-auto mt-4 pb-20">
      <h1 className="text-2xl font-semibold mb-6">
        {categories.length > 0 ? "All Categories" : "No Categories Found"}
      </h1>

      <div className="space-y-4">
        {categories.map((category: Category, index: number) => (
          <div
            key={index}
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <input
                className={`${styles.input} flex-1 border-none text-lg focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 rounded px-3 py-2`}
                value={category.title}
                onChange={(e) =>
                  handleCategoryUpdate(category._id, e.target.value)
                }
                placeholder="Enter category title..."
              />
              <button
                className="ml-3 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                onClick={() => handleCategoryDelete(category._id)}
                aria-label="Delete category"
              >
                <AiOutlineDelete className="dark:text-white text-black text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full mt-6">
        <button
          className="hover:text-green-700 dark:text-white text-black font-medium transition-colors flex items-center justify-center"
          onClick={handleAddCategories}
        >
          Add New Category
        </button>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[180px]"
          onClick={handleSubmitCategories}
          disabled={isUpdateButtonDisabled}
        >
          {isEditLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
              <span>Updating...</span>
            </>
          ) : (
            "Update Categories"
          )}
        </button>
      </div>
    </div>
  );
};

export default Categories;
