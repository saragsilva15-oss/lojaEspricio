const { default: message } = require("tedious/lib/message");
const { clienteModel } = require("../models/clienteModel");
const bcrypt = require('bcrypt');

const clienteController = {
    /*
    -------------------------
    Listar todos os clientes
    -------------------------
    */

    listarCliente: async (req, res) => {
        try {
            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes);

        } catch (error) {
            console.error("Erro ao listar clientes", error)
            res.status(500).json({ error: 'Erro ao buscar clientes' });
        }
    },

    /*
    ------------------------
    cadastrar clientes
    POST /Clientes
    BODY:
    {
        "nomeCliente":"nome",
        "cpfCliente":"cpf"
    }
    ------------------------
    */

    criarCliente: async(req, res)=>{
        try {
            const {nomeCliente, cpfCliente, emailCliente, senhaCliente} = req.body; //cliente ira ter que inserir 

            if (nomeCliente == undefined || cpfCliente == undefined || emailCliente==undefined || senhaCliente==undefined) {
                return res.status(400).json({erro :'Campos obrigatórios não preenchidos'}); // todos precisar ser definidos
            }

            const clientes = await clienteModel.buscarCpf(cpfCliente);

            if (clientes.length > 0) {
                return res.status(409).json({erro:'CPF já existe!'});
            }
            const saltRounds=10; // irá rodar 10 vezes para fazer a senha

            const senhaCriptografada =bcrypt.hashSync(senhaCliente, saltRounds);
            
            await clienteModel.inserirCliente(nomeCliente, cpfCliente, emailCliente, senhaCriptografada);
            res.status(201).json({message: 'Cliente cadastrado com sucesso'});

        } catch (error) {
            
            console.error('Erro ao cadastrar cliente', error);
            res.status(500).json({erro: 'Erro ao cadastrar cliente'});
        }
    }
}
module.exports = { clienteController };