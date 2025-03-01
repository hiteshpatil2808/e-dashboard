import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FormPage.css"; // Same CSS file

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getProductDetails();
    // eslint-disable-next-line
  }, []);

  async function getProductDetails() {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  async function updateProductHandler() {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    alert("Product Updated Successfully");
    navigate("/");
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Update Product</h2>

        <input
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          type="text"
          className="form-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          type="text"
          className="form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          type="text"
          className="form-input"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company Name"
        />

        <button
          type="button"
          className="form-button"
          onClick={updateProductHandler}
        >
          Update Product
        </button>
      </div>
    </div>
  );
}

export default UpdateProduct;
