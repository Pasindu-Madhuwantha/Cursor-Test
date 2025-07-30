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
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Set up MongoDB**
   
   **Option A: Local MongoDB**
   - Install MongoDB locally
   - Start MongoDB service
   - The app will connect to `mongodb://localhost:27017/todo-app`

   **Option B: MongoDB Atlas**
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Create a `.env` file in the root directory:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     PORT=5000
     NODE_ENV=development
     ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run server
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend**
   ```bash
   npm run client
   ```
   The React app will run on `http://localhost:3000`

3. **Or run both simultaneously**
   ```bash
   npm run dev
   ```

### Production Mode

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |
| GET | `/api/health` | Health check |

### Request/Response Examples

**Create Todo**
```json
POST /api/todos
{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs"
}
```

**Update Todo**
```json
PUT /api/todos/:id
{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs, butter",
  "completed": true
}
```

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
├── package.json           # Root package.json
└── README.md
```

## Features in Detail

### Frontend Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Changes reflect immediately without page refresh
- **Smooth Animations**: Modern CSS animations for better UX
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls

### Backend Features
- **RESTful API**: Clean, standard REST endpoints
- **MongoDB Integration**: Persistent data storage
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Cross-origin requests enabled
- **Environment Configuration**: Flexible configuration via environment variables

## Customization

### Styling
- Modify `client/src/index.css` for global styles
- Modify `client/src/App.css` for component-specific styles
- The app uses a purple gradient theme that can be easily changed

### Database Schema
The todo schema in `server/models/Todo.js` can be extended:
```javascript
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
  // Add more fields as needed
});
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your connection string
   - Verify network connectivity

2. **Port Already in Use**
   - Change the port in `.env` file
   - Kill processes using the port

3. **CORS Errors**
   - The backend has CORS enabled
   - Ensure the frontend is running on the correct port

4. **Module Not Found Errors**
   - Run `npm install` in both root and client directories
   - Clear node_modules and reinstall if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on the repository. 