import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/marketService";
import Header from "../components/Header";
import './ProductManager.css';// Asegúrate de tener este archivo

const initialFormState = {
  nombre: "",
  cantidad: "",
  precio: "",
};

const ProductManager = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const producto = {
      nombre: form.nombre,
      cantidad: Number(form.cantidad),
      precio: Number(form.precio),
    };

    try {
      if (editandoId) {
        await updateProduct({ id: editandoId, ...producto });
      } else {
        await addProduct(producto);
      }

      setForm(initialFormState);
      setEditandoId(null);
      cargarProductos();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleEditar = (producto) => {
    setForm({
      nombre: producto.nombre,
      cantidad: producto.cantidad,
      precio: producto.precio,
    });
    setEditandoId(producto._id);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProduct(id);
        cargarProductos();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const handleCancelar = () => {
    setForm(initialFormState);
    setEditandoId(null);
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Gestión de Productos</h1>

        <form onSubmit={handleSubmit} className="product-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={form.cantidad}
            onChange={handleChange}
            min = "0"
            required
          />
          <input
            type="number"
            step="0.01"
            name="precio"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            min = "0"
            required
          />
          <button type="submit" className="btn btn-blue">
            {editandoId ? "Actualizar" : "Agregar"}
          </button>
          {editandoId && (
            <button type="button" onClick={handleCancelar} className="btn btn-grey">
              Cancelar
            </button>
          )}
        </form>

        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p._id}>
                  <td>{p.nombre}</td>
                  <td>{p.cantidad}</td>
                  <td>${p.precio.toFixed(2)}</td>
                  <td>
                    <div className="acciones-btns">
                    <button className="btn btn-yellow" onClick={() => handleEditar(p)}>
                      Editar
                    </button>
                    <button className="btn btn-red" onClick={() => handleEliminar(p._id)}>
                      Eliminar
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ProductManager;
