const express = require('express');
const router = express.Router();

router.post('/donateItems', (req, res) => {
  res.status(500).send({ error: 'Not yet implemented!' });
});


router.post('/getItemInformation', (req, res) => {
  res.status(500).send({ error: 'Not yet implemented!' });
});

router.post('/addItem', (req, res) => {
  res.status(500).send({ error: 'Not yet implemented!' });
});

module.exports = router;