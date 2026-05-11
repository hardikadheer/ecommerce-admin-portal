import React from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import { Typography, Toolbar } from "@mui/material";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Products", icon: <InventoryIcon />, path: "/products" },
  { text: "Users", icon: <PeopleIcon />, path: "/users" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1f2937",
          color: "#fff",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Admin Panel
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                backgroundColor:
                  location.pathname === item.path
                    ? "rgba(255,255,255,0.15)"
                    : "transparent",
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
