# nodejs-auth-app

Este proyecto es una aplicación de autenticación de usuarios construida con Node.js y Express. Permite a los usuarios registrarse, iniciar sesión y gestionar su información.

## Estructura del Proyecto

```
nodejs-auth-app
├── src
│   ├── controllers
│   │   ├── authController.js      # Controlador para autenticación (registro e inicio de sesión)
│   │   └── userController.js      # Controlador para operaciones relacionadas con usuarios
│   ├── models
│   │   └── User.js                 # Modelo de usuario utilizando Mongoose
│   ├── routes
│   │   ├── authRoutes.js           # Rutas para autenticación
│   │   └── userRoutes.js           # Rutas para gestión de usuarios
│   ├── middlewares
│   │   └── authMiddleware.js       # Middleware para verificar autenticación
│   ├── config
│   │   └── db.js                   # Configuración de conexión a la base de datos
│   └── app.js                      # Punto de entrada de la aplicación
├── package.json                     # Configuración de npm y dependencias
├── .env                             # Variables de entorno
└── README.md                       # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd nodejs-auth-app
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
4. Configura las variables de entorno en el archivo `.env`.

## Uso

1. Inicia la aplicación:
   ```
   npm start
   ```
2. Accede a la API en `http://localhost:3000`.

## Funcionalidades

- **Registro de usuarios**: Permite a los nuevos usuarios crear una cuenta.
- **Inicio de sesión**: Permite a los usuarios registrados acceder a su cuenta.
- **Gestión de usuarios**: Los administradores pueden obtener información de usuarios y eliminar cuentas.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.