const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const saboresPath = path.join(__dirname, '../data/sabores.json');

// Função para carregar sabores do arquivo JSON
const getSabores = () => {
  const data = fs.readFileSync(saboresPath);
  return JSON.parse(data);
};

// Função para salvar sabores no arquivo JSON
const saveSabores = (sabores) => {
  fs.writeFileSync(saboresPath, JSON.stringify(sabores, null, 2));
};

// Listar todos os sabores
router.get('/', (req, res) => {
  const sabores = getSabores();
  res.json(sabores);
});

// Criar um novo sabor
router.post('/', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  const sabores = getSabores();
  const novoSabor = {
    id: sabores.length > 0 ? sabores[sabores.length - 1].id + 1 : 1,
    nome,
    preco,
  };

  sabores.push(novoSabor);
  saveSabores(sabores);

  res.status(201).json(novoSabor);
});

// Obter um sabor pelo ID
router.get('/:id', (req, res) => {
  const sabores = getSabores();
  const sabor = sabores.find((s) => s.id === parseInt(req.params.id));
  if (sabor) {
    res.json(sabor);
  } else {
    res.status(404).json({ error: 'Sabor não encontrado' });
  }
});

// Excluir um sabor
router.delete('/:id', (req, res) => {
  const sabores = getSabores();
  const index = sabores.findIndex((s) => s.id === parseInt(req.params.id));
  if (index !== -1) {
    const [saborRemovido] = sabores.splice(index, 1);
    saveSabores(sabores);
    res.json(saborRemovido);
  } else {
    res.status(404).json({ error: 'Sabor não encontrado' });
  }
});

module.exports = router;
