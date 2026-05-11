import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Users from "./pages/Users";
import PageTransition from "./components/PageTransition";


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />

        <Route
          path="/dashboard"
          element={<Layout><PageTransition><Dashboard /></PageTransition></Layout>}
        />
        <Route
          path="/users"
          element={<Layout><PageTransition><Users /></PageTransition></Layout>}
        />
        <Route
          path="/products"
          element={<Layout><PageTransition><Products /></PageTransition></Layout>}
        />
        <Route
          path="/add-product"
          element={<Layout><PageTransition><AddProduct /></PageTransition></Layout>}
        />
        <Route
          path="/edit-product/:id"
          element={<Layout><PageTransition><EditProduct /></PageTransition></Layout>}
        />

        <Route 
          path="/add-product" 
          element={<AddProduct />} 
        />

      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
