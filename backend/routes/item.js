const express = require('express');
const router = express.Router();
const database = require('../firebase').database;

router.post('/donateItems', async (req, res) => {
  const donRef = database.collection('shelters').doc(req.body.name)
  const don = (await donRef.get())
  const allShelters = don.data();

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

  (allShelters.needs).forEach(supply => {
    if (supply.name in listOfItems) {
      supply.possession = Math.min(supply.need, (parseInt(supply.possession) + 1).toString());
    }
  });
  await donRef.update({needs: donations.needs});
  res.send("Donated Items");
});

router.post('/donateItems', async (req, res) => {
  res.send(await database.collection('shelter').doc(req.body.name).category);
});

module.exports = router;