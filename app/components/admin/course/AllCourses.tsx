// "use client";

// import { Box, Button } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { useTheme } from "next-themes";
// import {
//   useDeleteUserCourseMutation,
//   useGetAllCoursesQuery,
// } from "@/radux/features/course/course";
// import { format } from "timeago.js";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import toast from "react-hot-toast";
// import { useGetAllUsersQuery } from "@/radux/features/user/userApiSlice";
// import Link from "next/link";

// const AllCourses = () => {
//   const { theme, setTheme } = useTheme();

//   const { data, isLoading, error, refetch } = useGetAllCoursesQuery({});
//   const [open, setIsOpen] = useState(false);
//   const [courseId, setCourseId] = useState("");

//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     { field: "title", headerName: "Title", flex: 1 },
//     { field: "ratings", headerName: "Ratings", flex: 0.5 },
//     { field: "purchased", headerName: "Purchased", flex: 0.5 },
//     { field: "created_at", headerName: "Created_at", flex: 0.5 },
//     {
//       field: "edit",
//       headerName: "Edit",
//       flex: 0.5,
//       renderCell: (params: any) => (
//         <Button>
//           <Link href={`edit-course/${params.row.id}`}>
//             <AiFillEdit size={15} color={theme === "dark" ? "#fff" : "#000"} />
//           </Link>
//         </Button>
//       ),
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       flex: 0.5,
//       renderCell: (params: any) => (
//         <Button>
//           <AiOutlineDelete
//             size={15}
//             color={theme === "dark" ? "#fff" : "#000"}
//             onClick={() => {
//               console.log("datacell params", { params });
//               setIsOpen(true);
//               setCourseId(params.row.id);
//             }}
//           />
//         </Button>
//       ),
//     },
//   ];

//   const rows: any = [];

//   data?.courses?.forEach((items: any) => {
//     rows.push({
//       id: items._id,
//       title: items.name,
//       ratings: items.ratings,
//       purchased: items.purchased,
//       created_at: format(items.createdAt),
//       edit: items._id,
//       delete: items._id,
//     });
//   });

//   const [
//     deleteUserCourse,
//     { error: deleteCoursse, isLoading: loading, isSuccess },
//   ] = useDeleteUserCourseMutation();

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Course Deleted");
//       refetch();
//       setIsOpen(false);
//     }

//     if (deleteCoursse) {
//       console.log("deleteing user error", error);
//       const errorData = error as any;
//       toast.error(errorData?.error || "Failed to delete Course");
//       console.log("deleteing Course error", errorData.error);
//       setIsOpen(false);
//     }
//   }, [isSuccess, error, refetch]);

//   const handleDeleteCourse = async () => {
//     await deleteUserCourse(courseId);
//   };

