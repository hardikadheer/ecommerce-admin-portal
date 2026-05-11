import React, { useEffect, useState } from "react";
import API from "../utils/api";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await API.get("/products"); // GET all products
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`); // DELETE request
      setProducts(products.filter((product) => product._id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default ProductList;
