import React, { useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "../styles/nav.css"
import { useAuthContext } from "../contexts/AuthContext";

export function Nav({ productsCarrito }) {
    const { isLogin } = useAuthContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    function navigateHome() {
        navigate("/");
        setIsMenuOpen(false);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div>
            <div className="section-logo">
                <div className="logo" onClick={navigateHome}>
                    <div className="img" title="Urahara Store"></div>
                </div>
            </div>

            <nav className="nav-container">
                <button
                    className="mobile-menu-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                </button>

                {isMenuOpen && <div className="mobile-menu-overlay" onClick={closeMenu}></div>}

                <ul className={`nav-list ${isMenuOpen ? 'mobile-open' : ''}`}>
                    <li className="nav-group nav-main-links">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"}
                            onClick={closeMenu}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"}
                            onClick={closeMenu}
                        >
                            Productos
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"}
                            onClick={closeMenu}
                        >
                            Nosotros
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"}
                            onClick={closeMenu}
                        >
                            Contacto
                        </NavLink>
                    </li>

                    <li className="nav-group nav-user-links">
                        <NavLink
                            to="/login"
                            className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"}
                            onClick={closeMenu}
                        >
                            <div className={isLogin() ? "logout" : ""}>
                                {isLogin() ? "Logout" : "Login"}
                            </div>
                        </NavLink>

                        <div className="nav-separator">|</div>

                        <NavLink
                            to="/administrador"
                            className={({ isActive }) => isActive ? "nav-item nav-item-activate" : "nav-item"}
                            onClick={closeMenu}
                        >
                            Admin
                        </NavLink>

                        <div className="nav-separator">|</div>

                        <NavLink
                            to="/cart"
                            className={({ isActive }) => isActive ? "nav-item nav-item-activate cart-link" : "nav-item cart-link"}
                            onClick={closeMenu}
                        >
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span className="cart-count">
                                {productsCarrito.length > 0 ? productsCarrito.length : 0}
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}