import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());
app.use(cors());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud',
};

const pool = mysql.createPool(dbConfig);

app.get('/', async (req, res) => {
  try {
    const sql = `SELECT * FROM student`;

    const [rows] = await pool.query(sql);

    if (!rows) {
      return res.status(400).json({ message: 'Error Fetching student' });
    }

    return res.status(200).json({ result: rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/read/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM student WHERE ID = ?`;

    const [rows] = await pool.query(sql, [id]);

    if (!rows) {
      return res.status(400).json({ message: 'Error Fetching student' });
    }

    return res.status(200).json({ result: rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/student', async (req, res) => {
  try {
    const { name, email } = req.body;
    const sql = `INSERT INTO student (Name, Email) VALUES (?, ?)`;

    const [rows] = await pool.query(sql, [name, email]);

    if (!rows) {
      return res.status(400).json({ message: 'Error Inserting Data' });
    }

    return res.status(200).json({ result: rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const { name, email } = req.body;
    const sql = `UPDATE student SET Name = ?, Email = ? WHERE ID = ?`;

    const [rows] = await pool.query(sql, [name, email, id]);

    if (!rows) {
      return res.status(400).json({ message: 'Error Inserting Data' });
    }

    return res.status(200).json({ result: rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM student WHERE ID = ?`;
    const [rows] = await pool.query(sql, [id]);

    if (!rows) {
      return res.status(400).json({ message: 'Error Inserting Data' });
    }

    return res.status(200).json({ result: rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(8001, () => console.log('Listening'));
