const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 8080;

const client = new Client({
  user: 'postgres', 
  host: 'localhost',
  database: 'favorite',
  password: '12345',
  port: 5432,
});

client.connect();

app.use(express.json());


async function createTable() {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS quote (
        id SERIAL PRIMARY KEY,
        author VARCHAR(255),
        content TEXT
      )
    `);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  }
}

createTable();


app.get("/quotes", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM quote');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching quotes:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post("/quotes", async (req, res) => {
  try {
    const { author, content } = req.body;
    const result = await client.query('INSERT INTO quote (author, content) VALUES ($1, $2) RETURNING *', [author, content]);
    res.json({ msg: "Added", status: true, data: result.rows[0] });
  } catch (err) {
    console.error('Error adding quote:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
