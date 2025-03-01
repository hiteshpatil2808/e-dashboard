import "./App.css";
import Nav from "./Components/Admin/Nav";
import Footer from "./Components/Admin/Footer";
import SignUp from "./Components/Admin/SignUp";
import PrivateComponent from "./Components/Admin/PrivateComponent";
import Login from "./Components/Admin/Login";
import AddProduct from "./Components/Admin/AddProduct";
import ProductList from "./Components/Admin/ProductList";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        {/* Main area that grows/shrinks with content */}
        <div className="main-content">
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/logout" element={<h1>Logout Components</h1>} />
              <Route path="/profile" element={<h1>Profile Components</h1>} />
            </Route>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;