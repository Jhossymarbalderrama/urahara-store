import React from "react";
import { Link } from 'react-router-dom'

export function Nav({ productsCarrito }) {
    return (
        <nav style={{ backgroundColor: "#333", color: "white", padding: "10px" }}>
            <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-around", margin: 0 }}>
                <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link></li>
                <li><Link to="/products" style={{ color: "white", textDecoration: "none" }}>Productos</Link></li>
                <li><Link to="/about" style={{ color: "white", textDecoration: "none" }}>Nosotros</Link></li>
                <li><Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contacto</Link></li>
                <li><Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="ml-2">{productsCarrito.length > 0 ? productsCarrito.length : ""}</span>
                </Link></li>
            </ul>
        </nav>
    )
}