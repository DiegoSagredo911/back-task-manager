# Documentación para levantar un back-end Task Manager

## Requisitos previos

- Tener **Node.js** instalado min **v20.18.0**.
- Tener **npm** instalado min **10.8.2**.
- Tener acceso a una terminal o consola de comandos.

## 1. Clonar el repositorio

Primero, debes clonar el repositorio donde se encuentra el proyecto.

```bash
git clone <url_del_repositorio>
cd <nombre_del_repositorio>
```

## 2. Instalar dependencias

Una vez dentro del directorio del proyecto, instala las dependencias necesarias.

Si usas **npm**:

```bash
npm install
```

## 3. Configuración de variables de entorno

Para configurar las variables de entorno, debes crear un archivo `.env` en la raíz del proyecto. Este archivo debe contener las configuraciones necesarias para tu entorno, como las credenciales de la base de datos, el puerto de la aplicación, entre otras.

### Ejemplo de archivo `.env`

```env
# Puerto donde se levantará la aplicación
PORT=3001

# Configuración de la base de datos
MONGODB_URL= conexionde base de datos de mongo db

# Configuración de cors
CORS_ORIGINS = http://localhost:3000,http://localhost:3001 (separado por una ',')

```

> **Nota:** Asegúrate de reemplazar los valores con los adecuados para tu entorno.

## 4. Levantar la aplicación

Para levantar el proyecto en desarrollo, ejecuta el siguiente comando:

```bash
npm run start:dev
```

Esto iniciará el servidor de desarrollo de NestJS. Por defecto, la aplicación estará disponible en la siguiente URL:

```bash
http://localhost:3001
```

> **Nota:** Si deseas cambiar el puerto, puedes modificar la variable `PORT` en el archivo `.env`.

## 5. Documentación de la API

Una vez que la aplicación esté corriendo, puedes acceder a la documentación automática de la API, que será generada usando **Swagger** (si está configurado en el proyecto).

La documentación de la API estará disponible en la siguiente ruta:

```
http://localhost:3001/api/docs
```

En esta URL podrás ver los endpoints disponibles, los parámetros requeridos y las respuestas que la API devolverá.

## 6. Comandos adicionales

A continuación, algunos comandos útiles para trabajar con el proyecto:

- **Levantar la aplicación en producción**:

```bash
npm run start:prod
```

- **Compilar el proyecto para producción**:

```bash
npm run build
```

- **Ejecutar pruebas**:

```bash
npm run test
```

- **Ver pruebas en modo interactivo**:

```bash
npm run test:watch
```

## ¡Listo!

Con estos pasos deberías poder levantar el proyecto **NestJS** correctamente, configurar las variables de entorno y acceder a la documentación de la API
