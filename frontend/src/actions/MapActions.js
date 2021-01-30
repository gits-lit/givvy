import {Threebox} from 'threebox-plugin';

export const loadLocations = (map) => {
  const origin = [-118.2437, 34.0522];
  const origin2 = [-118.2437, 34.0622];
  let truck;

  map.addLayer({
    id: 'custom_layer',
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

      window.tb.loadObj(options, function (model) {
        truck = model.setCoords(origin);
        window.tb.add(truck);
      })

      window.tb.loadObj(options, function (model) {
        truck = model.setCoords(origin2);
        window.tb.add(truck);
      })

      addWater(map, origin);
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