import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import { Carrito } from "./Carrito";
import "../styles/productos.css";
import "../styles/spinner.css"

export function Productos({ agregarCarrito }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);


    {
        useEffect(() => {
            fetch('https://api.jikan.moe/v4/manga?limit=24')
                .then((res) => res.json())
                .then((json) => {
                    const mappedProductos = json.data.map((d) => ({
                        id: d.mal_id,
                        name: d.title,
                        category: d.demographics?.[0]?.name || "Sin categoría",
                        price: (Math.random() * 150).toFixed(2),
                        description: d.background.slice(0, 250) + "..." || "Sin descripción disponible",
                        image: d.images?.webp?.large_image_url || ""
                    }));
                    setProductos(mappedProductos);

                    setTimeout(() => {                    
                        setCargando(false);
                    }, 1500);
                })
                .catch((error) => {
                    console.error("Error al cargar productos:", error);
                    setError('Error. No se pudo cargar los datos de la API');
                    setCargando(false);
                });
        }, []);
    }

    if (cargando) {
        return <div className="container-spinner"><span class="loader">Cargando</span></div>
    } else if (error) {
        return <p>No se pudo cargar los productos.</p>
    } else {
        return (
            <div className="products-container">
                {productos.map((pd) => (
                    <Card key={pd.id} producto={pd} agregarCarrito={agregarCarrito} />
                ))}
            </div>
        )
    }

}