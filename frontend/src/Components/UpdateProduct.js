import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams(); //  ...to get product id
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  async function getProductDetails() {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  async function UpdateProduct() {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
  }
  return (
    <div className="signup-container">
      <div className="signup-card">
      <h1>Update Product</h1>
      <input
        type="text"
        className="signup-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Product Name"
      />

      <input
        type="text"
        className="signup-input"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Product Price"
      />

      <input
        type="text"
        className="signup-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter Product Category"
      />

      <input
        type="text"
        className="signup-input"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter Company Name"
      />

      <button type="button" className="signup-button" onClick={UpdateProduct}>
        Update Product
      </button>
    </div>
    </div>
  );
}

export default UpdateProduct;
