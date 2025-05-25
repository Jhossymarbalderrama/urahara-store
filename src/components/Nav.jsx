import React from "react";
import { Link } from 'react-router-dom'
import "../styles/nav.css"
import { useNavigate } from "react-router-dom";

export function Nav({ productsCarrito }) {

    const navigate = useNavigate();


    function navigateHome() {
        navigate("/");
    }

    return (
        <div>
            <div className="section-logo">
                <div className="logo" onClick={navigateHome}>
                    <div className="img" title="Urahara Store"></div>
                </div>
            </div>

            <nav style={{ backgroundColor: "#181818", padding: "10px 7rem" }}>
                <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-between", margin: 0 }}>

                    <li className="d-flex flex-row justify-content-center gap-5">
                        <Link to="/" className="nav-item" style={{ textDecoration: "none" }}>Home</Link>
                        <Link to="/products" className="nav-item" style={{ textDecoration: "none" }}>Productos</Link>
                        <Link to="/about" className="nav-item" style={{ textDecoration: "none" }}>Nosotros</Link>
                        <Link to="/contact" className="nav-item" style={{ textDecoration: "none" }}>Contacto</Link>
                    </li>

                    <li className="d-flex flex-row justify-content-center gap-3">
                        <Link to="/login" className="nav-item" style={{ textDecoration: "none" }}>Login</Link>
                        <div className="text-white">|</div>
                        <Link to="/administrador" className="nav-item" style={{ textDecoration: "none" }}> Admin</Link>
                        <div className="text-white">|</div>
                        <Link to="/cart" className="nav-item" style={{ textDecoration: "none" }}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span>{productsCarrito.length > 0 ? productsCarrito.length : 0}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}