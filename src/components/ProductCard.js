import React from "react";
import "./layout.css"; // or your product-specific CSS if you have one

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>Category: {product.category}</p>
      {onDelete && (
        <button
          className="delete-button"
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ProductCard;
