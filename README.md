# Todo List Application

A full-stack todo list application built with React frontend, Node.js/Express backend, and MongoDB database.

## Features

- ✨ **Add, Edit, Delete** todos
- ✅ **Mark todos as complete/incomplete**
- 📝 **Optional descriptions** for each todo
- 🎨 **Modern, responsive UI** with beautiful animations
- 🔄 **Real-time updates** with MongoDB
- 📱 **Mobile-friendly** design

## Tech Stack

### Frontend
- **React** - UI framework
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with modern animations

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (Atlas or local)
- **Mongoose** - MongoDB ODM

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for containerized setup)
- **MongoDB Atlas** account (or use local MongoDB)

## Running with Docker Compose (Recommended)

This project is fully containerized. Docker Compose will run the backend, frontend, and MongoDB (or connect to MongoDB Atlas).

### 1. Configure MongoDB

- By default, the backend is set up to use a MongoDB Atlas connection string (see `docker-compose.yml`).
- **Update the `MONGODB_URI` in `docker-compose.yml`** to your own Atlas connection string for production use.
- If you want to use local MongoDB, change it to:
  ```
  MONGODB_URI=mongodb://mongodb:27017/todo-app
  ```

### 2. Build and Start All Services

```sh
# From the project root
# This will build and start backend, frontend, and MongoDB

docker-compose up --build
```

- Frontend: [http://localhost](http://localhost)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)

### 3. API URL Configuration

- The frontend is built with the API base URL set via Docker build args:
  - `REACT_APP_API_URL=http://localhost:5000/api`
- This is set in the `docker-compose.yml` under `frontend.build.args`.
- If you change the backend port or service name, update this value accordingly.

### 4. Stopping the Services

```sh
docker-compose down
```

---

## Running Locally (Without Docker)

1. **Install dependencies:**
   ```sh
   npm install
   cd client && npm install
   cd ..
   ```
2. **Set up MongoDB:**
   - Use MongoDB Atlas (recommended) or run MongoDB locally.
   - Create a `.env` file in the project root:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     NODE_ENV=development
     ```
3. **Start the backend:**
   ```sh
   npm run server
   ```
4. **Start the frontend:**
   ```sh
   cd client
   npm start
   ```
   The React app will run on [http://localhost:3000](http://localhost:3000) and proxy API requests to the backend.

---

## Project Structure

```
todo-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Component styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   ├── Dockerfile         # Frontend Dockerfile
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/
│   │   └── database.js    # MongoDB connection
│   ├── controllers/
│   │   └── todoController.js # Business logic
│   ├── middleware/
│   │   └── errorHandler.js # Error handling
│   ├── models/
│   │   └── Todo.js        # Todo schema
│   ├── routes/
│   │   └── todos.js       # API routes
│   └── index.js           # Express server
├── Dockerfile              # Backend Dockerfile
├── package.json            # Root package.json
├── docker-compose.yml      # Docker Compose file
└── README.md
```

---

## Environment Variables

- **Backend:**
  - `MONGODB_URI` - MongoDB connection string (Atlas or local)
  - `PORT` - Port for Express server (default: 5000)
  - `NODE_ENV` - Environment (production/development)
- **Frontend:**
  - `REACT_APP_API_URL` - API base URL (set via Docker build args in Compose)

---

## Troubleshooting

- **Frontend not fetching data in Docker Compose?**
  - Make sure you rebuilt the frontend image after changing `REACT_APP_API_URL`.
  - Check the browser console for `API_BASE_URL` log.
  - Ensure the backend is healthy and accessible at the expected URL.
- **MongoDB connection issues?**
  - Double-check your Atlas URI or local MongoDB setup.
  - If using Atlas, ensure your IP is whitelisted and credentials are correct.
- **Port conflicts?**
  - Make sure ports 80, 5000, and 27017 are not in use by other processes.
- **Container name conflicts?**
  - Remove old containers with `docker rm -f <container_name>` if needed.

---

## License

This project is licensed under the MIT License.

---

## Support

If you encounter any issues or have questions, please open an issue on the repository. 