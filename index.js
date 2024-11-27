const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menuRoutes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/menu', menuRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Microsserviço de Menu rodando na porta ${PORT}`);
});
