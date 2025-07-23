# 📚 Quotes Scraper API Web

**[ES] API REST para obtener, almacenar y consultar frases célebres desde un sitio web mediante scraping automatizado.**  
**[EN] REST API to fetch, store, and query famous quotes from a website using automated web scraping.**

---

## 🧪 Cómo ejecutar el proyecto / How to Run the Project

### 🔧 Requisitos previos / Prerequisites

- Tener [Docker](https://www.docker.com/products/docker-desktop) instalado
- Puerto **3000** y **3307** libres en tu sistema

---

### 🚀 Ejecutar con Docker / Run with Docker

```bash
git clone https://github.com/Samuelalejo18/quotes-scraper-api-web.git
cd quotes-scraper-api-web/Backend-api


### 🚀 Las tablas y la base de datos se crea al inicar la aplicacion, de igual forma se encuentra el script de la base de datos

# Construir y levantar contenedores
docker-compose up --build


## 💻 Requisitos Técnicos / Technical Requirements

- ✅ **Lenguaje**: JavaScript (Node.js)
- ✅ **Scraping**: Puppeteer
- ✅ **API REST**: Express
- ✅ **Base de datos local**: MySQL (contenedorizado)
- ✅ **Contenedores**: Docker + Docker Compose
- ✅ **Dependencias definidas**: `package.json`
- ✅ **Sin servicios cloud externos**
- ✅ **Instrucciones Linux y ejecución por consola**

---

## 🌍 Tecnologías utilizadas / Technologies Used

- Node.js + Express  
- Puppeteer  
- MySQL  
- Docker + Docker Compose  
- dotenv  
- Nodemon (entorno de desarrollo)  

---

## 📁 Estructura del Proyecto / Project Structure
Backend-api/
├── src/
│ ├── controllers/ # Controladores de endpoints
│ ├── database/ # Conexión MySQL
│ ├── models/ # Creación de tablas
│ ├── routes/ # Rutas HTTP
│ ├── service/ # logica de consultas para traer la informacion de la base de datos
│ │ └── scraping/ # Lógica de scraping
│ ├── app.js # App condiguracion de la aplicacion con los middlewares
│ └── index.js # entrada de la apliacaion
├── .env # Variables de entorno
├── Dockerfile # Imagen del backend
├── docker-compose.yml # Orquestación Docker
├── package.json # Dependencias Node.js
└── README.md



## Comandos linux

# Verificar si MySQL está corriendo
sudo systemctl status mysql

# Levantar la base de datos
sudo systemctl start mysql

# Verificar puertos en uso (puerto 3306 por defecto para MySQL)
sudo lsof -i :3306

# Ejecutar scraping desde consola 
# Obtener todas las citas
curl http://localhost:3000/quotes

# Filtrar por autor
curl "http://localhost:3000/quotes?author=Albert"

# Filtrar por etiqueta
curl "http://localhost:3000/quotes?tag=inspirational"

#Filtrar por contenido de la citad
curl "http://localhost:3000/quotes?search=The world as we have created it is a process of our thinking "

# Listar autores
curl http://localhost:3000/authors

# Listar sola las citas
curl http://localhost:3000/quotes/only

#Listas solo las etiquetas 

curl http://localhost:3000/tags


