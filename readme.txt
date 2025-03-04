API de Gestión de Hábitos

Esta API permite gestionar hábitos: crear, leer, actualizar y eliminar hábitos.

Endpoints:

Crear un hábito

URL: /api/habits
Método: POST
Descripción: Crea un nuevo hábito.
Cuerpo de la solicitud: { "name": "Hábito de ejemplo", "description": "Descripción del hábito" }
Respuesta (201): { "_id": "id_del_hábito", "name": "Hábito de ejemplo", "description": "Descripción del hábito", "completed": false }
Obtener todos los hábitos

URL: /api/habits/:id
Método: PUT
Descripción: Actualiza un hábito por ID.
Cuerpo de la solicitud: { "name": "Hábito actualizado", "description": "Nueva descripción", "completed": true }
Respuesta (200): { "_id": "id_del_hábito", "name": "Hábito actualizado", "description": "Nueva descripción", "completed": true }
Eliminar un hábito por ID

URL: /api/habits/:id
Método: DELETE
Descripción: Elimina un hábito por ID.
Respuesta (200): { "message": "Hábito eliminado" }

Requisitos:

Node.js
MongoDB

Instrucciones:

Clona el repositorio: git clone https://github.com/dmr1991/habits-tracker-app.git

Instala las dependencias: npm install

Inicia el servidor: npm start

El servidor estará disponible en http://localhost:5000