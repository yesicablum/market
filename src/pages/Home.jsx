import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/marketService';
import { isUserLoggedIn } from '../services/sessionService';
import './Home.css';
import Header from '../components/Header';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-title">Bienvenido al mercado de productos</h1>
        <p className="home-description">¡Explora nuestros productos más recientes y encuentra las mejores ofertas!</p>

        {isLoggedIn && (
          <>
            <div className="products-grid">
              {products.map(product => (
                <div key={product._id} className="product-card">
                  <h2 className="product-name">{product.nombre}</h2>
                  <p className="product-price">
                    {typeof product.precio === 'number' ? `$${product.precio.toFixed(2)}` : 'Precio no disponible'}
                  </p>
                  <div className="product-tag">
                    {product.cantidad > 0 ? 'Disponible' : 'Agotado'}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
