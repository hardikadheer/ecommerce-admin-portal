import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./Products.css";

const CATEGORIES = ["All Categories", "Electronics", "Clothing", "Accessories"];
const STATUSES = ["All Status", "Active", "Inactive", "Low Stock", "Out of Stock"];

const fmt = (n) => `$ ${n.toFixed(2)}`;

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  
  // filter state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products"); // GET all products
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`); // DELETE request
      setProducts(products.filter((p) => p._id !== id)); // update state
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Toggle active/inactive status locally (optional)
  const toggleActive = (id) =>
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p))
    );

  // Clear filters
  const clearFilters = () => {
    setQuery("");
    setCategory("All Categories");
    setStatus("All Status");
    setMinPrice("");
    setMaxPrice("");
  };

  // Apply filters
  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = minPrice !== "" ? Number(minPrice) : -Infinity;
    const max = maxPrice !== "" ? Number(maxPrice) : Infinity;

    return products.filter((p) => {
      const byQuery = !q || p.name.toLowerCase().includes(q) || String(p._id).includes(q);
      const byCategory = category === "All Categories" || p.category === category;
      const byPrice = p.price >= min && p.price <= max;

      let byStatus = true;
      switch (status) {
        case "Active":
          byStatus = p.status === "active";
          break;
        case "Inactive":
          byStatus = p.status !== "active";
          break;
        case "Low Stock":
          byStatus = p.stock > 0 && p.stock < 10;
          break;
        case "Out of Stock":
          byStatus = p.stock === 0;
          break;
        default:
          byStatus = true;
      }

      return byQuery && byCategory && byPrice && byStatus;
    });
  }, [products, query, category, status, minPrice, maxPrice]);

  return (
    <div className="products-container">
      <h2>Products</h2>
      <p>{filteredProducts.length} products found</p>

      {/* Add Product Button */}
      <button className="add-btn" onClick={() => navigate("/add-product")}>
        ➕ Add Product
      </button>

      {/* Filters */}
      <div className="filters">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or ID..."
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button className="clear-btn" onClick={clearFilters}>Clear</button>
      </div>

      {/* Product Cards */}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((p) => (
            <div key={p._id} className="product-card">
              <div className="product-img">
                {p.image && <img src={p.image} alt={p.name} />}
                <span className={`status-badge ${p.status}`}>{p.status}</span>
                {p.stock === 0 && <span className="stock-ribbon out">Out of Stock</span>}
              </div>

              <div className="product-info">
                <h3>{p.name}</h3>
                <p className="desc">{p.category}</p>


                <div className="meta">
                  <div className="price">{fmt(p.price)}</div>
                  <div className={`stock ${p.stock === 0 ? "out" : p.stock < 10 ? "low" : "in"}`}>
                    Stock: {p.stock} {p.stock > 0 && p.stock < 10 && <span className="low-note">Low Stock</span>}
                  </div>
                </div>
              </div>

              <div className="actions">
                <button onClick={() => navigate(`/edit-product/${p._id}`, { state: { product: p } })}>Edit</button>
                {p.status === "active" ? (
                  <button className="deactivate" onClick={() => toggleActive(p._id)}>Deactivate</button>
                ) : (
                  <button className="activate" onClick={() => toggleActive(p._id)}>Activate</button>
                )}
                <button className="delete" onClick={() => handleDelete(p._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
