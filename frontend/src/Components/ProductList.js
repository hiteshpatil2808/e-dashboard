import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization: JSON.parse(localStorage.getItem('token'))
      }
    });
    result = await result.json();
    setProducts(result);
  }

  async function deleteProduct(id) {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      alert("Product is Deleted..");
      getProducts(); // Refresh product list
    }
  }

  async function searchHandle(event) {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    }else{
      getProducts();
    }
  }

  return (
    <div className="product-list">
      <h1>Products List</h1>
      <input
        type="text"
        className="search-product-box"
        onChange={searchHandle}
        placeholder="Search Product"
      />
      <ul>
        <li>Sr. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {
      Products.length>0 ? Products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>
            <Link to={"/update/" + item._id}>Update</Link>
          </li>
        </ul>
      ))
    : <h1>Product Not Found</h1>}
    </div>
  );
}

export default ProductList;
