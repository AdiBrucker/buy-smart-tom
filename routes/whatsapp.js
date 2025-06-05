
const express = require('express');
const router = express.Router();
const { analyzeProduct } = require('../utils/analyzeProduct');

router.post('/', async (req, res) => {
  const msg = req.body.Body;
  const from = req.body.From;

  if (!msg.includes('http')) {
    return res.send(`<Response><Message>Send me a product link and I’ll check if there’s a smarter deal 💡🛒</Message></Response>`);
  }

  const reply = await analyzeProduct(msg);
  res.send(`<Response><Message>${reply}</Message></Response>`);
});

module.exports = router;
