import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export const AdminPanel = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "phone",
    rating: 0,
    reviews: 0,
  });

  // Mahsulot qo'shish
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image) {
      alert("Please fill in all fields");
      return;
    }

    addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      image: newProduct.image,
      category: newProduct.category,
      rating: newProduct.rating,
      reviews: newProduct.reviews,
    });

    setNewProduct({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "phone",
      rating: 0,
      reviews: 0,
    });
    setShowAddForm(false);
  };

  // Mahsulot nomini o'zgartirish
  const renameProduct = (id) => {
    const newName = prompt("Enter new product name:");
    if (!newName) return;
    updateProduct(id, { name: newName });
  };

  // Mahsulotni o'chirish
  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {showAddForm ? "Cancel" : "Add Product"}
      </button>

      {showAddForm && (
        <form onSubmit={handleAddProduct} className="bg-card border border-border rounded-lg p-4 space-y-4">
          <h3 className="text-xl font-bold">Add New Product</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded bg-background text-foreground"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded bg-background text-foreground"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded bg-background text-foreground"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded bg-background text-foreground"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded bg-background text-foreground"
            >
              <option value="phone">Phone</option>
              <option value="laptop">Laptop</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Product
          </button>
        </form>
      )}

      {products.length === 0 && (
        <p className="text-gray-500 mt-4">No products yet. Add some below!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-gray-700">{p.description}</p>
            <p className="mt-1 font-bold">${p.price}</p>

            <div className="mt-2 space-x-2">
              <button
                onClick={() => renameProduct(p.id)}
                className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
              >
                Rename
              </button>
              <button
                onClick={() => handleDeleteProduct(p.id)}
                className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
