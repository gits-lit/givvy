const express = require('express');
const router = express.Router();
const database = require('../firebase').database;

router.post('/donateItems', async (req, res) => {
  const donations = await database.collection('shelter').doc(req.body.name).needs;
  let listOfItems = {};
  if (req.body.donations == null) {
    res.send("Undefined list");
    return;
  }

  (req.body.donations).forEach(supply => {
    if (supply == null) {
      res.send("Undefined item");
    }
    listOfItems[supply[0]] = supply[1];
  });

  donations.forEach(supply => {
    if (supply.name in listOfItems) {
      supply.possession = Math.min(supply.need, supply.possession + listOfItems[supply.name]);
    }
  });
  res.send("Donated Items");
});

router.post('/donateItems', async (req, res) => {
  res.send(await database.collection('shelter').doc(req.body.name).category);
});

module.exports = router;