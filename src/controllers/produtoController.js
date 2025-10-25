const { default: Message } = require("tedious/lib/message");
const { produtoModel } = require("../models/produtoModel");

const produtoController = {
    /*
    -------------------------------
     LISTAR TODOS OS PRODUTOS
     GET /produtos
    -------------------------------
     */
    listarProdutos: async (req, res) => {
        try {

            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);

        } catch (error) {
            console.error("erro ao listar produtos", error);
            res.status(500).json({ error: 'Erro ao buscar produtos.' });
        }
    },
    /*
   -------------------------------
    CRIAR UM NOVO PRODUTO
    POST /produtos
    BODY:
    {
        "nomeProduto:"nome",
        "precoProduto":0.00
    }
   -------------------------------
    */
    criarProduto: async (req, res) => {
        try {

            const { nomeProduto, precoProduto } = req.body;

            if (nomeProduto == undefined || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' });
            }
            await produtoModel.inserirProduto(nomeProduto, precoProduto);
            res.status(201).json({ Message: 'Produto cadastrado com sucesso' });

        } catch (error) {

            console.error('Erro ao cadastrar produto', error);
            res.status(500).json({ erro: 'Erro ao cadastrar produto.' });
        }

    },
    atualizarProduto: async(req, res)=>{
        try {
            const {idProduto} =req.params;
            const {nomeProduto, precoProduto}= req.body;
// validação de UUID(unico universalmente ID)
            if(idProduto.length !=36){
                return res.status(400).json({erro: 'id do produto invalido!'});
            }
            const produto =await produtoModel.buscarUM(idProduto);//busca pelo banco de dados

            if(!produto || produto.length !==1 ){
                return res.status(404).json({error:'Produto não encontrado'});
                
            }
            const produtoAtual = produto[0];
            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
            // verifica se existe e verifica se não esta vazio 
            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;
            //verifica se ja exiate um preco e se não esta vazio 

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);
            res.status(200).json({message:'Produto atualizado com sucesso!'});

        } catch (error) {
            console.erro('Erro ao atuaizar produto', error);
            res.status(500).json({erro: 'Erro interno no servidor ao atualizar produto!'});
        }

    }
}

module.exports = { produtoController };