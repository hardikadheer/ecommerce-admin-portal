import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
  });
  useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Fetch immediately
  fetchStats();

  // Fetch every 5 seconds
  const interval = setInterval(fetchStats, 5000);

  // Cleanup interval on unmount
  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/stats"); 
        // 👆 make sure this endpoint exists in your backend
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome to your E-commerce Admin Panel.
      </Typography>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {/* Total Products */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <InventoryIcon fontSize="large" />
              <Typography variant="h6" fontWeight="bold">
                Total Products
              </Typography>
              <Typography variant="h4">{stats.totalProducts}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Users */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "#2e7d32",
              color: "white",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <PeopleIcon fontSize="large" />
              <Typography variant="h6" fontWeight="bold">
                Active Users
              </Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Orders */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "#ed6c02",
              color: "white",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <ShoppingCartIcon fontSize="large" />
              <Typography variant="h6" fontWeight="bold">
                Pending Orders
              </Typography>
              <Typography variant="h4">{stats.pendingOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
