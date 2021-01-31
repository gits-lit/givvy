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

  console.log(allShelters.needs);
  (allShelters.needs).forEach(supply => {
    if (supply.name in listOfItems) {
      supply.possession = Math.min(supply.need, (parseInt(supply.possession) + parseInt(listOfItems[supply.name])).toString());
    }
  });
  await donRef.update({needs: allShelters.needs});
  res.send("Donated Items");
});

router.post('/getItemByCategory', async (req, res) => {
  const donRef = database.collection('shelters');
  const don = (await donRef.get());

  const allShelters = []

  don.forEach(doc => {
    allShelters.push(doc.data());
  });

  let itemCategory = ""
  
  allShelters.forEach(doc => {
    (doc.needs).forEach(supply => {
      if (supply.name == req.body.name) {
        itemCategory = doc.category;
      }
    });
  });

  if (itemCategory == "") {
    res.send("Not in datatbase");
  }
  else {
    res.send(itemCategory);
  }
});

module.exports = router;