//   return (
//     <div className="w-[95%] max-w-full mt-10">
//       {isLoading ? (
//         <div className="flex items-center justify-center w-full h-screen">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />{" "}
//         </div>
//       ) : (
//         <Box m="20px" sx={{ width: "100%", overflowX: "auto" }}>
//           <Box
//             m="30px 0 0 0"
//             height="80vh"
//             sx={{
//               width: "100%",
//               "& .MuiDataGrid-root": {
//                 border: "none",
//                 outline: "none",
//               },
//               "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
//                 color: theme === "dark" ? "#fff" : "#000",
//               },
//               "& .MuiDataGrid-sortIcon": {
//                 color: theme === "dark" ? "#fff" : "#000",
//               },
//               "& .MuiDataGrid-row": {
//                 color: theme === "dark" ? "#fff" : "#000",
//                 borderBottom:
//                   theme === "dark"
//                     ? "1px solid #ffffff30 !important"
//                     : "1px solid #ccc !important",
//               },
//               "& .MuiTablePagination-root": {
//                 color: theme === "dark" ? "#fff" : "#000",
//               },
//               "& .MuiDataGrid-cell": {
//                 borderBottom: "none",
//               },
//               "& .name-column--cell": {
//                 color: theme === "dark" ? "#fff" : "#000",
//               },
//               "& .MuiDataGrid-columnHeaders": {
//                 backgroundColor: theme === "dark" ? "#3e4396" : "#4A49FC",
//                 borderBottom: "none",
//                 color: theme === "dark" ? "#fff" : "#000",
//               },
//               "& .MuiDataGrid-virtualScroller": {
//                 backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
//               },
//               "& .MuiDataGrid-columnHeaderTitleContainer": {
//                 backgroundColor:
//                   theme === "dark"
//                     ? "#3e4396 !important"
//                     : "#4A49FC !important",
//                 borderBottom: "none !important",
//                 color: theme === "dark" ? "#fff !important" : "#000 !important",
//               },
//               "& .MuiDataGrid-menuIcon ": {
//                 backgroundColor:
//                   theme === "dark"
//                     ? "#3e4396 !important"
//                     : "#4A49FC !important",
//                 borderBottom: "none !important",
//                 color: theme === "dark" ? "#fff !important" : "#000 !important",
//               },
//               "& .MuiDataGrid-columnSeparator": {
//                 backgroundColor:
//                   theme === "dark"
//                     ? "#3e4396 !important"
//                     : "#4A49FC !important",
//                 borderBottom: "none !important",
//                 color: theme === "dark" ? "#fff !important" : "#000 !important",
//               },
//               "& .MuiDataGrid-columnSeparator--resizable ": {
//                 backgroundColor:
//                   theme === "dark"
//                     ? "#3e4396 !important"
//                     : "#4A49FC !important",
//                 borderBottom: "none !important",
//                 color: theme === "dark" ? "#fff !important" : "#000 !important",
//               },
//               "& .MuiDataGrid-columnSeparator--sideRight ": {
//                 backgroundColor:
//                   theme === "dark"
//                     ? "#3e4396 !important"
//                     : "#4A49FC !important",
//                 borderBottom: "none !important",
//                 color: theme === "dark" ? "#fff !important" : "#000 !important",
//               },
//               "& .MuiDataGrid-footerContainer": {
//                 color: theme === "dark" ? "#fff" : "#000",
//                 borderTop: "none",
//                 backgroundColor: theme === "dark" ? "#3e4396" : "#4A49FC",
//               },
//               "& .MuiCheckbox-root": {
//                 color:
//                   theme === "dark" ? "#b7ebde !important" : "#000 !important",
//               },
//               "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//                 color: "#fff !important",
//               },
//               "& .MuiDataGrid-withBorderColor": {
//                 backgroundColor:
//                   theme === "dark"
//                     ? "#3e4396 !important"
//                     : "#4A49FC !important",
//                 borderBottom: "none !important",
//                 color: theme === "dark" ? "#fff !important" : "#000 !important",
//               },
//               "& .MuiDataGrid-columnSeparator--sideRight": {
//                 backgroundColor:
//                   theme === "dark"
//                     ? "#3e4396 !important"
//                     : "#4A49FC !important",
//                 borderBottom: "none !important",
//                 color: theme === "dark" ? "#fff !important" : "#000 !important",
//               },
//             }}
//           >
//             <DataGrid
//               rows={rows}
//               columns={columns}
//               // initialState={{
//               //   pagination: {
//               //     paginationModel: {
//               //       pageSize: 5,
//               //     },
//               //   },
//               // }}
//               // pageSizeOptions={[5]}
//               checkboxSelection
//               disableRowSelectionOnClick
//               loading={isLoading}
//             />
//           </Box>

//           {open && (
//             <Modal
//               open={open}
//               onClose={() => setIsOpen(false)}
//               aria-labelledby="modal-modal-title"
//               aria-describedby="modal-modal-description"
//             >
//               <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-blue-900  shadow-xl p-4">
//                 <div className="text-xl text-center font-Poppins">
//                   Are you sure you want to delete course
//                 </div>
//                 <div className="mt-10 w-full flex items-center justify-between max-sm:flex-wrap md:flex-nowrap">
//                   <button
//                     className="bg-red-500 text-black dark:text-white py-2 rounded-full px-6"
//                     type="button"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className={`bg-blue-500 text-black dark:text-white py-2 rounded-full px-6 ${
//                       isLoading && "cursor-not-allowed"
//                     }`}
//                     type="submit"
//                     disabled={loading}
//                     onClick={handleDeleteCourse}
//                   >
//                     {loading ? "Deleting course..." : "Delete"}
//                   </button>
//                 </div>
//               </Box>
//             </Modal>
//           )}
//         </Box>
//       )}
//     </div>
//   );
// };

// export default AllCourses;

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
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <Box className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 mx-4 max-w-md w-full transform transition-all duration-300">
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-4 h-4 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Warning icon */}
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2 font-Poppins">
                  Delete Course
                </h3>

                {/* Message */}
                <p className="text-gray-600 dark:text-gray-400 text-center mb-8 leading-relaxed">
                  Are you sure you want to delete this course? This action
                  cannot be undone and will permanently remove all course data.
                </p>

                {/* Action buttons */}
                <div className="flex gap-4">
                  <button
                    className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 font-medium"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 ${
                      loading && "cursor-not-allowed"
                    }`}
                    type="submit"
                    disabled={loading}
                    onClick={handleDeleteCourse}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete Course
                      </>
                    )}
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
