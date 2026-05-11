// src/pages/Users.js
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

// ✅ Define your columns
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "role", headerName: "Role", width: 150 },
];

// ✅ Make sure IDs are unique for each row
const rows = [
  { id: 1, name: "Hardika Dheer", email: "dheerhardika@gmail.com", role: "Admin" },
  { id: 2, name: "Manvika Ghai", email: "manvikawork@hotmail.com", role: "Editor" },
  { id: 3, name: "Utsav Arora", email: "utsava16@gmail.com", role: "Viewer" },
  { id: 4, name: "Janhvi Sehgal", email: "sehgaljc@gmail.com", role: "Admin" },
  { id: 5, name: "Vyom Dheer", email: "vyom1a2b@yahoo.com", role: "Admin" },
  { id: 6, name: "Arpia Yadav", email: "arpitayd2012@hotmail.com", role: "Admin" },
  { id: 7, name: "Divyam Sharma", email: "sharmaji@gmail.com", role: "Admin" },
  { id: 8, name: "Kyan Malhotra", email: "Kyanm@gmail.com", role: "Admin" },
  { id: 9, name: "Aditya Rao", email: "adityaaa@yahoo.com", role: "Admin" },
  { id: 10, name: "Diva Lakra", email: "lakraex@gmail.com", role: "Admin" }
];

export default function Users() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Box
        sx={{
          height: 400,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 2,
          overflow: "hidden"
        }}
      >
        <DataGrid
          rows={rows} // ✅ Using our correct data here
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Box>
  );
}
