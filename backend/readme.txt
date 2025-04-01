
API de Gestión de Hábitos

Esta API permite gestionar hábitos: crear, leer, actualizar y eliminar hábitos.

Endpoints:

Crear un hábito

URL: /habits
Método: POST
Descripción: Crea un nuevo hábito.
Cuerpo de la solicitud:
{ "title": "Hábito de ejemplo", "description": "Descripción del hábito" }
Respuesta (201):
{ "_id": "id_del_hábito", "title": "Hábito de ejemplo", "description": "Descripción del hábito" }

Obtener todos los hábitos

URL: /habits
Método: GET
Descripción: Obtiene todos los hábitos registrados.
Respuesta (200):
[ { "_id": "id_del_hábito", "title": "Hábito de ejemplo", "description": "Descripción del hábito" },
  { "_id": "id_del_hábito_2", "title": "Otro hábito", "description": "Descripción del otro hábito" } ]

Actualizar un hábito por ID

URL: /habits/:id
Método: PUT
Descripción: Actualiza un hábito por ID.
Cuerpo de la solicitud:
{ "title": "Hábito actualizado", "description": "Nueva descripción" }
Respuesta (200):
{ "_id": "id_del_hábito", "title": "Hábito actualizado", "description": "Nueva descripción" }

Eliminar un hábito por ID

URL: /habits/:id
Método: DELETE
Descripción: Elimina un hábito por ID.
Respuesta (200):
{ "message": "Hábito eliminado" }

Requisitos:

- Node.js
- MongoDB

Instrucciones:

1. Clona el repositorio: git clone https://github.com/dmr1991/habits-tracker-app.git
2. Instala las dependencias: npm install
3. Inicia el servidor: npm start
4. El servidor estará disponible en http://localhost:5000