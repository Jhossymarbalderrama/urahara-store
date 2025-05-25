import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/spinner.css"
import "../styles/productDetail.css"

export function ProductDetail({ agregarCarrito }) {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [cantidad, setCantidad] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch('https://api.jikan.moe/v4/manga/' + id + '/full')
            .then((res) => res.json())
            .then((json) => {

                setProduct(
                    {
                        id: json.data.mal_id,
                        name: json.data.title,
                        category: json.data.demographics?.[0]?.name || "Sin categoría",
                        price: (Math.random() * 150).toFixed(2),
                        description: json.data.background || "Sin descripción disponible",
                        image: json.data.images?.webp?.large_image_url || ""
                    }
                )

                setTimeout(() => {
                    setCargando(false);
                }, 500);
            })
            .catch((error) => {
                console.error("Error al cargar el producto:", error);
                setError('Error. No se pudo cargar los datos de la API');
                setCargando(false);
            });
    }, [id]);



    function sumCont() {
        setCantidad(cantidad + 1)
    }

    function restCont() {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }


    if (cargando) {
        return <div className="container-spinner">
            <span className="loaderCircle"></span>
            <span className="loaderText">Cargando producto</span>
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
                        <p className="text-muted mb-1"><strong>Tag:</strong> {product.category}</p>
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
                            onClick={() => agregarCarrito(product, cantidad)}
                        >
                            <i className="fas fa-cart-plus me-2"></i> Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}