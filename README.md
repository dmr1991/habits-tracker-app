Title: Habits Tracker

Description: 
In this Application, users can add, delete, and view habits that they want to implement in their lives. The purpose is to track how often he User completes the activities in order to create long lasting habits.
Technologies: Next.js, Redux, Express, MongoDB.
Currently, the UI list is static, as it is phase 2. To retrieve the habits registered in the database, they should be displayed using Redux Toolkit.

Requirements:
- Node.js
- MongoDB
- Express.js
- Next.js
- Redux
- Redux Dev Toolkit extension for Google Chrome

Instructions:

Clone this repository: git clone https://github.com/dmr1991/habits-tracker-app.git

Install dependencies npm install
Start the server: npm run dev
Server is available at http://localhost:3000

Updates to the database can be done via APIs in the backend:
Endpoints:

Create a Habit

URL: /habits
Method: POST
Description: Creates a new habit.
Request Body:
{ "title": "Example habit", "description": "Habit description" }
Response (201):
{ "_id": "habit_id", "title": "Example habit", "description": "Habit description" }

Get All Habits

URL: /habits
Method: GET
Description: Retrieves all registered habits.
Response (200):
[ { "_id": "habit_id", 
"title": "Example habit", 
"description": "Habit description" },
{ "_id": "habit_id_2", 
"title": "Another habit", 
"description": "Another habit description" } ]

Update a Habit by ID

URL: /habits/:id
Method: PUT
Description: Updates a habit by ID.
Request Body:
{ "title": "Updated habit", "description": "New description" }
Response (200):
{ "_id": "habit_id", "title": "Updated habit", "description": "New description" }

Delete a Habit by ID

URL: /habits/:id
Method: DELETE
Description: Deletes a habit by ID.
Response (200):
{ "message": "Habit deleted" }
