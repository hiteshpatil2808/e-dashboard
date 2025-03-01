import React, { useState } from "react";
import "./FormPage.css"; // Import the new CSS

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  async function addProductHandler() {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/addproduct", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    alert("Product is Added..");
    
    // Clear the fields or navigate if you want
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
    setError(false);
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Add Product</h2>

        <input
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
        {error && !name && (
          <span className="invalid-input">Please Enter a Valid Product Name</span>
        )}

        <input
          type="text"
          className="form-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        {error && !price && (
          <span className="invalid-input">Please Enter a Valid Price</span>
        )}

        <input
          type="text"
          className="form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        {error && !category && (
          <span className="invalid-input">Please Enter a Valid Category</span>
        )}

        <input
          type="text"
          className="form-input"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company Name"
        />
        {error && !company && (
          <span className="invalid-input">Please Enter a Valid Company Name</span>
        )}

        <button
          type="button"
          className="form-button"
          onClick={addProductHandler}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
