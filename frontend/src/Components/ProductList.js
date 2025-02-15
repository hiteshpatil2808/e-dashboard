import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css"; // Import our custom CSS

function ProductList() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // Fetch all products
  async function getProducts() {
    try {
      let result = await fetch("http://localhost:5000/products", {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Delete a product by ID
  async function deleteProduct(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
          method: "DELETE",
        });
        result = await result.json();
        if (result) {
          alert("Product has been deleted.");
          getProducts(); // Refresh product list
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  }

  // Handle search input
  async function searchHandle(event) {
    let key = event.target.value;
    if (key) {
      try {
        let result = await fetch(`http://localhost:5000/search/${key}`);
        result = await result.json();
        if (result) {
          setProducts(result);
        }
      } catch (error) {
        console.error("Error searching products:", error);
      }
    } else {
      getProducts();
    }
  }

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Products List</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-product-box"
          onChange={searchHandle}
          placeholder="Search Product..."
        />
      </div>

      {/* Product Table */}
      {Products.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {Products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.company}</td>
                <td>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <Link to={`/update/${item._id}`} className="update-link">
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="no-product-message">Product Not Found</h2>
      )}
    </div>
  );
}

export default ProductList;
