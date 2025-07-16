# Tableros-Tablones

Es una aplicación para practicar Angular, Typescript, NodeJS, Express y MongoDB.

## Descripción

La idea es simular la web de un negocio de maderas. Para ello, tendremos una web de acceso público, y contenido de acceso con autorización.

Tendremos 3 perfiles:

* Administrador: Tendrá acceso a todo el contenido de la web y la gestión de usuarios.
* Empleado: Tendrá acceso a todo el contenido de la web y la gestión de sus propios productos (compra a proveedores, venta a clientes y gestión de stock).
* Cliente: Tendrá acceso a todo el contenido de la web y la compra de productos.

Además, crearemos un dashboard con gráficos para ver el estado del negocio.

## Evoluvión del proyecto

* 01: Planificar estructura del proyecto.
  * 01.1: Home
  * 01.2: Login
  * 01.3: Registro
  * 01.4: Usuarios
  * 01.5: Proveedores
  * 01.6: Productos
  * 01.7: Ventas
  * 01.8: Compras a proveedores
  * 01.9: Dashboard
* 02: Crear la página Home.

## Funcionamiento

Se podrá acceder a la web y ver los distintos productos de los que se dispone.

Para poder realizar compras se deberá estar logueado, en caso contrario se redirigirá a la página de login. El carrito de compras tendrá un listado de los productos que se han seleccionado para comprar.
El registro creará un usuario en Firebase, y el login obtendrá un token de acceso que deberemos verificar en el servidor. El servidor devolverá un token JWT que se usara para autenticar a los usuarios. Además devolverá información del usuario para tener a mano información relevante para el aceso a las distintas rutas.

Los clientes además tendran acceso a su perfil por si necesitan modificar sus datos personales y ver un hgistorial de sus compras.

Los empleados tendrán acceso a su perfil, CRUD de proveedores, CRUD de productos, ventas de productos, compras a proveedores y un dashboard con gráficos para ver el estado del negocio.

Los administradores tendrán acceso a todo el contenido disponible para los empleados y la gestión de usuarios.
