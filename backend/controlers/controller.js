const db = require('../config/db');

const submitForm = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const query = 'INSERT INTO form_data (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err) => {
    if (err) return res.status(500).json({ error: 'DB insert error' });
    res.status(201).json({ message: 'Form submitted successfully' });
  });
};

const getForms = (req, res) => {
  db.query('SELECT * FROM form_data ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB fetch error' });
    res.json(results);
  });
};

module.exports = { submitForm, getForms };
