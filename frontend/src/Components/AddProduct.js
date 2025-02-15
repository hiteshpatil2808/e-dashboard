import React, { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  async function AddProduct() {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/addproduct", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    alert("Product is Added..");
  }
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Add Product</h1>
        <input
          type="text"
          className="signup-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Product Name"
        />
        {error && !name && (
          <span className="invalid-input">Please Enter Valid Product Name</span>
        )}
        <input
          type="text"
          className="signup-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Product Price"
        />
        {error && !price && (
          <span className="invalid-input">
            Please Enter Valid Product Price
          </span>
        )}
        <input
          type="text"
          className="signup-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter Product Category"
        />
        {error && !category && (
          <span className="invalid-input">
            Please Enter Valid Product Category
          </span>
        )}
        <input
          type="text"
          className="signup-input"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter Company Name"
        />
        {error && !company && (
          <span className="invalid-input">Please Enter Valid Company Name</span>
        )}
        <button type="button" className="signup-button" onClick={AddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
