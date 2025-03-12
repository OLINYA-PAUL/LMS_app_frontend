"use client";

import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { AiFillEdit, AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/radux/features/course/course";
import { format } from "timeago.js";
import { useGetAllUsersQuery } from "@/radux/features/user/userApiSlice";
import { styles } from "@/app/styles/style";
import UserRole from "../../editUserRole/userRole";
import DeleteUser from "../../editUserRole/DeleteUser";

interface Teamprops {
  team?: boolean;
}

const UserAnalysis = ({ team }: Teamprops) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState<boolean>(false);
  const [isActiveDelete, setIsActiveDelete] = useState<boolean>(false);

  //   const { data, isLoading, error } = useGetAllCoursesQuery({});

  const { data, isLoading, error } = useGetAllUsersQuery({});
  console.log("dataa course", { data });

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "name", flex: 0.5 },
    { field: "email", headerName: "email", flex: 0.5 },
    { field: "role", headerName: "role", flex: 0.5 },
    { field: "courses", headerName: "courses", flex: 0.5 },
    { field: "created_at", headerName: "Join at", flex: 0.5 },
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
            onClick={() => setIsActiveDelete(true)}
          />
        </Button>
      ),
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.5,
      renderCell: (params: any) => (
        <Button>
          <a href={`mailTo:${params.row.email}`}>
            <AiOutlineMail
              size={15}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </a>
        </Button>
      ),
    },
  ];

  const rows: any = [];

  if (team) {
    const teams =
      data && data.users.filter((role: any) => role.role === "admin");

    teams &&
      teams.forEach((items: any) => {
        rows.push({
          id: items._id,
          name: items.name,
          email: items.email,
          role: items?.role,
          courses: items.courses.length,
          created_at: format(items.createdAt),
          edit: items._id,
          delete: items._id,
        });
      });
  } else {
    data?.users?.forEach((items: any) => {
      rows.push({
        id: items._id,
        name: items.name,
        email: items.email,
        role: items?.role,
        courses: items.courses.length,
        created_at: format(items.createdAt),
        edit: items._id,
        delete: items._id,
      });
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "model") {
      setActive(false);
    }
  };

  return (
    <div className="w-[95%] max-w-full mt-10 relative">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />{" "}
        </div>
      ) : (
        <Box m="20px" sx={{ width: "100%", overflowX: "auto" }}>
          <div className="w-full flex justify-end ">
            <div
              className={
                "text-black dark:text-white w-[160px] cursor-pointer text-sm p-2 text-center  font-bold rounded-full  bg-blue-600 dark:bg-blue-600"
              }
              onClick={() => setActive((prev) => !prev)}
            >
              Add New Member
            </div>
          </div>

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
              // autoHeight={true}
            />
          </Box>
        </Box>
      )}
      {active && (
        <div
          id="model"
          className=" fixed w-full flex items-center justify-center  cursor-pointer top-0 left-20 bg-black/75 h-screen  text-black dark:text-white"
          onClick={handleClose}
        >
          <UserRole active={active} setActive={setActive} data={data} />
        </div>
      )}

      {isActiveDelete && (
        <div
          id="model"
          className=" fixed w-full flex items-center justify-center  cursor-pointer top-0 left-20 bg-black/75 h-screen  text-black dark:text-white"
          onClick={handleClose}
        >
          <DeleteUser
            isActiveDelete={isActiveDelete}
            setIsActiveDelete={setIsActiveDelete}
          />
        </div>
      )}
    </div>
  );
};

export default UserAnalysis;
