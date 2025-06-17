const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'bharjid8hk9xqbdus0kd-mysql.services.clever-cloud.com',
  user: 'ux9cd2mjrnkuofoz',
  password: 'IWKHXO4tlZ6pA6eEvVj5',
  database: 'bharjid8hk9xqbdus0kd',
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

module.exports = db;
