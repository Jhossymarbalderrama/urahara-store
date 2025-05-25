import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import { Carrito } from "./Carrito";
import "../styles/productos.css";
import "../styles/spinner.css"

export function Productos({ agregarCarrito }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [apiPage, setApiPage] = useState(1);

    useEffect(() => {
        setCargando(true);
        fetch(`https://api.jikan.moe/v4/manga?limit=24&page=${apiPage}`)
            .then((res) => res.json())
            .then((json) => {
                const mappedProductos = json.data.map((d) => ({
                    id: d.mal_id,
                    name: d.title,
                    category: d.demographics?.[0]?.name || "Sin categoría",
                    price: (Math.random() * 150).toFixed(2),
                    description: d.background?.slice(0, 250) + "..." || "Sin descripción disponible",
                    image: d.images?.webp?.large_image_url || ""
                }));
                setProductos(mappedProductos);
                setTimeout(() => {
                    setCargando(false);
                }, 1000);
            })
            .catch((error) => {
                console.error("Error al cargar productos:", error);
                setError('Error. No se pudo cargar los datos de la API');
                setCargando(false);
            });
    }, [apiPage]); // <-- ¡acá!



    function productsNavigateNext() {
        setApiPage((prev) => prev + 1);
    }

    function productsNavigatePrev() {
        setApiPage((prev) => (prev > 1 ? prev - 1 : 1));
    }

    const Navegacion = () => (
        <div className="w-100 d-flex flex-row justify-content-center mt-4 gap-5">
            <button className="btn-navigate" onClick={productsNavigatePrev}>
                <i className="fa-solid fa-arrow-left"></i>
                Anterior
            </button>
            <button className="btn-navigate" onClick={() => setApiPage(1)}>
                <i className="fa-solid fa-house"></i>
                Inicio
            </button>
            <button className="btn-navigate" onClick={productsNavigateNext}>
                Siguiente
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    );

    if (cargando) {
        return <div className="container-spinner">
            <span className="loaderCircle"></span>
            <span className="loaderText">Cargando</span>
        </div>
    } else if (error) {
        return <p>No se pudo cargar los productos.</p>
    } else {
        return (
            <div>
                <Navegacion />

                <div className="products-container">
                    {productos.map((pd) => (
                        <Card key={pd.id} producto={pd} agregarCarrito={agregarCarrito} />
                    ))}
                </div>

                <Navegacion />
            </div>
        )
    }

}