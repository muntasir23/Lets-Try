const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();

// Serve the db.json file on /books route
const router = jsonServer.router(path.join(__dirname, 'db.json'));

// Middlewares
app.use(express.json());
app.use('/books', router);

// Set the port for the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
