# API RESTful con CRUD y Capa de Servicios

**Centro de e-Learning UTN.BA**  
*Curso de Backend Developer - Trabajo Práctico Final*

---

## 📌 Descripción del Proyecto

API RESTful modular y escalable construida con **Node.js**, **Express** y **MongoDB (Mongoose)**. El sistema gestiona un catálogo de productos y sus respectivas categorías aplicando el patrón de diseño arquitectónico de **Separación de Responsabilidades en Capas**:
- **Rutas (`routes/`):** Definición de endpoints HTTP.
- **Controladores (`controllers/`):** Manejo de solicitudes (`req`), delegación a la capa de servicios y respuestas estructuradas (`res`) con códigos de estado HTTP estándar.
- **Capa de Servicios (`services/`):** Contenedor exclusivo de la lógica de negocio y llamadas directas al ODM Mongoose.
- **Modelos (`models/`):** Definición de esquemas y validaciones de MongoDB, incluyendo la referencia relacional entre colecciones mediante `populate`.

---

## 🗄️ Esquema de la Base de Datos

El sistema modela dos colecciones relacionadas dentro de MongoDB:

### 1. Colección `categories` (Categorías)
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `nombre` | String | Sí | Nombre identificatorio de la categoría (con trim) |
| `descripcion` | String | No | Detalle o alcance de la categoría |
| `createdAt` | Date | Automático | Fecha de creación del registro |
| `updatedAt` | Date | Automático | Fecha de última actualización |

### 2. Colección `products` (Productos)
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `nombre` | String | Sí | Nombre del producto |
| `descripcion` | String | No | Especificaciones o detalle del producto |
| `precio` | Number | Sí | Valor monetario (mínimo 0) |
| `stock` | Number | No (Default: 0) | Unidades disponibles en inventario |
| `categoria` | ObjectId (`ref: 'Category'`) | Sí | Referencia foránea a la colección `categories` |
| `createdAt` | Date | Automático | Fecha de creación del registro |
| `updatedAt` | Date | Automático | Fecha de última actualización |

---

## 🛠️ Tecnologías Utilizadas

- **JavaScript (ES Modules - `type: "module"`):** Estándar moderno de módulos `import`/`export`.
- **Node.js:** Entorno de ejecución en el servidor.
- **Express.js:** Framework minimalista para la gestión de rutas y middleware.
- **MongoDB & Mongoose:** Base de datos documental NoSQL y modelado de datos ODM.
- **CORS:** Middleware para habilitar el intercambio de recursos de origen cruzado.
- **dotenv:** Gestión y protección de variables de entorno sensibles.

---

## 🚀 Instrucciones de Instalación y Ejecución

### Requisitos Previos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) corriendo localmente en el puerto `27017` o una instancia activa en MongoDB Atlas.

### Pasos para levantar el proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_ESTE_REPOSITORIO>
   cd <NOMBRE_DE_LA_CARPETA>
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   Crear un archivo `.env` en la raíz del proyecto tomando como plantilla el archivo `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *Contenido de referencia para entorno local:*
   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/tp_backend
   ```

4. **Ejecutar el servidor:**
   - Modo producción / estándar:
     ```bash
     npm start
     ```
   - El servidor quedará escuchando en: `http://localhost:3000`

---

## 📡 Listado de Endpoints y Ejemplos de Datos Mock (JSON)

### 📂 Categorías (`/api/categories`)

#### 1. Obtener todas las categorías
- **Método:** `GET`
- **Ruta:** `http://localhost:3000/api/categories`
- **Código de éxito:** `200 OK`
- **Ejemplo de Respuesta:**
  ```json
  [
    {
      "_id": "6aeb53c022b76654a8f1cf44",
      "nombre": "Tecnología",
      "descripcion": "Dispositivos electrónicos y accesorios",
      "createdAt": "2026-11-04T15:48:16.176Z",
      "updatedAt": "2026-11-04T15:48:16.176Z"
    }
  ]
  ```

#### 2. Crear una categoría
- **Método:** `POST`
- **Ruta:** `http://localhost:3000/api/categories`
- **Código de éxito:** `201 Created`
- **Headers:** `Content-Type: application/json`
- **Payload Mock (Body):**
  ```json
  {
    "nombre": "Tecnología",
    "descripcion": "Dispositivos electrónicos y accesorios"
  }
  ```

