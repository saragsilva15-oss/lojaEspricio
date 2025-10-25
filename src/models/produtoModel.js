// importar a conexão com o banco de dados e o tipos de dados SQL
const { sql, getConnection } = require("../config/db");

const produtoModel = {

    buscarTodos: async () => {
        try {

            const pool = await getConnection();

            let querySLQ = "SELECT * FROM Produtos";

            const result = await pool.request().query(querySLQ);

            return result.recordset;

        } catch (error) {

            console.error("erro ao buscar produtos:", error);
            throw error;

        }
    },

    buscarUM: async (idProduto) => {
        try {
            const pool =await getConnection();
            const querySLQ ='SELECT * FROM Produtos WHERE idProduto =@idProduto';

            const result = await pool.request()
            .input('idProduto', sql.UniqueIdentifier, idProduto)
            .query(querySLQ);

            return result.recordset;
        } catch (error) {
            console.error('Erro ao buscar o produto', error);
            throw error;
                }
        
    },

    inserirProduto: async (nomeProduto, precoProduto) => {
        try {

            const pool = await getConnection();

            let querySLQ = 'INSERT INTO Produtos (nomeProduto, precoProduto) VALUES(@nomeProduto, @precoProduto)';

            await pool.request().input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .query(querySLQ);


        } catch (error) {
            console.error('Erro ao inserir produto',error);
            throw error;
        }
    },
    atualizarProduto: async(idProduto, nomeProduto, precoProduto) =>{
        try {
            const pool=await getConnection();

            //Evitar SQL INJECTION
            const querySLQ =`
            UPDATE Produto
            SET nomeProduto =@nomeProduto,
            precoProduto = @precoProduto
            WHERE idProduto = @idProduto
            `
            await pool.request()
            .input('nomeProduto', sql.VarChar(100), nomeProduto)
            .input('precoProduto', sql.Decimal(10,2), precoProduto )
            .query(querySLQ);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }

        
    }
};

module.exports = { produtoModel };