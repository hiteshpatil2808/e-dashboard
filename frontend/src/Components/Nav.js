import React, { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

function Nav() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    function logout() {
        localStorage.clear();
        navigate('/signup');
    }
    return(
        <div>
            <img 
            alt='logo'
            className="logo"
            src='https://marketplace.canva.com/EAGQ1aYlOWs/1/0/1600w/canva-blue-colorful-illustrative-e-commerce-online-shop-logo-bHiX_0QpJxE.jpg' />
            { auth? <ul className="nav-ul">
                <li><Link to="/">Product</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/signup" onClick={logout}>Log Out ({JSON.parse(auth).name})</Link></li>
            </ul>
            :<ul className="nav-ul nav-right">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>}
        </div>
    );
}

export default Nav;