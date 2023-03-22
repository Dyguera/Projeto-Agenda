import 'core-js/stable'; 
import 'regenerator-runtime'

import Login from './modulos/Login'

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

login.init();
cadastro.init();
// Para iniciar o weback é npm run dev

