# Frontend - GuitarsLA (React + Vite)

Interfaz de usuario para la tienda virtual GuitarsLA. Este proyecto es una Single Page Application (SPA) creada con **React 19, TypeScript** y empaquetada a gran velocidad mediante **Vite**. Consume directamente los servicios del backend para listar productos y enviarlos al carrito de compras, además de contar con un formulario para registrar inventario.

## Requisitos Previos

- **Node.js** instalado en tu sistema operativo.
- La **API del Backend** debe estar ejecutándose de forma simultánea (idealmente en el puerto `4005`).

## Instalación de Dependencias

Abre tu terminal en el directorio del frontend e instala las librerías necesarias ejecutando:

```bash
npm install
```

*(Esto preparará el entorno de `react`, dependencias de tipos para TypeScript y el ecosistema de configuración de ESLint y Vite).*

## Configuración del Entorno (.env)

El proyecto requiere conocer la ruta exacta donde vive el servidor backend. Crea un archivo `.env` en la raíz de esta carpeta y agrega la siguiente línea:

```env
VITE_API_URL=http://localhost:4005/api
```

> **Nota:** En Vite, cualquier variable de entorno expuesta al navegador web debe llevar obligatoriamente el prefijo `VITE_`.

## Puesta en Marcha

Una vez que tengas el entorno configurado y el servidor del backend corriendo de fondo, levanta la interfaz gráfica mediante:

```bash
npm run dev
```

Esto habilitará el entorno de desarrollo y te proporcionará una URL local (generalmente `http://localhost:5173`). Abre ese enlace en tu navegador.

## Características Principales

1. **Lectura de Datos:** Mediante llamadas HTTP, se alimenta el listado del catálogo principal consumiendo el endpoint configurado en tus variables de entorno. 
2. **Creación de Entradas:** Un componente dedicado al formulario recopila la información, realiza una pre-validación del lado del cliente (evitando enviar precios negativos o campos en blanco) y hace un POST a la base de datos.
3. **Sincronización:** Una vez añadida una guitarra nueva exitosamente, el catálogo se actualiza automáticamente.
4. **Carrito de Compras:** Continúa con su lógica nativa de guardado en la memoria local del navegador (`localStorage`).

## Comandos Disponibles

- `npm run dev` → Inicia el servidor de desarrollo local.
- `npm run build` → Compila el código TypeScript y genera los archivos estáticos de producción.
- `npm run lint` → Ejecuta reglas de revisión de código para mantener la sintaxis limpia.
- `npm run preview` → Permite pre-visualizar cómo lucirá el proyecto una vez construido.