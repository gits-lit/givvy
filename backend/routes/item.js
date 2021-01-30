const express = require('express');
const router = express.Router();
const database = require('../firebase').database;

router.post('/donateItems', async (req, res) => {
  const donations = await database.collection('shelter').doc(req.body.name).donations;
  let listOfItems = {};
  if (req.body.donations == null) {
    res.send("Undefined list");
    return;
  }
  (req.body.donations).forEach(item => {
    if (item == null) {
      res.send("Undefined item");
    }
    listOfItems[item[0]] = item[1];
  });

  donations.forEach(item => {
    if (item[0] in listOfItems) {
      item[2] = Math.min(item[1], item[2] + listOfItems[item[1]]);
    }
  });
  res.send("Donated Items");
});

router.post('/donateItems', async (req, res) => {
  res.send(await database.collection('shelter').doc(req.body.name).category);
});

module.exports = router;