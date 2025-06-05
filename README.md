# Market App

Este proyecto es una aplicación web desarrollada con **React** y **Vite**, que permite a los usuarios visualizar productos de un mercado y gestionar los productos.

## Características

- Listado de productos con descripciones y precios.
- Sistema de gestion de productos.
- Diseño responsivo y amigable.
- Conexión a una base de datos externa mediante endpoints ya configurados.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS
- React Router DOM para la navegación


## Cómo ejecutar localmente

1. Clona este repositorio:
   ```bash
   git clone [REPO_URL]

2. Instala las dependencias
   npm install

3. Inicia el servidor de desarrollo
   npm run dev

4. Abre el navegador en http://localhost:5173



## Estructura

/market
├── public/ # Archivos estáticos (favicon, etc.)
├── src/ # Código fuente principal
│ ├── assets/ # Recursos como imágenes o íconos
│ ├── components/ # Componentes reutilizables
│ │ ├── Header.css
│ │ └── Header.jsx
│ ├── pages/ # Vistas o páginas del sistema
│ │ ├── Home.css / Home.jsx
│ │ ├── Login.css / Login.jsx
│ │ ├── Register.css / Register.jsx
│ │ └── ProductManager.css / ProductManager.jsx
│ ├── services/ # Servicios de conexión al backend
│ │ ├── marketService.js
│ │ └── sessionService.js
│ ├── App.css / App.jsx # Componente raíz de la app
│ ├── index.css # Estilos globales
│ └── main.jsx # Punto de entrada de React
├── .gitignore
├── eslint.config.js
├── index.html # HTML principal
├── package.json # Dependencias y scripts
├── package-lock.json
├── vite.config.js # Configuración de Vite
└── README.md # Documentación del proyecto


## Despliegue
Este frontend fue desplegado en Vercel y puede visitarse en el siguiente enlace:

🔗 https://market-dusky-psi.vercel.app

La base de datos está alojada de forma separada y configurada para responder al frontend vía API.

## Colaboración
Este proyecto fue realizado en colaboración con mi compañera @Gabytoppers , quien participó activamente en el desarrollo y diseño de la aplicación.
