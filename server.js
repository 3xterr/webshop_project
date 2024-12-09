const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');  // connecting CORS

const app = express();
const PORT = 3000;

app.use(cors());

// connecting to db
const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error('Error occured while trying to connect to data base:', err.message);
    } else {
        console.log('Successfully connected to data base.');
    }
});

// path for fetching data
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// starting server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

