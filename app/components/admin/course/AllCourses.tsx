"use client";

import { Box, Button } from "@mui/material";
import React from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/radux/features/course/course";
import { format } from "timeago.js";

const AllCourses = () => {
  const { theme, setTheme } = useTheme();

  const { data, isLoading, error } = useGetAllCoursesQuery({});
  console.log("dataa course", { data });

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
      renderCell: () => (
        <Button>
          <AiFillEdit size={15} color={theme === "dark" ? "#fff" : "#000"} />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: () => (
        <Button>
          <AiOutlineDelete
            size={15}
            color={theme === "dark" ? "#fff" : "#000"}
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

  return (
    <div className="w-[95%] max-w-full px-4 mt-10">
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
                theme === "dark" ? "#3e4396 !important" : "#4A49FC !important",
              borderBottom: "none !important",
              color: theme === "dark" ? "#fff !important" : "#000 !important",
            },
            "& .MuiDataGrid-menuIcon ": {
              backgroundColor:
                theme === "dark" ? "#3e4396 !important" : "#4A49FC !important",
              borderBottom: "none !important",
              color: theme === "dark" ? "#fff !important" : "#000 !important",
            },
            "& .MuiDataGrid-columnSeparator": {
              backgroundColor:
                theme === "dark" ? "#3e4396 !important" : "#4A49FC !important",
              borderBottom: "none !important",
              color: theme === "dark" ? "#fff !important" : "#000 !important",
            },
            "& .MuiDataGrid-columnSeparator--resizable ": {
              backgroundColor:
                theme === "dark" ? "#3e4396 !important" : "#4A49FC !important",
              borderBottom: "none !important",
              color: theme === "dark" ? "#fff !important" : "#000 !important",
            },
            "& .MuiDataGrid-columnSeparator--sideRight ": {
              backgroundColor:
                theme === "dark" ? "#3e4396 !important" : "#4A49FC !important",
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
                theme === "dark" ? "#3e4396 !important" : "#4A49FC !important",
              borderBottom: "none !important",
              color: theme === "dark" ? "#fff !important" : "#000 !important",
            },
            "& .MuiDataGrid-columnSeparator--sideRight": {
              backgroundColor:
                theme === "dark" ? "#3e4396 !important" : "#4A49FC !important",
              borderBottom: "none !important",
              color: theme === "dark" ? "#fff !important" : "#000 !important",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            loading={isLoading}
          />
        </Box>
      </Box>
    </div>
  );
};

export default AllCourses;
