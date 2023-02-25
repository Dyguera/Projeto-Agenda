const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require ('./src/controllers/loginController');

// Rotas da home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

// Rota Login e Cadastro
route.get ('/login/index', loginController.index);
route.post ('/login/register', loginController.register);

module.exports = route; 