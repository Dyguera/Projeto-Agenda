// Vou criar as sessoes aqui
// Lembrando que são informações que sairão se eu atualizar a página

/*exports.paginaInicial = (req, res) => {
   // req.session.usuario = { nome:'Rodrigo', logado: true} // Isso ficará salvo por 7 dias graças ao maxAge do sessionOptions
   req.flash('info', 'Mensagem da info');
   req.flash('error', 'Mensagem de erro');
   req.flash('success', 'Mensagem de sucesso');
  

res.render('index', { 
  titulo: "Um titulo dentro do render no HomeController",  //Estamos injetando dados
  numeros: [1,2,3,4,5]
});
    return;
  };

  exports.trataPost = (req, res) => {
    res.send(req.body);
    return;
  };
*/
  
 
const Contato = require('../models/contatoModel');
exports.index = async(req, res) => {
  const contatos = await Contato.buscaContatos();
  res.render('index', { contatos:contatos });
};
