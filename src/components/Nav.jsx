import React from "react";
import { Link } from 'react-router-dom'
import "../styles/nav.css"

export function Nav({ productsCarrito }) {
    return (
        <div>
            <div className="section-logo">
                <div className="logo">
                    <div className="img" title="Urahara Store"></div>
                </div>
            </div>

            <nav style={{ backgroundColor: "#333", padding: "10px" }}>
                <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-around", margin: 0 }}>
                    <li><Link to="/" className="nav-item" style={{ textDecoration: "none" }}>Home</Link></li>
                    <li><Link to="/products" className="nav-item" style={{ textDecoration: "none" }}>Productos</Link></li>
                    <li><Link to="/about" className="nav-item" style={{ textDecoration: "none" }}>Nosotros</Link></li>
                    <li><Link to="/contact" className="nav-item" style={{ textDecoration: "none" }}>Contacto</Link></li>
                    <li><Link to="/cart" className="nav-item" style={{ textDecoration: "none" }}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>{productsCarrito.length > 0 ? productsCarrito.length : 0}</span>
                    </Link></li>
                </ul>
            </nav>
        </div>
    )
}