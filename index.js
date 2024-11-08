const express = require('express');
const cors = require('cors');
const pool = require('./db.js');
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/clientes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao conectar no banco', error: error.message });
  }
});

app.post('/clientes', async (req, res) => {
  const { nome, cpf, telefone } = req.body;

  try {
    const consulta =
      'INSERT INTO clientes (nome, cpf, telefone) VALUES ($1, $2, $3)';

    await pool.query(consulta, [nome, cpf, telefone]);

    res.status(201).json({ message: 'Cliente cadastrado com sucesso' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao cadastrar Cliente', error: error.message });
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, telefone } = req.body;

  try {
    const consulta =
      'UPDATE clientes SET nome = $1, cpf = $2, telefone = $3 WHERE id = $4';

    await pool.query(consulta, [nome, cpf, telefone, id]);
    res.status(200).json({ message: 'Cliente atualizado com sucesso' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao atualizar Cliente', error: error.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const consulta = 'DELETE FROM clientes WHERE id = $1';

    await pool.query(consulta, [id]);
    res.status(200).json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao deletar Cliente', error: error.message });
  }
});

// Rota para obter todos os produtos
app.get('/produtos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao conectar no banco', error: error.message });
  }
});

// Rota para cadastrar um novo produto
app.post('/produtos', async (req, res) => {
  const { nome, preco } = req.body;

  try {
    const consulta = 'INSERT INTO produtos (nome, preco) VALUES ($1, $2)';

    await pool.query(consulta, [nome, preco]);

    res.status(201).json({ message: 'Produto cadastrado com sucesso' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao cadastrar Produto', error: error.message });
  }
});

// Rota para atualizar um produto
app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  try {
    const consulta = 'UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3';

    await pool.query(consulta, [nome, preco, id]);
    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao atualizar Produto', error: error.message });
  }
});

// Rota para deletar um produto
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const consulta = 'DELETE FROM produtos WHERE id = $1';

    await pool.query(consulta, [id]);
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao deletar Produto', error: error.message });
  }
});

// Rota para obter todas as vendas
app.get('/vendas', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM vendas');
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao conectar no banco', error: error.message });
  }
});

// Rota para cadastrar uma nova venda
app.post('/vendas', async (req, res) => {
  const { id_cliente, id_produto, quantidade } = req.body;

  try {
    const consulta =
      'INSERT INTO vendas (id_cliente, id_produto, quantidade) VALUES ($1, $2, $3)';

    await pool.query(consulta, [id_cliente, id_produto, quantidade]);

    res.status(201).json({ message: 'Venda cadastrada com sucesso' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao cadastrar Venda', error: error.message });
  }
});

// Rota para atualizar uma venda
app.put('/vendas/:id', async (req, res) => {
  const { id } = req.params;
  const { id_cliente, id_produto, quantidade } = req.body;

  try {
    const consulta =
      'UPDATE vendas SET id_cliente = $1, id_produto = $2, quantidade = $3 WHERE id = $4';

    await pool.query(consulta, [id_cliente, id_produto, quantidade, id]);
    res.status(200).json({ message: 'Venda atualizada com sucesso' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao atualizar Venda', error: error.message });
  }
});

// Rota para deletar uma venda
app.delete('/vendas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const consulta = 'DELETE FROM vendas WHERE id = $1';

    await pool.query(consulta, [id]);
    res.status(200).json({ message: 'Venda deletada com sucesso' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao deletar Venda', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log('API está no AR');
});
