const express = require('express');
const router = express.Router();
const database = require('../firebase').database;

router.get('/getShelters', async (req, res) => {
  const donRef = database.collection('shelters');
  const don = (await donRef.get());

  const arr = []
  let shelters = [];

  don.forEach(doc => {
    arr.push(doc.data());
  });
  
  arr.forEach(doc => {
    let item = [];
    (doc.needs).sort((a, b) => (-1 * (a.need - b.need)));
    for (let i = 0; i < doc.needs.length; i++) {
      if (i == 3) {
        break;
      }
      item.push((doc.needs)[i].name);
    }

    shelters.push({
      name: doc.name,
      address: doc.address,
      type: doc.type,
      lat: doc.lat,
      long: doc.long,
      category: doc.category,
      donations: item
    });
  });
  res.send(shelters);
});

router.post('/rankShelters', async (req, res) => {
  const donRef = database.collection('shelters');
  const don = await donRef.get();

  const allShelters = []

  don.forEach(doc => {
    allShelters.push(doc.data());
  });

  const category = {clothing: 0, drink: 0, food: 0, supply: 0};
  let topShelters = [];
  let listOfItems = [];

  (req.body.donations).forEach(supply => {
    listOfItems[supply[0]] = [supply[1], supply[2]];
    category[supply[2]] += 1;
  });

  let priorityCategory = ""
  let total = 0;
  for (let supply in category) {
    if (total <= category[supply]) {
      priorityCategory = supply;
      total = category[supply];
    }
  }

  allShelters.forEach(doc => {
    let score = 0;
    (doc.needs).forEach(supply => {
      if (supply.name in listOfItems) {
        if (doc.category == priorityCategory) {
          score += 5;
        }
        score += Math.min(parseInt(supply.need), parseInt((listOfItems[supply.name])[0]));
      }
    });
    topShelters.push({
      name: doc.name,
      score: score,
      address: doc.address,
      type: doc.type,
      lat: doc.lat,
      long: doc.long,
      category: doc.category,
      donations: doc.needs
    });
  });

  topShelters.sort((a, b) => (-1 * (a.score - b.score)));
  topShelters = topShelters.slice(0, 10);

  res.send(topShelters);
});

module.exports = router;