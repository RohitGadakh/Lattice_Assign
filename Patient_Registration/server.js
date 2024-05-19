const express = require('express');
const bodyParser = require('body-parser');
//const multer = require('multer');
const db = require('./models/db');

const patientRoutes = require('./routes/patientRoutes');
const psychiatristRoutes = require('./routes/psychiatristRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });
app.use(upload.single('photo'));


app.use('/patients', patientRoutes);
app.use('/psychiatrists', psychiatristRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
