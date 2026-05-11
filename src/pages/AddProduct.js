import React, { useState } from 'react';
import { Button, TextField, Paper, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    status: 'active',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.price || !form.stock || !form.category) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);
      const newProduct = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      };
      await API.post('/products', newProduct); // POST request
      navigate('/products'); // redirect to products page
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <h2>➕ Add Product</h2>
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
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Paper>
  );
};

export default AddProduct;
