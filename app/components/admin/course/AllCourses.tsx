"use client";

import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import {
  useDeleteUserCourseMutation,
  useGetAllCoursesQuery,
} from "@/radux/features/course/course";
import { format } from "timeago.js";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import { useGetAllUsersQuery } from "@/radux/features/user/userApiSlice";
import Link from "next/link";

const AllCourses = () => {
  const { theme, setTheme } = useTheme();

  const { data, isLoading, error, refetch } = useGetAllCoursesQuery({});
  const [open, setIsOpen] = useState(false);
  const [courseId, setCourseId] = useState("");


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created_at", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.5,
      renderCell: (params: any) => (
        <Button>
          <Link href={`edit-course/${params.row.id}`}>
            <AiFillEdit size={15} color={theme === "dark" ? "#fff" : "#000"} />
          </Link>
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params: any) => (
        <Button>
          <AiOutlineDelete
            size={15}
            color={theme === "dark" ? "#fff" : "#000"}
            onClick={() => {
              console.log("datacell params", { params });
              setIsOpen(true);
              setCourseId(params.row.id);
            }}
          />
        </Button>
      ),
    },
  ];

  const rows: any = [];

  data?.courses?.forEach((items: any) => {
    rows.push({
      id: items._id,
      title: items.name,
      ratings: items.ratings,
      purchased: items.purchased,
      created_at: format(items.createdAt),
      edit: items._id,
      delete: items._id,
    });
  });

  const [
    deleteUserCourse,
    { error: deleteCoursse, isLoading: loading, isSuccess },
  ] = useDeleteUserCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Deleted");
      refetch();
      setIsOpen(false);
    }

    if (deleteCoursse) {
      console.log("deleteing user error", error);
      const errorData = error as any;
      toast.error(errorData?.error || "Failed to delete Course");
      console.log("deleteing Course error", errorData.error);
      setIsOpen(false);
    }
  }, [isSuccess, error, refetch]);

  const handleDeleteCourse = async () => {
    await deleteUserCourse(courseId);
  };

  return (
    <div className="w-[95%] max-w-full mt-10">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />{" "}
        </div>
      ) : (
        <Box m="20px" sx={{ width: "100%", overflowX: "auto" }}>
          <Box
            m="30px 0 0 0"
            height="80vh"
            sx={{
              width: "100%",
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#4A49FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                backgroundColor:
                  theme === "dark"
                    ? "#3e4396 !important"
                    : "#4A49FC !important",
                borderBottom: "none !important",
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
              "& .MuiDataGrid-menuIcon ": {
                backgroundColor:
                  theme === "dark"
                    ? "#3e4396 !important"
                    : "#4A49FC !important",
                borderBottom: "none !important",
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
              "& .MuiDataGrid-columnSeparator": {
                backgroundColor:
                  theme === "dark"
                    ? "#3e4396 !important"
                    : "#4A49FC !important",
                borderBottom: "none !important",
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
              "& .MuiDataGrid-columnSeparator--resizable ": {
                backgroundColor:
                  theme === "dark"
                    ? "#3e4396 !important"
                    : "#4A49FC !important",
                borderBottom: "none !important",
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
              "& .MuiDataGrid-columnSeparator--sideRight ": {
                backgroundColor:
                  theme === "dark"
                    ? "#3e4396 !important"
                    : "#4A49FC !important",
                borderBottom: "none !important",
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#4A49FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
              "& .MuiDataGrid-withBorderColor": {
                backgroundColor:
                  theme === "dark"
                    ? "#3e4396 !important"
                    : "#4A49FC !important",
                borderBottom: "none !important",
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
              "& .MuiDataGrid-columnSeparator--sideRight": {
                backgroundColor:
                  theme === "dark"
                    ? "#3e4396 !important"
                    : "#4A49FC !important",
                borderBottom: "none !important",
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              // initialState={{
              //   pagination: {
              //     paginationModel: {
              //       pageSize: 5,
              //     },
              //   },
              // }}
              // pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              loading={isLoading}
            />
          </Box>

          {open && (
            <Modal
              open={open}
              onClose={() => setIsOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-blue-900  shadow-xl p-4">
                <div className="text-xl text-center font-Poppins">
                  Are you sure you want to delete course
                </div>
                <div className="mt-10 w-full flex items-center justify-between max-sm:flex-wrap md:flex-nowrap">
                  <button
                    className="bg-red-500 text-black dark:text-white py-2 rounded-full px-6"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`bg-blue-500 text-black dark:text-white py-2 rounded-full px-6 ${
                      isLoading && "cursor-not-allowed"
                    }`}
                    type="submit"
                    disabled={loading}
                    onClick={handleDeleteCourse}
                  >
                    {loading ? "Deleting course..." : "Delete"}
                  </button>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
