import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  // Use REACT_APP_API_URL if set, otherwise fallback
  const API_BASE_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');
  console.log('API_BASE_URL:', API_BASE_URL);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, newTodo);
      setTodos([response.data, ...todos]);
      setNewTodo({ title: '', description: '' });
      setError('');
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id, completed) => {
    try {
      const todo = todos.find(t => t._id === id);
      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, {
        ...todo,
        completed: !completed
      });
      setTodos(todos.map(t => t._id === id ? response.data : t));
      setError('');
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  // Start editing
  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditForm({ title: todo.title, description: todo.description || '' });
  };

  // Save edit
  const saveEdit = async (id) => {
    try {
      const todo = todos.find(t => t._id === id);
      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, {
        ...todo,
        title: editForm.title,
        description: editForm.description
      });
      setTodos(todos.map(t => t._id === id ? response.data : t));
      setEditingId(null);
      setEditForm({ title: '', description: '' });
      setError('');
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '' });
  };

  return (
    <div className="container">
      <div className="todo-app">
        <div className="todo-header">
          <h1>✨ Todo List</h1>
          <p>Organize your tasks efficiently</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="todo-input"
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="todo-input"
          />
          <button type="submit" className="todo-button">
            Add Todo
          </button>
        </form>

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                {editingId === todo._id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="edit-input"
                      placeholder="Todo title"
                    />
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="edit-input"
                      placeholder="Description"
                    />
                    <div className="edit-actions">
                      <button
                        onClick={() => saveEdit(todo._id)}
                        className="edit-save-btn"
                        disabled={!editForm.title.trim()}
                      >
                        Save
                      </button>
                      <button onClick={cancelEdit} className="edit-cancel-btn">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo._id, todo.completed)}
                      className="todo-checkbox"
                    />
                    <div className="todo-content">
                      <div className="todo-title">{todo.title}</div>
                      {todo.description && (
                        <div className="todo-description">{todo.description}</div>
                      )}
                    </div>
                    <div className="todo-actions">
                      <button
                        onClick={() => startEdit(todo)}
                        className="todo-edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="todo-delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {!loading && todos.length === 0 && (
          <div className="loading">No todos yet. Add one above!</div>
        )}
      </div>
    </div>
  );
}

export default App; 