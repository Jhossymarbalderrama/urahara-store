import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/spinner.css"
import "../styles/productDetail.css"
import { CarritoContext } from "../contexts/CarritoContext";
import { useProductosContext } from "../contexts/ProductosContext";

export function ProductDetail() {
    const { agregarAlCarrito } = useContext(CarritoContext);

    const { id } = useParams();
    const [product, setProduct] = useState();
    const [cantidad, setCantidad] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { getProductoById } = useProductosContext();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setCargando(true);
                setError(null);

                const foundProduct = getProductoById(id);

                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError(`No se pudo encontrar el Producto con la id ${id}`);
                    setProduct(null);
                }
            } catch (err) {
                console.error('Error al cargar el producto:', err);
                setError('Error interno al cargar el producto');
                setProduct(null);
            } finally {
                setCargando(false);
            }
        };

        if (id) {
            loadProduct();
        } else {
            setError('ID de producto no válido');
            setCargando(false);
        }

    }, [id, getProductoById]);

    function sumCont() {
        setCantidad(prevCantidad => prevCantidad + 1);
    }

    function restCont() {
        setCantidad(prevCantidad => prevCantidad > 1 ? prevCantidad - 1 : 1);
    }


    if (cargando) {
        return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    } else if (error) {
        return <p>No se pudo cargar el producto.</p>
    } else {
        return (
            <div className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div className="row d-flex justify-content-center align-items-center gap-4" style={{ maxWidth: 1280, width: "100%", backgroundColor: "#fff" }}>
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid"
                            style={{ maxHeight: "600px", objectFit: "contain" }}
                        />
                    </div>

                    <div className="col-md-7 d-flex flex-column justify-content-around align-items-start">
                        <h2 className="fw-bold mb-3" style={{ color: "#ff9e02" }}>{product.name}</h2>
                        <p className="text-muted mb-1">
                            <span className="badge bg-warning text-dark ms-2">
                                {product.category || 'Sin categoría'}
                            </span>
                        </p>
                        <p className="mb-4">{product.description}</p>
                        <h4 className="mb-4" style={{ color: "#ff9e02" }}>${product.price}</h4>

                        <div className="mb-4">
                            <button
                                className="btn"
                                style={{ borderColor: "#ff9e02", color: "#ff9e02" }}
                                onClick={restCont}
                            >
                                <i className="fas fa-minus"></i>
                            </button>
                            <span className="mx-3 fs-5" style={{ color: "black", minWidth: 30, textAlign: "center" }}>{cantidad}</span>
                            <button
                                className="btn"
                                style={{ borderColor: "#ff9e02", color: "#ff9e02" }}
                                onClick={sumCont}
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>

                        <button
                            className="btn"
                            style={{ backgroundColor: "#ff9e02", color: "#fff" }}
                            onClick={() => agregarAlCarrito(product, cantidad)}
                        >
                            <i className="fas fa-cart-plus me-2"></i> Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}