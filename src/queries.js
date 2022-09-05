const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "127.0.0.1",
    port: 5432,
    database: "papillio"
})

const getProtudos = (request, response) => {
  pool.query('SELECT * FROM produto ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProdutoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM produto WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createProduto = (request, response) => {
  const { nome, cpf, email, senha } = request.body

  pool.query('INSERT INTO produto (nome, cpf, email, senha) VALUES ($1, $2, $3, $4)', [nome, cpf, email, senha], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Produto added with ID: ${results.insertId}`)
  })
}

const updateProduto = (request, response) => {
  const id = parseInt(request.params.id)
  const { nome, cpf, email, senha } = request.body

  pool.query(
    'UPDATE produto SET nome = $1, cpf = $2, email = $3, senha = $4 WHERE id = $5',
    [nome, cpf, email, senha, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Produto modified with ID: ${id}`)
    }
  )
}

const deleteProduto = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM produto WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Produto deleted with ID: ${id}`)
  })
}

module.exports = {
  getProtudos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
}