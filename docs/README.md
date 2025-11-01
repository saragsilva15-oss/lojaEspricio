## API Reference
### Produtos
#### GET /produtos
-**Descrição**: Obtém uma lista de produtos
-**Parameters**:?nomeProduto="prudotoExemplo" obtém um filtro de produto buscado pelo nome 
-**Response**: Array de Produtos

#### POST /produtos
-**Descrição**: Cria um novo produto
-**Body**:
````
{
    "nomeProduto": "produtoExemplo
    "precoProduto":0.00
 }
 ````
 -**Response**:
 ````
 {
    "message":"Produto cadastrado com sucesso"
 }
 ````
 #### PUT /produtos/:idProduto
 -**Descrição**: Atualizar um produto já existente
 -**Body**:
 ````
 {
    "nomeProduto":"nomeExemplo"
    "precoProduto":"precoExemplo
}
 ````
#### DELETE /produtos/:idProduto
-**Descrição**: Exclui um produto
-**Body**:
````
{
    
}
