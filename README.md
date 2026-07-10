# Romina S.A. — eCommerce (React + Firebase)

Tienda online de moda desarrollada con React, Firebase (Authentication + Firestore) e
ImgBB para el hosting de imágenes. Incluye un panel de administración **oculto**
(sin ningún enlace visible en el sitio) para gestionar el catálogo de productos.

## 🚀 Tecnologías

- **React 19** + **Vite**
- **React Router DOM** — ruteo y rutas protegidas
- **Firebase Authentication** — login del administrador
- **Firebase Firestore** — base de datos del catálogo de productos
- **ImgBB API** — hosting de las imágenes que sube el admin (gratis, sin tarjeta)

## ✨ Funcionalidades

- Catálogo público con detalle de producto y carrito de compras.
- **Panel de administración oculto**: no hay ningún botón ni link visible en el
  sitio que lleve a él. Solo es accesible entrando directamente a la URL `/login`.
- CRUD completo de productos desde el panel: alta, edición y baja con confirmación.
- **Carga de imágenes por archivo**: al agregar/editar un producto, el admin
  selecciona una imagen desde su computadora (no pega una URL). La imagen se sube
  automáticamente a ImgBB y la URL resultante se guarda en Firestore.

## 📁 Estructura relevante

```
src/
├── firebase/
│   └── firebase.js         # inicialización de Firebase (Auth + Firestore)
├── utils/
│   └── uploadImage.js      # sube un archivo a ImgBB y devuelve la URL pública
├── context/
│   ├── AuthContext.jsx     # estado de sesión (login/logout, sin registro público)
│   └── CartContext.jsx     # carrito de compras
├── components/
│   └── PrivateRoute/       # protege la ruta /admin
└── pages/
    ├── Login.jsx           # única puerta de entrada (ruta oculta /login)
    └── Admin.jsx           # panel de administración (ruta oculta /admin)
```

## ⚙️ Instalación y configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Variables de entorno

Copiá `.env.example` a `.env`:

```bash
cp .env.example .env
```

Completá las credenciales de Firebase (Consola de Firebase → ⚙️ Configuración del
proyecto → "Tus apps" → tu app web) y tu API key de ImgBB:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...

VITE_IMGBB_API_KEY=...
```

**Cómo conseguir la API key de ImgBB (gratis, sin tarjeta):**
1. Entrá a https://api.imgbb.com/ e iniciá sesión (podés usar tu cuenta de Google).
2. Vas a ver tu API key directamente en esa página. Copiala al `.env`.

> ⚠️ El archivo `.env` está en `.gitignore` y nunca debe subirse al repositorio.

### 3. Habilitar servicios en Firebase

1. **Authentication** → pestaña "Sign-in method" → habilitá **Email/contraseña**.
2. **Firestore Database** → creá la base de datos (modo de prueba está bien para
   desarrollo). No hace falta crear la colección `productos` a mano: se crea sola
   la primera vez que agregás un producto desde el panel.

### 4. Crear el usuario administrador

Como el panel es oculto y **no tiene registro público** (por seguridad), el
usuario admin se crea manualmente:

1. Consola de Firebase → **Authentication** → pestaña **Users** → **Add user**.
2. Cargá el email y la contraseña que vas a usar para entrar a `/login`.

### 5. Correr el proyecto

```bash
npm run dev
```

## 🔐 Acceso al panel de administración

No hay ningún botón visible en el sitio. Para entrar:

1. Andá manualmente a `http://localhost:5173/login`
2. Ingresá con el usuario que creaste en el paso anterior.
3. Una vez logueado, te redirige a `/admin`, donde podés gestionar el catálogo.

Si intentás entrar a `/admin` sin haber iniciado sesión, te redirige automáticamente
a `/login`.

## 📦 Cargar productos

La tienda lee el catálogo desde Firestore (colección `productos`), que arranca
vacía. Cargá tus productos desde el panel `/admin`: completá los datos y subí la
imagen desde tu computadora (se sube automáticamente a ImgBB).

## 📜 Scripts disponibles

| Comando           | Descripción                                      |
|--------------------|--------------------------------------------------|
| `npm run dev`      | Servidor de desarrollo con hot reload            |
| `npm run build`    | Build de producción en `/dist`                   |
| `npm run preview`  | Sirve localmente el build de producción          |
| `npm run lint`     | Corre ESLint sobre todo el proyecto              |

---

Proyecto desarrollado en el marco de **Talento Lab**.
