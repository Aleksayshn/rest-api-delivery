const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const { authRouter, usersRouter, categoriesRouter, productsRouter } = require('./routes/api');

app.use(logger(formatsLogger));
const corsOptions = {
  origin: 'http://localhost:5173', https://aleksayshn.github.io/DeliveryApp/, https://aleksayshn.github.io/wheel-whisper-win/
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRouter)
app.use('/api/user', usersRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/products', productsRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
