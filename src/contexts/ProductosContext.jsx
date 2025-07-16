/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import { initSweet } from '../assets/SweetAlert'
import productJSON from '../data/products.json';

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
                const mappedProductosAPI = json.data.map((d) => ({
                    id: d.mal_id,
                    name: d.title,
                    category: d.demographics?.[0]?.name || "Sin categoría",
                    price: (Math.random() * 150).toFixed(2),
                    description: d.background?.slice(0, 250) + "..." || "Sin descripción disponible",
                    image: d.images?.webp?.large_image_url || ""
                }));

                // 1º Traigo la información del JSON
                const jsonProducts = getJsonDataProducts();


                console.log("\n" + "=".repeat(80));
                console.log(`🚀 INFORMACION DE JSON`);
                console.log("📋 Cantidad Productos: ", jsonProducts.length);
                console.log("=".repeat(80));

                console.log(JSON.stringify(jsonProducts));

                // 2ª Unifico los datos del JSON con los de la API 
                const mergedProducts = fusionUpdateProducts(jsonProducts, mappedProductosAPI);

                console.log("\n" + "=".repeat(80));
                console.log("📝 DATOS API MANGA");
                console.log("📋 Cantidad Productos API: ", mappedProductosAPI.length);
                console.log("📋 Cantidad Productos JSON: ", jsonProducts.length);
                console.log("📋 Cantidad Productos Fusion: ", mergedProducts.length);
                console.log("│", mappedProductosAPI);
                console.log("=".repeat(80));


                console.log("\n" + "=".repeat(80));
                console.log("📝 UNIFICACION DE DATOS JSON CON API");
                console.log("📋 Cantidad Productos: ", mergedProducts.length);
                console.log("│", mergedProducts);
                console.log("=".repeat(80));


                // 3ª Unifico los datos guardados en el LOCALSTORAGE
                const finalProducts = getLocalStorageProducts(mergedProducts);

                console.log("\n" + "=".repeat(80));
                console.log("📝 PRODUCTOS EN LISTA FINAL");
                console.log("📋 Cantidad Productos: ", finalProducts.length);
                console.log("│", finalProducts);
                console.log("=".repeat(80));


                setProductos(finalProducts);
                setCargando(false);
            })
            .catch((error) => {
                console.error("Error al cargar productos:", error);
                setError('Error. No se pudo cargar los datos de la API');
                clearTimeout(timeoutId);
                setCargando(false);
            });

        return () => clearTimeout(timeoutId);
    }, [apiPage]);

    const getJsonDataProducts = () => {
        if (productJSON !== null && productJSON.length > 0) {
            return productJSON;
        }
        return [];
    }

    const fusionUpdateProducts = (jsonProducts, mappedProductos) => {
        const jsonProductIds = new Set(jsonProducts.map(product => product.id));

        const uniqueApiProducts = mappedProductos.filter(apiProduct =>
            !jsonProductIds.has(apiProduct.id)
        );

        return [...jsonProducts, ...uniqueApiProducts];
    };

    const getLocalStorageProducts = (currentProducts) => {
        const productsLS = localStorage.getItem("products");

        if (productsLS !== null) {
            try {
                const parsedProducts = JSON.parse(productsLS);
                if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
                    const currentProductIds = new Set(currentProducts.map(p => p.id));
                    const uniqueStorageProducts = parsedProducts.filter(p =>
                        !currentProductIds.has(p.id)
                    );
                    return [...currentProducts, ...uniqueStorageProducts];
                }
            } catch (e) {
                console.error("Error parsing localStorage products:", e);
            }
        }

        localStorage.setItem("products", JSON.stringify(currentProducts));
        return currentProducts;
    };

    const agregarProducto = (producto) => {
        if (!producto || !producto.name) {
            console.error("Producto inválido");
            return;
        }

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
            id: getNextIdProduct()
        };

        setProductos(productos => {
            const productosActualizados = [...productos, nuevoProducto];
            updateLocalStorage(productosActualizados);
            return productosActualizados;
        });

        initSweet(
            "Manga agregado a los Productos",
            `El manga "${producto.name}" se agregó correctamente con ID: ${nuevoProducto.id}`,
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

        setProductos(productos => {
            const productosActualizados = productos.filter(p => p.id !== id);
            updateLocalStorage(productosActualizados);
            return productosActualizados;
        });

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

        setProductos(productos => {
            const productosActualizados = productos.map(p =>
                p.id === id ? { ...p, ...datosActualizados } : p
            );
            updateLocalStorage(productosActualizados);
            return productosActualizados;
        });

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

    const getNextIdProduct = () => {
        if (!productos || productos.length === 0) {
            return 1;
        }

        const maxId = Math.max(...productos.map(p => p.id || 0));
        return maxId + 1;
    }

    const productsNavigateNext = () => {
        setApiPage((prev) => prev + 1);
    }

    const productsNavigatePrev = () => {
        setApiPage((prev) => (prev > 1 ? prev - 1 : 1));
    }

    const updateLocalStorage = (productosActualizados) => {
        localStorage.setItem("products", JSON.stringify(productosActualizados));
    };

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