const express = require('express');
const router = express.Router();
const database = require('../firebase').database;

router.get('/getShelters', async (req, res) => {
  const allShelters = await database.collection('shelter').get();
  let shelters = [];
  
  allShelters.forEach(doc => {
    let item = [];
    (doc.needs).sort((a, b) => (-1 * (a.need - b.need)));
    (doc.needs).forEach(supply => {
      let i = 0;
      while (i < 3 && i < doc.needs.length) {
        item.push(supply[i].name);
        i++;
      }
    });

    shelters.push({
      name: doc.name,
      lat: doc.lat,
      long: doc.long,
      donations: item
    });
  });
  res.send(shelters);
});

router.post('/rankShelters', async (req, res) => {
  const allShelters = await database.collection('shelter').get();
  const category = {clothes: 0, drink: 0, food: 0, supplies: 0};
  let topShelters = [];
  let listOfItems = [];

  (req.body.donations).forEach(item => {
    listOfItems[item[0]] = [item[1], item[2]];
    category[listOfItems[2]] += 1;
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

    (doc.needs).forEach(items => {
      if (items.name in listOfItems) {
        if (doc.category == priorityCategory) {
          score += 5;
        }
        score += Math.min(item[1], listOfItems[item[0]][0]);
      }
    });
    topShelters.push([doc.name, score]);
  });

  topShelters.sort((a, b) => (-1 * (a[1] - b[1])));
  topShelters = topShelters.slice(0, 10);

  res.send(topShelters);
});

module.exports = router;