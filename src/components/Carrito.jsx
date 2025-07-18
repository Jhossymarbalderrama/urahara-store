import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/carrito.css";
import { CarritoContext } from "../contexts/CarritoContext";
import { initSweet } from '../assets/SweetAlert';

export function Carrito() {
    const { productsCarrito, quitarCarrito, vaciarCarrito } = useContext(CarritoContext);
    const navigate = useNavigate();
    const total = productsCarrito.reduce((acc, prod) => acc + Number(prod.price || 0), 0);
    const cantidadItems = productsCarrito.length;

    const handleContinueShopping = () => {
        navigate('/products');
    };

    const handleCheckout = () => {
        initSweet(
            "Compra finalizada",
            `¡Gracias por tu compra! Total: ${total.toFixed(2)}`,
            "success",
            "Aceptar"
        );

        vaciarCarrito();

        setTimeout(() => {
            navigate('/products');
        }, 1500);
    };

    return (
        <div className="carrito-page">
            <div className="carrito-container">
                {/* Header del carrito */}
                <div className="carrito-header">
                    <div className="carrito-title-section">
                        <h2 className="carrito-title">
                            <i className="fas fa-shopping-cart me-2"></i>
                            Mi Carrito de Compras
                        </h2>
                        <div className="carrito-stats">
                            <span className="badge carrito-badge-items">
                                {cantidadItems} {cantidadItems === 1 ? 'item' : 'items'}
                            </span>
                            <span className="badge carrito-badge-total">
                                Total: ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {cantidadItems > 0 && (
                        <button
                            className="btn-vaciar-carrito"
                            onClick={() => vaciarCarrito()}
                            title="Vaciar todo el carrito"
                        >
                            <i className="fas fa-trash-alt me-2"></i>
                            Vaciar Carrito
                        </button>
                    )}
                </div>

                {/* Contenido del carrito */}
                {cantidadItems > 0 ? (
                    <>
                        {/* Vista desktop/tablet - Tabla */}
                        <div className="carrito-table-view">
                            <div className="table-responsive">
                                <table className="carrito-table">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Categoría</th>
                                            <th>Descripción</th>
                                            <th>Precio</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productsCarrito.map((pd, index) => (
                                            <tr key={`${pd.id}-${index}`} className="carrito-row">
                                                <td className="producto-info">
                                                    <div className="producto-details">
                                                        <img
                                                            src={pd.image || 'https://via.placeholder.com/60x80?text=No+Image'}
                                                            alt={pd.name}
                                                            className="producto-image"
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/60x80?text=Error';
                                                            }}
                                                        />
                                                        <div className="producto-text">
                                                            <h6 className="producto-name">{pd.name}</h6>
                                                            <small className="producto-id">ID: {pd.id}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="categoria-badge">{pd.category}</span>
                                                </td>
                                                <td className="descripcion-cell">
                                                    <span className="descripcion-text" title={pd.description}>
                                                        {pd.description}
                                                    </span>
                                                </td>
                                                <td className="precio-cell">
                                                    <span className="precio-amount">
                                                        ${Number(pd.price).toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="acciones-cell">
                                                    <button
                                                        onClick={() => quitarCarrito(pd.id)}
                                                        className="btn-eliminar"
                                                        title="Eliminar del carrito"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Vista móvil - Cards */}
                        <div className="carrito-cards-view">
                            {productsCarrito.map((pd, index) => (
                                <div key={`${pd.id}-${index}`} className="carrito-card">
                                    <div className="card-image-section">
                                        <img
                                            src={pd.image || 'https://via.placeholder.com/120x160?text=No+Image'}
                                            alt={pd.name}
                                            className="card-image"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/120x160?text=Error';
                                            }}
                                        />
                                    </div>
                                    <div className="card-content">
                                        <div className="card-header">
                                            <h6 className="card-title">{pd.name}</h6>
                                            <span className="card-id">ID: {pd.id}</span>
                                        </div>
                                        <div className="card-details">
                                            <div className="card-category">
                                                <i className="fas fa-tag me-1"></i>
                                                {pd.category}
                                            </div>
                                            <div className="card-description">
                                                {pd.description}
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="card-price">
                                                ${Number(pd.price).toFixed(2)}
                                            </div>
                                            <button
                                                onClick={() => quitarCarrito(pd.id)}
                                                className="btn-eliminar-card"
                                                title="Eliminar del carrito"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resumen total */}
                        <div className="carrito-summary">
                            <div className="summary-content">
                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span>Subtotal ({cantidadItems} {cantidadItems === 1 ? 'item' : 'items'}):</span>
                                        <span className="summary-amount">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row summary-total">
                                        <span>Total:</span>
                                        <span className="total-amount">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="btn-checkout-cart" onClick={handleCheckout}>
                                    <i className="fas fa-credit-card me-2"></i>
                                    Proceder al Pago
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="carrito-empty">
                        <div className="empty-content">
                            <i className="fas fa-shopping-cart empty-icon"></i>
                            <h4 className="empty-title">Tu carrito está vacío</h4>
                            <p className="empty-description">
                                Agrega algunos productos a tu carrito para comenzar tu compra.
                            </p>
                            <button className="btn-continue-shopping-cart" onClick={handleContinueShopping}>
                                <i className="fas fa-arrow-left me-2"></i>
                                Continuar Comprando
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}