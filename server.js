
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const whatsappRoute = require('./routes/whatsapp');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/whatsapp', whatsappRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Buy Smart with Tom is running on port ${port}`);
});
