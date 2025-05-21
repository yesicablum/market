// Base URL para todas las peticiones
// Si estamos en desarrollo, usamos el proxy configurado en vite.config.js
const BASE_URL = import.meta.env.DEV ? '/api' : 'https://app-de-gestion-y-operacion-de-bases-de.onrender.com';

/**
 * Función para iniciar sesión
 * @param {Object} credentials - Credenciales del usuario
 * @param {string} credentials.usuario - Nombre de usuario
 * @param {string} credentials.password - Contraseña
 * @returns {Promise<Object>} - Respuesta del servidor
 */
export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

/**
 * Función para registrar un nuevo usuario
 * @param {Object} data - Datos del nuevo usuario
 * @param {string} data.usuario - Nombre de usuario
 * @param {string} data.password - Contraseña
 * @returns {Promise<Object>} - Respuesta del servidor
 */
export async function registerUser(data) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
}

/**
 * Función para obtener todos los productos
 * @returns {Promise<Array>} - Lista de productos
 */
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/productos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  // El backend devuelve directamente el array de productos
  return response.json();
}

/**
 * Función para agregar un nuevo producto
 * @param {Object} producto - Datos del nuevo producto
 * @param {string} producto.nombre - Nombre del producto
 * @param {number} producto.cantidad - Cantidad disponible
 * @param {number} producto.precio - Precio del producto
 * @returns {Promise<Object>} - Respuesta del servidor
 */
export async function addProduct(producto) {
  const response = await fetch(`${BASE_URL}/productos/agregar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  });

  if (!response.ok) {
    throw new Error('Failed to add product');
  }

  return response.json();
}

/**
 * Función para actualizar un producto existente
 * @param {Object} producto - Datos actualizados del producto
 * @param {string} producto.id - ID del producto (formato ObjectId de MongoDB)
 * @param {string} producto.nombre - Nombre actualizado del producto
 * @param {number} producto.cantidad - Cantidad actualizada
 * @param {number} producto.precio - Precio actualizado
 * @returns {Promise<Object>} - Respuesta del servidor
 */
export async function updateProduct(producto) {
  const { id, ...datosProducto } = producto;
  
  const response = await fetch(`${BASE_URL}/productos/actualizar`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      id: id, // Mantiene el ID original
      ...datosProducto // Incluye el resto de los datos
    })
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return response.json();
}

/**
 * Función para eliminar un producto
 * @param {string} id - ID del producto a eliminar (formato ObjectId de MongoDB)
 * @returns {Promise<Object>} - Respuesta del servidor
 */
export async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/productos/eliminar`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }

  return response.json();
}

/**
 * Función para descargar el reporte de productos en Excel
 * @returns {Promise<Blob>} - Archivo Excel en formato Blob
 */
export async function downloadReport() {
  const response = await fetch(`${BASE_URL}/reporte`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error('Failed to download report');
  }

  return response.blob();
}