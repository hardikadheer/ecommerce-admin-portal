import React from "react";
import "./Layout.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button
} from "@mui/material";
import { Dashboard, Inventory2, People, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Or however you're handling auth
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/products">
            <ListItemIcon>
              <Inventory2 />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button component={Link} to="/users">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: 1201,
            ml: `${drawerWidth}px`,
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Admin User
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  fontWeight: 500
                }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
