import React from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "../styles/nav.css"
import { useAuthContext } from "../contexts/AuthContext";

export function Nav({ productsCarrito }) {
    const { isLogin } = useAuthContext();

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

            <nav style={{ padding: "20px 5rem" }} className="nav-container">
                <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-between", margin: 0, fontSize: "16px", alignItems: "center" }}>

                    <li className="d-flex flex-row justify-content-center gap-5">
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}>Home</NavLink>
                        <NavLink to="/products" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}>Productos</NavLink>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}>Nosotros</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}>Contacto</NavLink>
                    </li>

                    <li className="d-flex flex-row justify-content-center gap-3">


                        <NavLink to="/login" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"}
                            style={{ textDecoration: "none" }}>
                            <div className={isLogin() ? "logout" : ""}>
                                {isLogin() ? "Logout" : "Login"}
                            </div>
                        </NavLink>

                        <div className="text-white fw-bold">|</div>

                        <NavLink to="/administrador" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}> Admin</NavLink>

                        <div className="text-white fw-bold">|</div>

                        <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"} style={{ textDecoration: "none" }}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span>{productsCarrito.length > 0 ? productsCarrito.length : 0}</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div >
    )
}