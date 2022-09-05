const express = require('express');
const server = express();
const Client = require('pg').Pool;
const client = new Client({
    user: "postgres",
    password: "1234",
    host: "127.0.0.1",
    port: 5432,
    database: "papillio"
})

server.use(express.json())

server.listen(7000, () => {
    console.log("Server online!");
})


server.get('/produtos', async (req, res) => {
    try{
        await client.connect()
        const result = await client.query("select * from produto")
        return res.status(200).send(result.rows)
    } catch(err) {
        return res.status(400).send(err);
    } 
})

server.get('/', (req, res) => {
    return res.json({message: 'Rolou'})
})

