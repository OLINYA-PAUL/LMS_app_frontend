"use client";

import "react-pro-sidebar/dist/css/styles.css";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, Avatar, Divider, IconButton } from "@mui/material";
import {
  HomeOutlined,
  PeopleOutline,
  ReceiptOutlined,
  VideoCall,
  OndemandVideo,
  Settings,
  ManageAccounts,
  Quiz,
  ViewList,
  Analytics,
  Menu as MenuIcon,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSidebar = ({ isCollapsed, setIsCollapsed }: AdminSidebarProps) => {
  const [selected, setSelected] = useState("admin"); // State to manage selected item
  const { theme, setTheme } = useTheme(); // Next-themes hook
  const isDarkMode = theme === "dark";
  const { user } = useSelector((state: any) => state.auth);

  const router = useRouter();

  // Handle navigation
  const handleNavigation = (path: string) => {
    setSelected(path);
    router.push(path);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "90%",
        overflowY: "auto",
        backgroundColor: isDarkMode ? "#1E1E2F" : "#FFF",
        color: isDarkMode ? "#FFF" : "#000",
        marginRight: isCollapsed ? "0px" : "50px",
        "& .pro-sidebar-inner": {
          background: "transparent !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 20px",
        },
        "& .pro-inner-item:hover": {
          color: isDarkMode ? "#868dfb !important" : "#000 !important",
        },
        "& .pro-menu-item.active": {
          color: isDarkMode ? "#6870fa !important" : "#1976d2 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} width="100%">
        {/* Toggle Button */}
        <Box display="flex" justifyContent="flex-end" p={1}>
          <IconButton
            onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
          >
            <MenuIcon sx={{ color: isDarkMode ? "white" : "black" }} />
          </IconButton>
        </Box>

        {/* Header Section */}
        <Box display="flex" flexDirection="column" alignItems="center" py={2}>
          {!isCollapsed && (
            <>
              <Avatar
                src={user.avatar.url}
                sx={{ width: 60, height: 60, mb: 1 }}
              />
              <Typography variant="h6" color={isDarkMode ? "#FFF" : "#000"}>
                {user.name}
              </Typography>
              <Typography variant="body2" color={isDarkMode ? "gray" : "#555"}>
                {user.role}
              </Typography>
            </>
          )}
        </Box>
        <Divider sx={{ backgroundColor: isDarkMode ? "#444" : "#ddd" }} />

        {/* Menu Items */}
        <Menu iconShape="square">
          {/* Dashboard */}
          <MenuItem
            icon={<HomeOutlined />}
            active={selected === "admin"}
            onClick={() => handleNavigation("/admin")}
          >
            Dashboard
          </MenuItem>

          {/* Data Section */}
          {!isCollapsed && (
            <Typography
              variant="subtitle1"
              sx={{ ml: 3, my: 1, color: isDarkMode ? "gray" : "#555" }}
            >
              Data
            </Typography>
          )}
          <MenuItem
            icon={<PeopleOutline />}
            active={selected === "/users"}
            onClick={() => handleNavigation("/admin/users")}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<ReceiptOutlined />}
            active={selected === "/invoices"}
            onClick={() => handleNavigation("/admin/invoices")}
          >
            Invoices
          </MenuItem>

          {/* Content Section */}
          {!isCollapsed && (
            <Typography
              variant="subtitle1"
              sx={{ ml: 3, my: 1, color: isDarkMode ? "gray" : "#555" }}
            >
              Content
            </Typography>
          )}
          <MenuItem
            icon={<VideoCall />}
            active={selected === "createCourse"}
            onClick={() => handleNavigation("/admin/createCourse")}
          >
            Create Course
          </MenuItem>
          <MenuItem
            icon={<OndemandVideo />}
            active={selected === "courses"}
            onClick={() => handleNavigation("/admin/courses")}
          >
            Live Courses
          </MenuItem>

          {/* Customization Section */}
          {!isCollapsed && (
            <Typography
              variant="subtitle1"
              sx={{ ml: 3, my: 1, color: isDarkMode ? "gray" : "#555" }}
            >
              Customization
            </Typography>
          )}
          <MenuItem
            icon={<Quiz />}
            active={selected === "hero"}
            onClick={() => handleNavigation("/admin/hero")}
          >
            Hero
          </MenuItem>
          <MenuItem
            icon={<ViewList />}
            active={selected === "faq"}
            onClick={() => handleNavigation("admin/faq")}
          >
            FAQ
          </MenuItem>
          <MenuItem
            icon={<ManageAccounts />}
            active={selected === "categories"}
            onClick={() => handleNavigation("/admin/categories")}
          >
            Categories
          </MenuItem>

          {/* Controllers */}
          {!isCollapsed && (
            <Typography
              variant="subtitle1"
              sx={{ ml: 3, my: 1, color: isDarkMode ? "gray" : "#555" }}
            >
              Controllers
            </Typography>
          )}
          <MenuItem
            icon={<Analytics />}
            active={selected === "team"}
            onClick={() => handleNavigation("/admin/team")}
          >
            Manage Teams
          </MenuItem>
          {/* Analytics Section */}
          {!isCollapsed && (
            <Typography
              variant="subtitle1"
              sx={{ ml: 3, my: 1, color: isDarkMode ? "gray" : "#555" }}
            >
              Analytics
            </Typography>
          )}
          <MenuItem
            icon={<Analytics />}
            active={selected === "courseAnalytics"}
            onClick={() => handleNavigation("/admin/course-analytics")}
          >
            Courses Analytics
          </MenuItem>

          {/* Settings */}
          <MenuItem
            icon={<Settings />}
            active={selected === "settings"}
            onClick={() => handleNavigation("/admin/settings")}
          >
            Settings
          </MenuItem>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