#### 3. Eliminar una categoría
- **Método:** `DELETE`
- **Ruta:** `http://localhost:3000/api/categories/:id`
- **Código de éxito:** `200 OK`
- **Ejemplo de Respuesta:**
  ```json
  {
    "message": "Categoría eliminada con éxito"
  }
  ```

---

### 📦 Productos (`/api/products`)

#### 1. Listar todos los productos (con `populate` de categoría)
- **Método:** `GET`
- **Ruta:** `http://localhost:3000/api/products`
- **Código de éxito:** `200 OK`
- **Ejemplo de Respuesta (Populate activado):**
  ```json
  [
    {
      "_id": "6aeb541222b76654a8f1cf45",
      "nombre": "Auriculares Bluetooth",
      "descripcion": "Cancelación de ruido activa",
      "precio": 45000,
      "stock": 15,
      "categoria": {
        "_id": "6aeb53c022b76654a8f1cf44",
        "nombre": "Tecnología",
        "descripcion": "Dispositivos electrónicos y accesorios",
        "createdAt": "2026-11-04T15:48:16.176Z",
        "updatedAt": "2026-11-04T15:48:16.176Z"
      },
      "createdAt": "2026-11-04T15:49:38.968Z",
      "updatedAt": "2026-11-04T15:49:38.968Z"
    }
  ]
  ```

#### 2. Obtener un producto por ID
- **Método:** `GET`
- **Ruta:** `http://localhost:3000/api/products/:id`
- **Código de éxito:** `200 OK`

#### 3. Crear un nuevo producto
- **Método:** `POST`
- **Ruta:** `http://localhost:3000/api/products`
- **Código de éxito:** `201 Created`
- **Headers:** `Content-Type: application/json`
- **Payload Mock (Body):**
  ```json
  {
    "nombre": "Auriculares Bluetooth",
    "descripcion": "Cancelación de ruido activa",
    "precio": 45000,
    "stock": 15,
    "categoria": "6aeb53c022b76654a8f1cf44"
  }
  ```

#### 4. Actualizar un producto
- **Método:** `PUT`
- **Ruta:** `http://localhost:3000/api/products/:id`
- **Código de éxito:** `200 OK`
- **Headers:** `Content-Type: application/json`
- **Payload Mock (Body):**
  ```json
  {
    "precio": 42000,
    "stock": 20
  }
  ```

#### 5. Eliminar un producto
- **Método:** `DELETE`
- **Ruta:** `http://localhost:3000/api/products/:id`
- **Código de éxito:** `200 OK`
- **Ejemplo de Respuesta:**
  ```json
  {
    "message": "Producto eliminado con éxito"
  }
  ```

---

## ⚡ Funcionalidades Implementadas

- **Operaciones CRUD completas:** Implementadas sobre la entidad Productos (Crear, Leer todos, Leer por ID, Actualizar y Eliminar).
- **Operaciones sobre Categorías:** Métodos implementados para creación, listado y borrado.
- **Arquitectura en Capas:** Desacople absoluto entre rutas, controladores, servicios y modelos de datos.
- **Relaciones NoSQL y Populate:** Relación por referencia `ObjectId` entre productos y categorías con población de campos en lectura.
- **Manejo uniforme de estados HTTP:** Devolución de códigos semánticos (`200`, `201`, `400`, `404`, `500`) y control de excepciones mediante bloques `try/catch`.
- **CORS y Variables de Entorno:** Integración de middleware para orígenes cruzados y aislamiento de configuración sensible vía `.env`.

---

## 🔮 Funcionalidades a Futuro

- **Autenticación con JWT:** Emisión de tokens de acceso para usuarios autenticados.
- **Seguridad en contraseñas:** Hasheo mediante `bcrypt` implementando hooks `pre-save` en Mongoose.
- **Protección de rutas:** Middleware `verifyToken` para restringir operaciones de escritura, edición y borrado (POST, PUT, DELETE).
- **Paginación y Filtros:** Implementación de consultas paginadas (`limit`, `page`) y búsqueda por texto o rango de precios.