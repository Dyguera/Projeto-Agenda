require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conectando com a base de dados
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> { 
  console.log('conectei a base')
  app.emit('pronto')
})
.catch( e => console.log(e));

mongoose.set('strictQuery', true);
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
// const helmet = require('helmet');
const csrf = require('csurf')
const { middlewareGlobal, checkCsurfError, csrfMiddleware } = require('./src/middlewares/middlewares');


const sessionOptions = session({ 
  secret: "Coloque qualquer coisa aqui dentro do secret e leia a documentação",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }), // Aqui dentro precisamos mandar o cliente de conexão
  resave: false, // Coisas que a documentação pede para colocar
  saveUninitialized: false, //Coisas que a documentação pede para colocar
  cookie: { 
  maxAge: 1000* 60 * 60 *24 * 7, //Vai durar uma semana // Quanto tempo em milésimos de segundos isso vai durar
  httpOnly: true
}
});

app.use(sessionOptions);
app.use(flash());

// app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Nossos próprios middlewares

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsurfError);
app.use(csrfMiddleware);
app.use(routes);


app.on('pronto', ()=>{ 
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });

})



// Para segurança, vamos evitar que postem em meu nome usando tokens; 
// Vamos instalar npm i helmet npm csurf

// Lembrando que se eu instalei, preciso usar e fazemos isso no servidor;
// com require e depois use chamando a função;