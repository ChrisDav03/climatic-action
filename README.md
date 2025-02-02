# 📌 Proyecto Acción Climatica

### 🚀 Introducción
Este proyecto es una webapp que permite gestionar parcelas y actividades. Su arquitectura se basa en:

- **Backend:** NestJs Con Express
- **Base de Datos:** PostgreSQL
- **Frontend:** Next.js
- **Herramientas adicionales:** Docker, pgAdmin, JWT, etc.
### 🎯 Características
- ✔️ Autenticación con JWT
- ✔️ CRUD de usuarios y productos
- ✔️ Conexión a PostgreSQL con Docker
- ✔️ Frontend en React con Tailwind CSS
- ✔️ Despliegue automatizado con Docker Compose

### 🔧 Requisitos Previos
Antes de instalar el proyecto, asegúrate de tener instalado:

- Docker & Docker Compose 
- Git 
- Node.js & npm (para el frontend/backend) 

Para verificar la instalación, ejecuta:

```sh
docker --version
git --version
node --version
```
### 🛠 Instalación
Clona este repositorio y accede a la carpeta del proyecto:

```sh
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
```
Si necesitas instalar dependencias manualmente:

**📌 Backend**
```
cd Backend
npm install
```
**📌 Frontend**
```
cd frontend
npm install
```
### ▶️ Uso
**📍 Ejecutar con Docker Compose**
La forma más sencilla de ejecutar el proyecto es con Docker Compose:

```
docker-compose up --build
```
Esto iniciará:

Base de datos PostgreSQL en el puerto 5432
- pgAdmin en ```http://localhost```
- Backend API en ```http://localhost:5000```
- Frontend en ```http://localhost:3000```
- Para detenerlo:

```
docker-compose down
```
### ⚙️ Configuración
El backend usa variables de entorno. Puedes modificarlas en el archivo .env:

```
DATABASE_URL=postgresql://root:root@postgres:5432/mydb
JWT_SECRET=supersecreto
```
En docker-compose.yml, también puedes ajustar:

```yaml
services:
  postgres:
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_DB: mydb
```

### 🤝 Ejemplos Visuales

<img src="https://github.com/ChrisDav03/climatic-action/blob/master/imagenes/Screenshot%202025-02-02%20000750.png">
<img src="https://github.com/ChrisDav03/climatic-action/blob/master/imagenes/Screenshot%202025-02-02%20000824.png">
<img src="https://github.com/ChrisDav03/climatic-action/blob/master/imagenes/Screenshot%202025-02-02%20000843.png">
<img src="https://github.com/ChrisDav03/climatic-action/blob/master/imagenes/Screenshot%202025-02-02%20000857.png">
<img src="https://github.com/ChrisDav03/climatic-action/blob/master/imagenes/Screenshot%202025-02-02%20000912.png">

