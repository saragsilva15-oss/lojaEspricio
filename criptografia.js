const bcrypt = require('bcrypt');

let senha = 'senha-123';

const saltRounds= 10;
const senhaCriptografada = bcrypt.hashSync(senha, saltRounds);
console.log('Senha original', senha);
console.log('Senha criptografada', senhaCriptografada);

const senhaIncorreta= 'senha';
const senhaValida= bcrypt.compareSync(senhaIncorreta, senhaCriptografada);

if(senhaValida){
    console.log('Senha valida!');
}else{
    console.log('Senha incorreta!');
}