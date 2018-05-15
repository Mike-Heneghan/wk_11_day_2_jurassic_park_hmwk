const assert = require('assert');
const Park = require('../models/park.js');
const Dinosaur = require('../models/dinosaur.js');

describe('Park', function() {

  beforeEach(function () {
    park = new Park()
    dino1 = new Dinosaur('oviraptor', 'omnivore', 20);
    dino2 = new Dinosaur('most_popular','omnivore', 150);
  })

  it('should have a name', function () {
    const actual = park.name;
    assert.strictEqual(actual, 'Jurrasic Park')
  });

  it('should have a ticket price', function () {
    const actual = park.price;
    assert.strictEqual(actual, 50.00);
  });

  it('should have a collection of dinosaurs', function () {
    park.addSomeDefaultDinos();
    const actual = park.dinosaurs.length;
    assert.strictEqual(actual, 3);
  });

  it('should be able to add a dinosaur to its collection', function () {
    park.addSomeDefaultDinos();
    park.addDinosaur(dino1);
    const actual = park.dinosaurs.length;
    assert.strictEqual(actual, 4)
  });

  it('should be able to remove a dinosaur from its collection', function () {
    park.addSomeDefaultDinos();
    park.removeLastDinosaur();
    const actual = park.dinosaurs.length;
    assert.strictEqual(actual, 2);
  });

  it('should be able to find all dinosaurs of a particular species', function () {
    park.addSomeDefaultDinos();
    park.addSomeDefaultDinos();
    const foundBySpecies = park.findBySpecies('t-rex');
    assert.strictEqual(foundBySpecies.length, 2);
  });

  it('should be able to remove all dinosaurs of a particular species', function () {
    park.addSomeDefaultDinos();
    park.removeDinoBySpecies('t-rex');
    const actual = park.findBySpecies('t-rex').length;
    assert.strictEqual(actual, 0);
  });

  it('should be able to find the dinosaur that attracts the most visitors', function () {
    park.addSomeDefaultDinos();
    park.addDinosaur(dino2);
    const actual = park.findByPopularity().species;
    assert.strictEqual(actual, 'most_popular');
  });

});
