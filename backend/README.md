# Servidor Node.js + Express

## Lógica

Iniciamos el servidor, al importar una instancia de dbClient, su constructor crea la conexión con la base de datos indicando a que colección debe conectarse.

En el app.js definimos a que archivo de rutas debe enlazarse en función de la ruta.

En el archivo de ruta importamos el controlador correspopndiente y definimos las rutas y métodos HTTP indicando a que función del controlador enlaza.

En el controlador importamos el modelo correspondiente y realizamos su correspondiente logica.

En el modelo, importamos el schema correspondiente y hacemos la llamada al método que corresponde en cada caso.

El schema define el esquema de la base de datos, indicando tipo de datos, validaciones, etc.
