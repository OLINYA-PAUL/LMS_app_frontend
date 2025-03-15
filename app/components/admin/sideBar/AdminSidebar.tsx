"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

// Material UI imports
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

// ProSidebar imports
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define menu sections for better organization
interface MenuSection {
  title: string;
  items: Array<{
    name: string;
    icon: React.ReactNode;
    path: string;
  }>;
}

const AdminSidebar = ({ isCollapsed, setIsCollapsed }: AdminSidebarProps) => {
  const [selected, setSelected] = useState("admin");
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  // Handle navigation with fixed path format
  const handleNavigation = (path: string) => {
    setSelected(path);
    router.push(path);
  };

  // Organized menu sections for better maintainability
  const menuSections: MenuSection[] = [
    {
      title: "Data",
      items: [
        {
          name: "Users",
          icon: <PeopleOutline />,
          path: "/admin/users",
        },
        {
          name: "Invoices",
          icon: <ReceiptOutlined />,
          path: "/admin/invoices",
        },
      ],
    },
    {
      title: "Content",
      items: [
        {
          name: "Create Course",
          icon: <VideoCall />,
          path: "/admin/createCourse",
        },
        {
          name: "Live Courses",
          icon: <OndemandVideo />,
          path: "/admin/courses",
        },
      ],
    },
    {
      title: "Customization",
      items: [
        {
          name: "Hero",
          icon: <Quiz />,
          path: "/admin/hero",
        },
        {
          name: "FAQ",
          icon: <ViewList />,
          path: "/admin/faq", // Fixed path (previously missing `/`)
        },
        {
          name: "Categories",
          icon: <CategoryOutlinedIcon />,
          path: "/admin/categories",
        },
      ],
    },
    {
      title: "Controllers",
      items: [
        {
          name: "Manage Teams",
          icon: <GroupsOutlinedIcon />,
          path: "/admin/team",
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          name: "Courses Analytics",
          icon: <BarChartOutlinedIcon />,
          path: "/admin/course-analytics",
        },
        {
          name: "Order Analytics",
          icon: <InventoryOutlinedIcon />,
          path: "/admin/order-analytics",
        },
        {
          name: "User Analytics",
          icon: <AccessibilityNewOutlinedIcon />,
          path: "/admin/user-analytics",
        },
      ],
    },
  ];

  // Dynamic styles based on theme
  const styles = {
    container: {
      height: "100vh",
      width: isCollapsed ? "80px" : "250px", // More responsive width handling
      overflowY: "auto",
      overflowX: "hidden", // Prevent horizontal overflow
      backgroundColor: isDarkMode ? "#1E1E2F" : "#FFF",
      color: isDarkMode ? "#FFF" : "#000",
      transition: "width 0.3s ease",
      "& .pro-sidebar-inner": {
        background: "transparent !important",
      },
      "& .pro-icon-wrapper": {
        backgroundColor: "transparent !important",
      },
      "& .pro-inner-item": {
        padding: "5px 15px", // Slightly reduced padding
        whiteSpace: "nowrap", // Prevent text wrapping
        overflow: "hidden",
        textOverflow: "ellipsis", // Add ellipsis for overflowing text
      },
      "& .pro-inner-item:hover": {
        color: isDarkMode ? "#868dfb !important" : "#000 !important",
      },
      "& .pro-menu-item.active": {
        color: isDarkMode ? "#6870fa !important" : "#1976d2 !important",
      },
    },
    sectionTitle: {
      ml: 3,
      my: 1,
      color: isDarkMode ? "gray" : "#555",
      fontSize: "0.85rem",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      opacity: 0.8,
    },
    menuItem: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };

  return (
    <Box sx={styles.container}>
      <ProSidebar collapsed={isCollapsed} width="100%">
        {/* Toggle Button */}
        <Box display="flex" justifyContent="flex-end" p={1}>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuIcon sx={{ color: isDarkMode ? "white" : "black" }} />
          </IconButton>
        </Box>

        {/* Header Section */}
        <Box display="flex" flexDirection="column" alignItems="center" py={2}>
          {!isCollapsed && (
            <>
              <Avatar
                src={user?.avatar?.url}
                sx={{ width: 60, height: 60, mb: 1 }}
                alt={user?.name || "User"}
              />
              <Typography
                variant="h6"
                color={isDarkMode ? "#FFF" : "#000"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "90%",
                  textAlign: "center",
                }}
              >
                {user?.name || "User"}
              </Typography>
              <Typography
                variant="body2"
                color={isDarkMode ? "gray" : "#555"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "90%",
                  textAlign: "center",
                }}
              >
                {user?.role || "Admin"}
              </Typography>
            </>
          )}
        </Box>
        <Divider sx={{ backgroundColor: isDarkMode ? "#444" : "#ddd" }} />

        {/* Menu Items */}
        <Menu iconShape="square">
          {/* Dashboard - Always at the top */}
          <MenuItem
            icon={<HomeOutlined />}
            active={selected === "admin"}
            onClick={() => handleNavigation("/admin")}
            style={styles.menuItem}
          >
            Dashboard
          </MenuItem>

          {/* Dynamically render menu sections */}
          {menuSections.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`}>
              {!isCollapsed && (
                <Typography variant="subtitle1" sx={styles.sectionTitle}>
                  {section.title}
                </Typography>
              )}

              {section.items.map((item, itemIndex) => (
                <MenuItem
                  key={`item-${sectionIndex}-${itemIndex}`}
                  icon={item.icon}
                  active={selected === item.path}
                  onClick={() => handleNavigation(item.path)}
                  style={styles.menuItem}
                >
                  {item.name}
                </MenuItem>
              ))}
            </div>
          ))}

          {/* Settings - Always at the bottom */}
          <MenuItem
            icon={<Settings />}
            active={selected === "/admin/settings"}
            onClick={() => handleNavigation("/admin/settings")}
            style={styles.menuItem}
          >
            Settings
          </MenuItem>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
