import React from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "../styles/nav.css"


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
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}>Home</NavLink>
                        <NavLink to="/products" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}>Productos</NavLink>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}>Nosotros</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}>Contacto</NavLink>
                    </li>

                    <li className="d-flex flex-row justify-content-center gap-3">
                        <NavLink to="/login" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}>Login</NavLink>
                        <div className="text-white">|</div>
                        <NavLink to="/administrador" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}> Admin</NavLink>
                        <div className="text-white">|</div>
                        <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span>{productsCarrito.length > 0 ? productsCarrito.length : 0}</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}