import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';

const EditProduct = () => {
  const { id } = useParams(); // product ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'active',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        alert('⚠️ Product not found!');
        navigate('/products');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.category || !form.price || !form.stock) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);
      await API.put(`/products/${id}`, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      }); // PUT request to update product
      navigate('/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <h2>✏️ Edit Product #{id}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Status"
          select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          fullWidth
          margin="normal"
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
        <TextField
          label="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '10px' }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Paper>
  );
};

export default EditProduct;
