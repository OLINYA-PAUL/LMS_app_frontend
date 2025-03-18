"use client";

import { useGetAllOrdersQuery } from "@/radux/features/orders/ordersapi";
import { useGetAllUsersQuery } from "@/radux/features/user/userApiSlice";
import React, { useEffect, useState } from "react";
import { useGetAllCoursesQuery } from "@/radux/features/course/course";
import { AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

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

      console.log("all temp data", temp);
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
      ? []
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
          <a href={`mailto:${params.row.userEmail}`}>
            <AiOutlineMail className="dark:text-white text-black" size={20} />
          </a>
        );
      },
    },
  ];

  const rows: any = [
    // mock data for testing
    // {
    //   id: "123455677655",
    //   userName: "Shahriar Sajeeb",
    //   userEmail: "programmershahriarsajeeb@gmail.com",
    //   price: "$500",
    //   created_at: "2 days ago",
    // },
    // {
    //   id: "123455677655",
    //   userName: "Shahriar Sajeeb",
    //   userEmail: "programmershahriarsajeeb@gmail.com",
    //   title: "React JS Course",
    //   price: "$500",
    //   created_at: "2 days ago",
    // },
    // {
    //   id: "123455677655",
    //   userName: "Shahriar Sajeeb",
    //   userEmail: "programmershahriarsajeeb@gmail.com",
    //   title: "React JS Course",
    //   price: "$500",
    //   created_at: "2 days ago",
    // },
    // {
    //   id: "123455677655",
    //   userName: "Shahriar Sajeeb",
    //   userEmail: "programmershahriarsajeeb@gmail.com",
    //   title: "React JS Course",
    //   price: "$500",
    //   created_at: "2 days ago",
    // },
  ];

  data &&
    data.users.forEach((items: any) => {
      rows.push({
        id: items._id,
        userName: items.name,
        userEmail: items.email,
        title: items.title,
        price: items.price,
        created_at: items.createdAt,
      });
    });

  return (
    <div className="w-full">
      {orderData && orderData.length > 0 ? (
        orderData.map((item: any, index: number) => {
          console.log("all map items", item);
          return (
            <div key={index}>
              <Box m={isDashBoard ? "0" : "40px"}>
                <Box
                  m={isDashBoard ? "0" : "40px 0 0 0"}
                  width={"100%"}
                  height={isDashBoard ? "40vh" : "90vh"}
                  overflow={"hidden"}
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
                        theme === "dark"
                          ? "#b7ebde !important"
                          : "#000 !important",
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
            </div>
          );
        })
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};

export default AllInvoice;
