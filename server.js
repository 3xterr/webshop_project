const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error('Connection failed:', err.message);
    } else {
        console.log('Database connected successfully.');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'webshop.html'));
});


//app.get('/products', (req, res) => {
//    res.sendFile(path.join(__dirname, 'webshop.html'));
//});

app.get('/products-data', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            return res.status(500).json({ error: 'Server error' });
        }
        res.json(rows);
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://192.168.82.231:${PORT}`);
});




