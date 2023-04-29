const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static files
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use(favicon(path.join(__dirname, '../client', 'resources', 'favicon.ico')));

app.use('/resources', express.static(path.join(__dirname, '../client', 'resources')));

app.get('/', (_req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// 404 handling
app.use((_req, res) => {
  return res.status(404).send('Not found!');
});

// Global error handling
app.use((err, _req, res) => {
  console.log(err);
  return res.status(500).send(err);
});

console.log(`Listening on ${PORT}...`);
app.listen(PORT);
