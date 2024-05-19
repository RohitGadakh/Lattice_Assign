const db = require('../models/db');

// Utility function to validate email
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Utility function to validate password
const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  return re.test(password);
};

exports.registerPatient = (req, res) => {
  const { name, address, email, phone, password, psychiatrist_id } = req.body;

  // Backend validations
  // if (!name || !address || !email || !phone || !password || !req.file) {
  //   return res.status(400).send('All fields are mandatory');
  // }
  if (!name || !address || !email || !phone || !password ) {
    return res.status(400).send('All fields are mandatory');
  }
  if (address.length < 10) {
    return res.status(400).send('Address should be at least 10 characters');
  }
  if (!validateEmail(email)) {
    return res.status(400).send('Invalid email address');
  }
  if (phone.length < 10) {
    return res.status(400).send('Phone number should be at least 10 digits including country code');
  }
  if (!validatePassword(password)) {
    return res.status(400).send('Password must contain one upper character, one lower character and a number. Max length 15 and min length 8');
  }

  //const photo = req.file.filename;

  const sql = 'INSERT INTO patients (name, address, email, phone, password, photo, psychiatrist_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, address, email, phone, password, photo, psychiatrist_id], (err, result) => {
    if (err) throw err;
    res.send('Patient registered');
  });
};
