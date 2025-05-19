"use client";

import { useGetAllOrdersQuery } from "@/radux/features/orders/ordersapi";
import { useGetAllUsersQuery } from "@/radux/features/user/userApiSlice";
import React, { useEffect, useState } from "react";
import { useGetAllCoursesQuery } from "@/radux/features/course/course";
import { AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const AllInvoice = ({ isDashBoard }: { isDashBoard: boolean }) => {
  const { data, isLoading } = useGetAllOrdersQuery({});
  const { data: userData, isLoading: userLoading } = useGetAllUsersQuery({});
  const { data: courseData, isLoading: courseLoading } = useGetAllCoursesQuery(
    {}
  );

  const { theme } = useTheme();

  const [orderData, setOrderData] = useState([]);
  console.log("orders data", { data, userData, courseData });

  const userOrderedData = () => {
    if (data && userData && courseData) {
      const temp = data.users.map((items: any) => {
        const users = userData?.users?.find(
          (userId: any) => userId._id === items.userId
        );

        const course = courseData?.courses?.find(
          (courseId: any) => courseId._id === items.courseId
        );

        console.log("all function data", {
          course,
          users,
        });

        return {
          ...items,
          userName: users?.name,
          Usermail: users?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });

      setOrderData(temp);
    }
  };

  useEffect(() => {
    userOrderedData();
  }, [data, userData, courseData]);

  // Added a loading state
  if (isLoading || userLoading || courseLoading) {
    return <div>Loading...</div>;
  }

  console.log("prder datas", orderData);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashBoard ? 0.6 : 0.5 },
    ...(isDashBoard
      ? [
          // { field: "title", headerName: "Course Title", flex: 1 },
          // { field: "price", headerName: "Price", flex: 0.5 },
        ]
      : [
          { field: "userEmail", headerName: "Email", flex: 0.5 },
          { field: "title", headerName: "Course Title", flex: 0.5 },
          { field: "price", headerName: "Price", flex: 0.5 },
        ]),
    ...(isDashBoard
      ? []
      : [{ field: "created_at", headerName: "Created At", flex: 0.5 }]),
    {
      field: "Email",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button>
            <a href={`mailto:${params.row.userEmail}`}>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </Button>
        );
      },
    },
  ];

  const rows: any = [];

  // Populate rows with order data
  if (orderData && orderData.length > 0) {
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.Usermail,
        title: item.title,
        price: item.price,
        created_at: item.createdAt,
      });
    });
  }

  return (
    <div className="w-full overflow-auto">
      {orderData && orderData.length > 0 ? (
        <Box m={isDashBoard ? "0" : "40px"}>
          <Box
            m={isDashBoard ? "0" : "40px 0 0 0"}
            width={"100%"}
            height={isDashBoard ? "40vh" : "90vh"}
            overflow={isDashBoard ? "auto" : "hidden"}
            sx={{
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
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                color: theme === "dark" ? "#000" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#4A49FC",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
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
            }}
          >
            <DataGrid
              checkboxSelection={isDashBoard ? false : true}
              rows={rows}
              columns={columns}
              slots={isDashBoard ? {} : { toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};

export default AllInvoice;
