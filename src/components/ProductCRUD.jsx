import React, { useState } from "react";
import "../styles/productCrud.css";
import { useProductosContext } from "../contexts/ProductosContext";
import { FormularioProducto } from "./FormularioProductos";

export function ProductCrud() {
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [showModal, setShowModal] = useState(false);

    const contextValue = useProductosContext();
    const {
        productos,
        productsNavigatePrev,
        productsNavigateNext,
        cargando,
        error,
        setApiPage,
        eliminarProducto,
        modificarProducto
    } = contextValue;

    const handleEdit = (producto) => {
        setEditingProduct(producto.id);
        setEditForm({
            name: producto.name,
            category: producto.category,
            price: producto.price,
            description: producto.description,
            image: producto.image
        });
    };

    const handleSave = (id) => {
        modificarProducto(id, editForm);
        setEditingProduct(null);
        setEditForm({});
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setEditForm({});
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            eliminarProducto(id);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-3" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
            </div>
        );
    }

    return (
        <div className="product-crud-container">
            <div className="crud-header">
                <h5><i className="fas fa-boxes me-2"></i>Gestión de Productos</h5>
                <div className="crud-stats">
                    <span className="badge bg-warning text-dark mx-3" title="Cantidad todal de Productos Mostrados en la Grilla">
                        Total: {productos.length} productos
                    </span>

                    <button
                        className="btn btn-success badge text-light"
                        title="Agregar Producto Nuevo"
                        onClick={() => setShowModal(true)}
                    >
                        Agregar Producto
                        <i className="fas fa-plus ms-2"></i>
                    </button>
                </div>
            </div>

            <div className="crud-pagination mb-5">
                <button
                    className="btn btn-pagination"
                    onClick={productsNavigatePrev}
                    title="Página anterior"
                >
                    <i className="fas fa-chevron-left me-2"></i>
                    Anterior
                </button>

                <button
                    className="btn btn-pagination"
                    onClick={() => setApiPage(1)}
                    title="Primera página"
                >
                    <i className="fas fa-home me-2"></i>
                    Inicio
                </button>

                <button
                    className="btn btn-pagination"
                    onClick={productsNavigateNext}
                    title="Página siguiente"
                >
                    Siguiente
                    <i className="fas fa-chevron-right ms-2"></i>
                </button>
            </div>


            <div className="table-responsive">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td className="id-cell">{producto.id}</td>

                                <td className="image-cell">
                                    <img
                                        src={producto.image || 'https://via.placeholder.com/60x80?text=No+Image'}
                                        alt={producto.name}
                                        className="product-thumbnail"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/60x80?text=Error';
                                        }}
                                    />
                                </td>

                                <td className="name-cell">
                                    {editingProduct === producto.id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleEditChange}
                                            className="form-control form-control-sm"
                                        />
                                    ) : (
                                        <span className="product-name">{producto.name}</span>
                                    )}
                                </td>

                                <td className="category-cell">
                                    {editingProduct === producto.id ? (
                                        <input
                                            type="text"
                                            name="category"
                                            value={editForm.category}
                                            onChange={handleEditChange}
                                            className="form-control form-control-sm"
                                        />
                                    ) : (
                                        <span className="badge category-badge">{producto.category}</span>
                                    )}
                                </td>

                                <td className="price-cell">
                                    {editingProduct === producto.id ? (
                                        <input
                                            type="number"
                                            name="price"
                                            value={editForm.price}
                                            onChange={handleEditChange}
                                            className="form-control form-control-sm"
                                            step="0.01"
                                        />
                                    ) : (
                                        <span className="price-tag">${producto.price}</span>
                                    )}
                                </td>

                                <td className="description-cell">
                                    {editingProduct === producto.id ? (
                                        <textarea
                                            name="description"
                                            value={editForm.description}
                                            onChange={handleEditChange}
                                            className="form-control form-control-sm"
                                            rows="2"
                                        />
                                    ) : (
                                        <span className="description-text" title={producto.description}>
                                            {producto.description}
                                        </span>
                                    )}
                                </td>

                                <td className="actions-cell">
                                    {editingProduct === producto.id ? (
                                        <div className="edit-actions">
                                            <button
                                                className="btn btn-success btn-sm me-1"
                                                onClick={() => handleSave(producto.id)}
                                                title="Guardar"
                                            >
                                                <i className="fas fa-check"></i>
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={handleCancel}
                                                title="Cancelar"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="action-buttons">
                                            <i title="Editar" className="fas fa-edit" onClick={() => handleEdit(producto)}></i>

                                            <i onClick={() => handleDelete(producto.id)} title="Eliminar" className="fas fa-trash"></i>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {productos.length === 0 && (
                <div className="empty-state">
                    <i className="fas fa-box-open"></i>
                    <h4>No hay productos disponibles</h4>
                    <p>Agrega algunos productos para comenzar a gestionarlos.</p>
                </div>
            )}

            <div className="crud-pagination">
                <button
                    className="btn btn-pagination"
                    onClick={productsNavigatePrev}
                    title="Página anterior"
                >
                    <i className="fas fa-chevron-left me-1"></i>
                    Anterior
                </button>

                <button
                    className="btn btn-pagination"
                    onClick={() => setApiPage(1)}
                    title="Primera página"
                >
                    <i className="fas fa-home me-1"></i>
                    Inicio
                </button>

                <button
                    className="btn btn-pagination"
                    onClick={productsNavigateNext}
                    title="Página siguiente"
                >
                    Siguiente
                    <i className="fas fa-chevron-right ms-1"></i>
                </button>
            </div>


            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="fas fa-plus me-2"></i>
                                    Agregar Nuevo Producto
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <FormularioProducto
                                    onClose={() => setShowModal(false)}
                                    onProductAdded={() => setShowModal(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div
                    className="modal-backdrop fade show"
                    onClick={() => setShowModal(false)}
                ></div>
            )}
        </div>
    );
}