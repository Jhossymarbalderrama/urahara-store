/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import { initSweet } from '../assets/SweetAlert'

export const ProductosContext = createContext();

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [apiPage, setApiPage] = useState(1);

    useEffect(() => {
        setCargando(true);
        setError(null);

        const timeoutId = setTimeout(() => {
            setCargando(false);
        }, 1000);

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
                // console.log("Productos JSON:", JSON.stringify(mappedProductos));
                setProductos(mappedProductos);
            })
            .catch((error) => {
                console.error("Error al cargar productos:", error);
                setError('Error. No se pudo cargar los datos de la API');
                clearTimeout(timeoutId);
                setCargando(false);
            });

        return () => clearTimeout(timeoutId);
    }, [apiPage]);


    const agregarProducto = (producto) => {
        if (!producto || !producto.name) {
            console.error("Producto inválido");
            return;
        }

        const maxId = productos.length > 0
            ? Math.max(...productos.map(p => Number(p.id)))
            : 0;
        const nuevoId = maxId + 1;

        const existePorNombre = productos.some(p =>
            p.name.toLowerCase() === producto.name.toLowerCase()
        );

        if (existePorNombre) {
            initSweet(
                "Manga ya existe",
                `El manga "${producto.name}" ya está en la lista`,
                "warning",
                "Aceptar"
            );
            return;
        }

        const nuevoProducto = {
            ...producto,
            id: nuevoId
        };

        setProductos(productos => [...productos, nuevoProducto]);

        initSweet(
            "Manga agregado a los Productos",
            `El manga "${producto.name}" se agregó correctamente con ID: ${nuevoId}`,
            "success",
            "Aceptar"
        );
    }

    const eliminarProducto = (id) => {
        const productoAEliminar = productos.find(p => p.id === id);

        if (!productoAEliminar) {
            initSweet(
                "Error",
                "No se encontró el producto a eliminar",
                "error",
                "Aceptar"
            );
            return;
        }

        setProductos(productos => productos.filter(p => p.id !== id));

        initSweet(
            "Producto eliminado",
            `El manga "${productoAEliminar.name}" fue eliminado correctamente`,
            "success",
            "Aceptar"
        );
    };

    const modificarProducto = (id, datosActualizados) => {
        const productoExiste = productos.some(p => p.id === id);

        if (!productoExiste) {
            initSweet(
                "Error",
                "No se encontró el producto a modificar",
                "error",
                "Aceptar"
            );
            return;
        }

        setProductos(productos =>
            productos.map(p =>
                p.id === id
                    ? { ...p, ...datosActualizados }
                    : p
            )
        );

        initSweet(
            "Producto modificado",
            "El manga fue actualizado correctamente",
            "success",
            "Aceptar"
        );
    };

    const getProductoById = (id) => {
        if (!id || !productos || productos.length === 0) {
            return null;
        }

        console.log("Producto Encontrado", productos.find(p => p.id === parseInt(id) || p.id === id));

        return productos.find(p => p.id === parseInt(id) || p.id === id) || null;
    }


    const productsNavigateNext = () => {
        setApiPage((prev) => prev + 1);
    }

    const productsNavigatePrev = () => {
        setApiPage((prev) => (prev > 1 ? prev - 1 : 1));
    }

    return (
        <ProductosContext.Provider value={{
            productos,
            cargando,
            error,
            agregarProducto,
            eliminarProducto,
            modificarProducto,
            productsNavigateNext,
            productsNavigatePrev,
            apiPage,
            setApiPage,
            getProductoById
        }}>
            {children}
        </ProductosContext.Provider>
    );
}

export const useProductosContext = () => useContext(ProductosContext);