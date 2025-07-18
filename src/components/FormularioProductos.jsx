import React, { useState, useEffect } from 'react';
import { useProductosContext } from "../contexts/ProductosContext";
import "../styles/formularioProductos.css";

export function FormularioProducto({ onClose, onProductAdded, editingProduct, modalMode }) {
    const [product, setProducto] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        image: ''
    });
    const [errores, setErrores] = useState({});

    const { agregarProducto, modificarProducto } = useProductosContext();


    useEffect(() => {
        if (modalMode === 'edit' && editingProduct) {
            setProducto({
                name: editingProduct.name || '',
                category: editingProduct.category || '',
                price: editingProduct.price || '',
                description: editingProduct.description || '',
                image: editingProduct.image || ''
            });
        } else {

            setProducto({
                name: '',
                category: '',
                price: '',
                description: '',
                image: ''
            });
        }
        setErrores({});
    }, [modalMode, editingProduct]);

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!product.name.trim()) {
            nuevosErrores.name = 'El nombre es obligatorio.';
        }
        if (!product.category.trim()) {
            nuevosErrores.category = 'La categoría es obligatoria.';
        }
        if (!product.price || parseFloat(product.price) <= 0) {
            nuevosErrores.price = 'El precio debe ser mayor a 0.';
        }
        if (!product.description.trim() || product.description.length < 10) {
            nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres.';
        }
        if (product.image && !isValidURL(product.image)) {
            nuevosErrores.image = 'La URL de la imagen no es válida.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const isValidURL = (string) => {
        try {
            new URL(string);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...product, [name]: value });

        if (errores[name]) {
            setErrores({ ...errores, [name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validarFormulario()) {
            const productoParaProcesar = {
                name: product.name.trim(),
                category: product.category.trim(),
                price: parseFloat(product.price).toFixed(2),
                description: product.description.trim(),
                image: product.image.trim() || "https://bitsofco.de/img/Qo5mfYDE5v-350.avif"
            };

            if (modalMode === 'edit' && editingProduct) {
                modificarProducto(editingProduct.id, productoParaProcesar);
            } else {
                agregarProducto(productoParaProcesar);
            }


            setProducto({
                name: '',
                category: '',
                price: '',
                description: '',
                image: ''
            });
            setErrores({});

            if (onProductAdded) {
                onProductAdded();
            }
        }
    };

    return (
        <div className="formulario-container">
            <form onSubmit={handleSubmit} className="formulario-producto">
                <h2 className="formulario-titulo">
                    {modalMode === 'edit' ? 'Editar Producto' : 'Agregar Producto'}
                </h2>

                <div className="campo-container">
                    <label className="campo-label">Nombre:</label>
                    {errores.name && <p className="error-message">{errores.name}</p>}
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className={`campo-input ${errores.name ? 'error' : ''}`}
                        placeholder="Nombre del manga"
                    />
                </div>

                <div className="campo-container">
                    <label className="campo-label">Categoría:</label>
                    {errores.category && <p className="error-message">{errores.category}</p>}
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className={`campo-input ${errores.category ? 'error' : ''}`}
                        placeholder="Ej: Shonen, Seinen, etc."
                    />
                </div>

                <div className="campo-container">
                    <label className="campo-label">Precio:</label>
                    {errores.price && <p className="error-message">{errores.price}</p>}
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className={`campo-input ${errores.price ? 'error' : ''}`}
                        placeholder="0.00"
                    />
                </div>

                <div className="campo-container">
                    <label className="campo-label">Descripción:</label>
                    {errores.description && <p className="error-message">{errores.description}</p>}
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows="6"
                        className={`campo-textarea ${errores.description ? 'error' : ''}`}
                        placeholder="Descripción del manga (mínimo 10 caracteres)"
                    />
                </div>

                <div className="campo-container">
                    <label className="campo-label">URL de la Imagen (opcional):</label>
                    {errores.image && <p className="error-message">{errores.image}</p>}
                    <input
                        type="url"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        className={`campo-input ${errores.image ? 'error' : ''}`}
                        placeholder="https://bitsofco.de/img/Qo5mfYDE5v-350.avif"
                    />
                </div>

                <div className="button-container">
                    <button type="submit" className="btn-submit">
                        {modalMode === 'edit' ? 'Guardar Cambios' : 'Agregar Producto'}
                    </button>
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}