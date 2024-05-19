const db = require('../models/db');

exports.fetchPsychiatrists = (req, res) => {
  const { hospital_id } = req.body;

  const sql = `
    SELECT h.name as hospital_name, 
           COUNT(p.id) as total_patients_count, 
           COUNT(DISTINCT ps.id) as total_psychiatrists_count, 
           ps.id as psychiatrist_id, 
           ps.name as psychiatrist_name, 
           (SELECT COUNT(*) FROM patients WHERE psychiatrist_id = ps.id) as patients_count
    FROM hospitals h 
    LEFT JOIN psychiatrists ps ON h.id = ps.hospital_id 
    LEFT JOIN patients p ON ps.id = p.psychiatrist_id 
    WHERE h.id = ? 
    GROUP BY ps.id
  `;

  db.query(sql, [hospital_id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};
