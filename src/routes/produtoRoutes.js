const express = require("express");
const router = express.Router();
const { produtoController } = require("../controllers/produtoController");

//GET /produtos -> listar todos os produtos

router.get('/produtos', produtoController.listarProdutos);

//POST /produtos -> Criar um novo produto
router.post('/produtos/:IdProduto', produtoController.criarProduto);

router.put('/produtos', produtoController.atualizarProduto);
module.exports = { produtoRoutes: router };