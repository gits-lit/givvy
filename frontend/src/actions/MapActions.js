import {Threebox} from 'threebox-plugin';

export const loadLocations = (map, shelters) => {
  console.log('loading map');
  console.log(shelters);
  const mobilePantries = [];
  const homelessShelters = [];
  const donationCenters = [];
  const foodBanks = [];
  const shelterValues = Object.values(shelters);
  for (let i = 0; i < shelterValues.length; i ++) {
    if (shelterValues[i].type == 'mobile-pantry') {
      mobilePantries.push(shelterValues[i]);
    }
    if (shelterValues[i].type == 'homeless-shelter') {
      homelessShelters.push(shelterValues[i]);
    }
    if (shelterValues[i].type == 'donation-shelter') {
      donationCenters.push(shelterValues[i]);
    }
    if (shelterValues[i].type == 'food-bank') {
      foodBanks.push(shelterValues[i]);
    }
  }

  let truck;

  map.addLayer({
    id: 'mobile-pantry',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, mbxContext) {

      window.tb = new Threebox(
        map,
        mbxContext,
        { defaultLights: true }
      );

      var options = {
        obj: '/truck/scene.gltf',
        type: 'gltf',
        scale: 40,
        units: 'meters',
        anchor: 'center',
        rotation: { x: 90, y: 180, z: 0 } //default rotation
      }

      for (let i = 0; i < mobilePantries.length; i ++) {
        const mobilePantry = mobilePantries[i];
        console.log(mobilePantry);
        window.tb.loadObj(options, function (model) {
          truck = model.setCoords([mobilePantry.long, mobilePantry.lat]);
          window.tb.add(truck);
          addWater(map, [mobilePantry.long, mobilePantry.lat]);
        })
      }
    },
    render: function (gl, matrix) {
      window.tb.update();
    }
  });

  let shelter;

  map.addLayer({
    id: 'homeless-shelter',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, mbxContext) {

      window.tb = new Threebox(
        map,
        mbxContext,
        { defaultLights: true }
      );

      var options = {
        obj: '/shelter/scene.gltf',
        type: 'gltf',
        scale: 20,
        units: 'meters',
        anchor: 'center',
        rotation: { x: 90, y: 50, z: 0 } //default rotation
      }

      for (let i = 0; i < homelessShelters.length; i ++) {
        const homelessShelter = homelessShelters[i];
        console.log(homelessShelter);
        window.tb.loadObj(options, function (model) {
          shelter = model.setCoords([homelessShelter.long, homelessShelter.lat]);
          window.tb.add(shelter);
          addBoot(map, [homelessShelter.long, homelessShelter.lat]);
        })
      }
    },
    render: function (gl, matrix) {
      window.tb.update();
    }
  });

  let center;

  map.addLayer({
    id: 'donation-center',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, mbxContext) {

      window.tb = new Threebox(
        map,
        mbxContext,
        { defaultLights: true }
      );

      var options = {
        obj: '/donation_center/scene.gltf',
        type: 'gltf',
        scale: .36,
        units: 'meters',
        anchor: 'center',
        rotation: { x: 90, y: 145, z: 0 } //default rotation
      }

      for (let i = 0; i < donationCenters.length; i ++) {
        const donationCenter = donationCenters[i];
        window.tb.loadObj(options, function (model) {
          center = model.setCoords([donationCenter.long, donationCenter.lat]);
          window.tb.add(center);
          addBackpack(map, [donationCenter.long, donationCenter.lat]);
        })
      }
    },
    render: function (gl, matrix) {
      window.tb.update();
    }
  });

  let bank;

  map.addLayer({
    id: 'food-banks',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, mbxContext) {

      window.tb = new Threebox(
        map,
        mbxContext,
        { defaultLights: true }
      );

      var options = {
        obj: '/bank/scene.gltf',
        type: 'gltf',
        scale: 4,
        units: 'meters',
        anchor: 'center',
        rotation: { x: 90, y: 145, z: 0 } //default rotation
      }

      for (let i = 0; i < foodBanks.length; i ++) {
        const foodBank = foodBanks[i];
        window.tb.loadObj(options, function (model) {
          bank = model.setCoords([foodBank.long, foodBank.lat]);
          window.tb.add(bank);
          addBurger(map, [foodBank.long, foodBank.lat]);
        })
      }
    },
    render: function (gl, matrix) {
      window.tb.update();
    }
  });
}

const addWater = (map, origin) => {

  let water;

  var options = {
    obj: '/water/scene.gltf',
    type: 'gltf',
    scale: 1.5,
    units: 'meters',
    anchor: 'center',
    rotationTransform: 1,

    adjustment: { x: 0, y: 0, z: 1.5 },
    rotation: { x: 0, y: 0, z: 0 } //default rotation
  }

  window.tb.loadObj(options, function (model) {
    water = model.setCoords(origin);
    window.tb.add(water);

    let rotation = 0;
    function animate() {

      setTimeout( function() {

        requestAnimationFrame( animate );

      }, 1000 / 20 );
      water.setRotation({x:0, y:0, z: rotation += 10});
    }

    animate();
  })
} 

const addBoot = (map, origin) => {

  let boot;

  var options = {
    obj: '/boot/scene.gltf',
    type: 'gltf',
    scale: 15,
    units: 'meters',
    anchor: 'center',
    rotationTransform: 1,

    adjustment: { x: 0, y: 0, z: 3 },
    rotation: { x: 90, y: 0, z: 0 } //default rotation
  }

  window.tb.loadObj(options, function (model) {
    boot = model.setCoords(origin);
    window.tb.add(boot);

    let rotation = 0;
    function animate() {

      setTimeout( function() {

        requestAnimationFrame( animate );

      }, 1000 / 20 );
      boot.setRotation({x:0, y:0, z: rotation += 10});
    }

    animate();
  })
} 

const addBackpack = (map, origin) => {

  let backpack;

  var options = {
    obj: '/backpack/scene.gltf',
    type: 'gltf',
    scale: .5,
    units: 'meters',
    anchor: 'center',
    rotationTransform: 1,

    adjustment: { x: 0, y: 0, z: 1.5 },
    rotation: { x: 90, y: 0, z: 0 } //default rotation
  }

  window.tb.loadObj(options, function (model) {
    backpack = model.setCoords(origin);
    window.tb.add(backpack);

    let rotation = 0;
    function animate() {

      setTimeout( function() {

        requestAnimationFrame( animate );

      }, 1000 / 20 );
      backpack.setRotation({x:0, y:0, z: rotation += 10});
    }

    animate();
  })
} 

const addBurger = (map, origin) => {

  let burger;

  var options = {
    obj: '/burger/scene.gltf',
    type: 'gltf',
    scale: .5,
    units: 'meters',
    anchor: 'center',
    rotationTransform: 1,

    adjustment: { x: 0, y: 0, z: 2.5 },
    rotation: { x: 90, y: 0, z: 0 } //default rotation
  }

  window.tb.loadObj(options, function (model) {
    burger = model.setCoords(origin);
    window.tb.add(burger);

    let rotation = 0;
    function animate() {

      setTimeout( function() {

        requestAnimationFrame( animate );

      }, 1000 / 20 );
      burger.setRotation({x:0, y:0, z: rotation += 10});
    }

    animate();
  })
} 