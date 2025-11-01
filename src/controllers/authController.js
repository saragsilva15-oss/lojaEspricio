const {clienteModel}= require("../models/clienteModel");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
const { Result } = require("tedious/lib/token/helpers");

const authController = {
    clienteLogin: async (req, res) => {
        try {
            const {emailClente, senhaCliente}=req.body;
            if(emailClente==undefined || senhaCliente==undefined){

                return res.status(400).json({erro: "Email e senhas obrigatórios"});
            }
            const result =await clienteModel.buscarEmail(emailClente);

        if(result.length==0){
            return res.status(401).json({erro: "Email não encontrado!"});
        }
        const cliente = result[0];

        const senhaValida = await bcrypt.compare(senhaCliente, cliente.senhaCliente);
        if (!senhaValida){
            return res.status(401).json({erro: "Credenciais invalidas!"});

        }
        const payLoad={
            idCliente: cliente.idCliente,
            nomeCliente:cliente.nomeCliente,
            tipoUsuario: 'Cliente'
        };
        const token =jwt.sign(payLoad, process.env.JWT_SECRET, {

                expiresIn: process.env.JWT_EXPIRES_IN
          });
          res.status(200).json({message:"Logado com sucesso!", token});
          
        } catch (error) {
            console.error("Erro no login do cliente", error);
            return res.status(500).json({erro:"Erro no servidor ao realizar login do cliente"});
        }
        
    }
};

module.exports ={authController};