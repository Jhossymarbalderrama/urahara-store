import React, { useState } from "react";
import "../styles/productCrud.css";
import { useProductosContext } from "../contexts/ProductosContext";
import { FormularioProducto } from "./FormularioProductos";

export function ProductCrud() {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [modalMode, setModalMode] = useState('add'); // 'add' o 'edit'

    const contextValue = useProductosContext();
    const {
        productosPaginados,
        totalProductos,
        totalProductosGeneral,
        productsNavigatePrev,
        productsNavigateNext,
        irAPagina,
        paginaActual,
        totalPaginas,
        cargando,
        error,
        eliminarProducto,
        busqueda,
        actualizarBusqueda,
        limpiarBusqueda,
        getCategorias
    } = contextValue;

    const handleEdit = (producto) => {
        setEditingProduct(producto);
        setModalMode('edit');
        setShowModal(true);
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setModalMode('add');
        setShowModal(true);
    };

    const handleDelete = (producto) => {
        setProductToDelete(producto);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            eliminarProducto(productToDelete.id);
            setShowDeleteModal(false);
            setProductToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditingProduct(null);
        setModalMode('add');
    };

    const handleBusquedaChange = (campo, valor) => {
        actualizarBusqueda({ [campo]: valor });
    };

    const handleLimpiarFiltros = () => {
        limpiarBusqueda();
    };

    const generarNumerosPagina = () => {
        const paginas = [];
        const rango = 2;

        let inicio = Math.max(1, paginaActual - rango);
        let fin = Math.min(totalPaginas, paginaActual + rango);

        if (paginaActual <= rango) {
            fin = Math.min(totalPaginas, rango * 2 + 1);
        }
        if (paginaActual > totalPaginas - rango) {
            inicio = Math.max(1, totalPaginas - rango * 2);
        }

        for (let i = inicio; i <= fin; i++) {
            paginas.push(i);
        }

        return paginas;
    };

    const NavegacionCrud = () => (
        <div className="crud-navegacion-container">
            <div className="crud-pagination">
                <button
                    className="btn btn-pagination"
                    onClick={productsNavigatePrev}
                    disabled={paginaActual === 1}
                    title="Página anterior"
                >
                    <i className="fas fa-chevron-left me-2"></i>
                    Anterior
                </button>

                {totalPaginas > 1 && generarNumerosPagina().map(numeroPagina => (
                    <button
                        key={numeroPagina}
                        onClick={() => irAPagina(numeroPagina)}
                        className={`btn-numero-pagina-crud ${numeroPagina === paginaActual ? 'activo' : ''}`}
                    >
                        {numeroPagina}
                    </button>
                ))}

                <button
                    className="btn btn-pagination"
                    onClick={productsNavigateNext}
                    disabled={paginaActual === totalPaginas}
                    title="Página siguiente"
                >
                    Siguiente
                    <i className="fas fa-chevron-right ms-2"></i>
                </button>
            </div>
        </div>
    );

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
                    <span className="badge bg-info text-white mx-2" title="Productos mostrados después de filtros">
                        Mostrando: {totalProductos}
                    </span>
                    <span className="badge bg-warning text-dark mx-1" title="Total de productos disponibles">
                        Total: {totalProductosGeneral} productos
                    </span>

                    <button
                        className="btn btn-success badge text-light"
                        title="Agregar Producto Nuevo"
                        onClick={handleAddProduct}
                    >
                        Agregar Producto
                        <i className="fas fa-plus ms-2"></i>
                    </button>
                </div>
            </div>

            <div className="search-section">
                <div className="search-header">
                    <h6><i className="fas fa-search me-2"></i>Buscar y Filtrar Productos</h6>
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={handleLimpiarFiltros}
                        title="Limpiar todos los filtros"
                    >
                        <i className="fas fa-eraser me-1"></i>
                        Limpiar Filtros
                    </button>
                </div>

                <div className="search-filters">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label">
                                <i className="fas fa-search me-1"></i>
                                Buscar por nombre o descripción
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Escribir para buscar..."
                                value={busqueda.texto}
                                onChange={(e) => handleBusquedaChange('texto', e.target.value)}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label">
                                <i className="fas fa-tags me-1"></i>
                                Categoría
                            </label>
                            <select
                                className="form-select"
                                value={busqueda.categoria}
                                onChange={(e) => handleBusquedaChange('categoria', e.target.value)}
                            >
                                <option value="">Todas las categorías</option>
                                {getCategorias().map(categoria => (
                                    <option key={categoria} value={categoria}>
                                        {categoria}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <NavegacionCrud />

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
                        {productosPaginados.map((producto) => (
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
                                    <span className="product-name">{producto.name}</span>
                                </td>

                                <td className="category-cell">
                                    <span className="badge category-badge">{producto.category}</span>
                                </td>

                                <td className="price-cell">
                                    <span className="price-tag">${producto.price}</span>
                                </td>

                                <td className="description-cell">
                                    <span className="description-text" title={producto.description}>
                                        {producto.description}
                                    </span>
                                </td>

                                <td className="actions-cell">
                                    <div className="action-buttons">
                                        <i
                                            title="Editar"
                                            className="fas fa-edit"
                                            onClick={() => handleEdit(producto)}
                                        ></i>
                                        <i
                                            onClick={() => handleDelete(producto)}
                                            title="Eliminar"
                                            className="fas fa-trash"
                                        ></i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalProductos === 0 && totalProductosGeneral > 0 ? (
                <div className="empty-search-results">
                    <i className="fas fa-search"></i>
                    <h4>No se encontraron productos</h4>
                    <p>No hay productos que coincidan con los criterios de búsqueda.</p>
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleLimpiarFiltros}
                    >
                        <i className="fas fa-eraser me-2"></i>
                        Limpiar filtros y mostrar todos
                    </button>
                </div>
            ) : totalProductos === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-box-open"></i>
                    <h4>No hay productos disponibles</h4>
                    <p>Agrega algunos productos para comenzar a gestionarlos.</p>
                </div>
            ) : null}

            {totalPaginas > 1 && <NavegacionCrud />}


            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className={`fas ${modalMode === 'edit' ? 'fa-edit' : 'fa-plus'} me-2`}></i>
                                    {modalMode === 'edit' ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleModalClose}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <FormularioProducto
                                    onClose={handleModalClose}
                                    onProductAdded={handleModalClose}
                                    editingProduct={editingProduct}
                                    modalMode={modalMode}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div
                    className="modal-backdrop fade show"
                    onClick={handleModalClose}
                ></div>
            )}


            {showDeleteModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="fas fa-exclamation-triangle me-2"></i>
                                    Confirmar Eliminación
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={cancelDelete}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="delete-confirmation-content">
                                    <div className="delete-warning-icon">
                                        <i className="fas fa-trash-alt"></i>
                                    </div>
                                    <h4 className="delete-title">¿Estás seguro?</h4>
                                    <p className="delete-message">
                                        Estás a punto de eliminar el producto:
                                    </p>
                                    {productToDelete && (
                                        <div className="product-to-delete">
                                            <div className="product-info-delete">
                                                <img
                                                    src={productToDelete.image || 'https://via.placeholder.com/60x80?text=No+Image'}
                                                    alt={productToDelete.name}
                                                    className="product-image-delete"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/60x80?text=Error';
                                                    }}
                                                />
                                                <div className="product-details-delete">
                                                    <h6 className="product-name-delete">{productToDelete.name}</h6>
                                                    <small className="product-id-delete">ID: {productToDelete.id}</small>
                                                    <span className="product-price-delete">${productToDelete.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <p className="delete-warning">
                                        Esta acción no se puede deshacer.
                                    </p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="delete-button-container">
                                    <button
                                        type="button"
                                        className="btn-cancel-delete"
                                        onClick={cancelDelete}
                                    >
                                        <i className="fas fa-times me-2"></i>
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-confirm-delete"
                                        onClick={confirmDelete}
                                    >
                                        <i className="fas fa-trash me-2"></i>
                                        Eliminar Producto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div
                    className="modal-backdrop fade show"
                    onClick={cancelDelete}
                ></div>
            )}
        </div>
    );
}