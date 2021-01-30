const express = require('express');
const router = express.Router();
const database = require('../firebase').database;

router.get('/getShelters', (req, res) => {
  res.status(500).send({ error: 'Not yet implemented!' });
});

router.post('/getShelterByCategory', (req, res) => {
  res.status(500).send({ error: 'Not yet implemented!' });
});

router.post('/getShelterByNeed', (req, res) => {
  res.status(500).send({ error: 'Not yet implemented!' });
});

router.post('/addShelter', (req, res) => {
  res.status(500).send({ error: 'Not yet implemented!' });
});

router.post('/addShelterNeed', (req, res) => {
  res.status(500).send({ error: 'Not yet implemented!' });
});

module.exports = router;