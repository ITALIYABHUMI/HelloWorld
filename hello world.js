
const express = require('express'); 
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log request timestamps and method
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} - ${req.url}`);
  next();
});

// Middleware to validate the 'name' and 'age' parameters
app.use((req, res, next) => {
  const { name, age } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Invalid name' });
  }

  if (isNaN(age) || age < 0 || age > 150) {
    return res.status(400).json({ error: 'Invalid age' });
  }

  next();
});

// POST endpoint to create a new user
app.post('/users', (req, res) => {
  const { name, age } = req.body;
  const userId = Date.now(); // Generate a unique user ID

  // Simulate a database connection
  const users = [
    // Sample user data
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 28 },
    { id: 3, name: 'Jane', age: 26 },
  ];

  // Check if the user already exists
  const existingUser = users.find((user) => user.name === name);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Add the new user to the database
  users.push({ id: userId, name, age });

  res.status(201).json({ id: userId, name, age });
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
