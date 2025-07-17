import React from "react";
import "../styles/productos.css";
import { useNavigate } from "react-router-dom";

export function Card({ producto }) {
    const navigate = useNavigate();

    function redirectProductDetail() {
        navigate("/products/product-detail/" + producto.id);
    }

    return (
        <div className="product-card">
            <img className="product-image" src={producto.image} onClick={redirectProductDetail}></img>
            <div className="details">
                <p>{producto.name}</p>
                <div>
                    <p className="product-price">${producto.price}</p>
                    <p><span className="discount">10% comprando 1 o más</span></p>
                </div>
                <button className="btn-addCart" onClick={redirectProductDetail}>Ver detalle</button>
            </div>
        </div >
    )
}