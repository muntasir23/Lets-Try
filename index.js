const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

app.use('/books', router);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
