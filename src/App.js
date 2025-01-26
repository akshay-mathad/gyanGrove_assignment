import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash, Edit } from "lucide-react";
import "./App.css";

export default function InventoryApp() {
  const initialItems = [
    { id: 1, name: "Laptop", category: "Electronics", quantity: 5 },
    { id: 2, name: "Chair", category: "Furniture", quantity: 20 },
    { id: 3, name: "Phone", category: "Electronics", quantity: 8 },
  ];

  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });
  const [filter, setFilter] = useState("All");
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity > 0) {
      setItems([...items, { ...newItem, id: Date.now(), quantity: Number(newItem.quantity) }]);
      setNewItem({ name: "", category: "", quantity: "" });
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEditItem = (item) => {
    setNewItem(item);
    setEditingItem(item.id);
  };

  const handleUpdateItem = () => {
    setItems(items.map((item) => (item.id === editingItem ? { ...newItem, id: editingItem } : item)));
    setNewItem({ name: "", category: "", quantity: "" });
    setEditingItem(null);
  };

  const filteredItems = filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Modern Inventory</h1>
      </header>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card"
      >
        <div className="form-section">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="input"
          />
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="input"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            className="input"
          />
          {editingItem ? (
            <button onClick={handleUpdateItem} className="btn btn-update">
              Update
            </button>
          ) : (
            <button onClick={handleAddItem} className="btn btn-add">
              <Plus className="icon" /> Add
            </button>
          )}
        </div>
        <select onChange={(e) => setFilter(e.target.value)} value={filter} className="select">
          <option value="All">All</option>
          {Array.from(new Set(items.map((item) => item.category))).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No items found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td className={item.quantity < 10 ? "low-stock" : ""}>{item.quantity}</td>
                    <td>
                      <button onClick={() => handleEditItem(item)} className="btn btn-edit">
                        <Edit className="icon" /> Edit
                      </button>
                      <button onClick={() => handleDeleteItem(item.id)} className="btn btn-delete">
                        <Trash className="icon" /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
