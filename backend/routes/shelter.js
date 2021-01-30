const express = require('express');
const router = express.Router();
const database = require('../firebase').database;

router.get('/getShelters', async (req, res) => {
  const allShelters = await database.collection('shelter').get();
  let shelters = [];
  
  allShelters.forEach(doc => {
    let needs = [];
    (doc.donations).forEach(items => {
      items.sort((a, b) => (-1 * (a[1] - b[1])));
      let i = 0;
      while (i < 3 && i < items.length) {
        needs.push(items[i]);
        i++;
      }
    });

    shelters.push({
      name: doc.name,
      lat: doc.lat,
      long: doc.long,
      donations: needs
    });
  });
  res.send(shelters);
});

router.post('/rankShelters', async (req, res) => {
  const allShelters = await database.collection('shelter').get();
  const category = {clothes: 0, drink: 0, food: 0, supplies: 0};
  let shelters = [];
  let listOfItems = [];
  (req.body.donations).forEach(item => {
    listOfItems[item[0]] = [item[1], item[2]];
    category[listOfItems[2]] += 1;
  });

  let priorityCategory = ""
  let total = 0;
  for (let item in category) {
    if (total <= category[item]) {
      priorityCategory = item;
    }
  }

  allShelters.forEach(doc => {
    let score = 0;
    (doc.donations).forEach(items => {
      if (items[0] in listOfItems) {
        if (doc.category == priorityCategory) {
          score += 5;
        }
        score += Math.min(item[1], listOfItems[item[0]][0]);
      }
    });
    shelters.push([doc.name, score]);
  });

  shelters.sort((a, b) => (-1 * (a[1] - b[1])));
  shelters = shelters.slice(0, 10);

  res.send(shelters);
});

module.exports = router;