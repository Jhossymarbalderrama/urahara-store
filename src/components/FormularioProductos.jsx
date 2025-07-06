import React, { useState } from 'react';
import { useProductosContext } from "../contexts/ProductosContext";

export function FormularioProducto() {
    const [product, setProducto] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        image: ''
    });
    const [errores, setErrores] = useState({});

    const { agregarProducto } = useProductosContext();

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
            const productoParaAgregar = {
                name: product.name.trim(),
                category: product.category.trim(),
                price: parseFloat(product.price).toFixed(2),
                description: product.description.trim(),
                image: product.image.trim() || "https://via.placeholder.com/300x400?text=Sin+Imagen"
            };

            agregarProducto(productoParaAgregar);

            setProducto({
                name: '',
                category: '',
                price: '',
                description: '',
                image: ''
            });
            setErrores({});
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <form onSubmit={handleSubmit}>
                <h2>Agregar Producto</h2>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: errores.name ? '2px solid red' : '1px solid #ccc' }}
                        placeholder="Nombre del manga"
                    />
                    {errores.name && <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '14px' }}>{errores.name}</p>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Categoría:</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: errores.category ? '2px solid red' : '1px solid #ccc' }}
                        placeholder="Ej: Shonen, Seinen, etc."
                    />
                    {errores.category && <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '14px' }}>{errores.category}</p>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Precio:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        style={{ width: '100%', padding: '8px', border: errores.price ? '2px solid red' : '1px solid #ccc' }}
                        placeholder="0.00"
                    />
                    {errores.price && <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '14px' }}>{errores.price}</p>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Descripción:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: errores.description ? '2px solid red' : '1px solid #ccc',
                            resize: 'vertical'
                        }}
                        placeholder="Descripción del manga (mínimo 10 caracteres)"
                    />
                    {errores.description && <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '14px' }}>{errores.description}</p>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>URL de la Imagen (opcional):</label>
                    <input
                        type="url"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: errores.image ? '2px solid red' : '1px solid #ccc' }}
                        placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    {errores.image && <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '14px' }}>{errores.image}</p>}
                    <small style={{ color: '#666' }}>Si no se proporciona, se usará una imagen por defecto</small>
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Agregar Producto
                </button>
            </form>
        </div>
    );
}