const Dinosaur = require('./dinosaur');

const DietObject = require('./dietObject');

const Park = function(name = 'Jurrasic Park', price = 50.00){
  this.name = name;
  this.price = price;
  this.dinosaurs = [];
}

Park.prototype.addSomeDefaultDinos = function () {
  dinosaur1 = new Dinosaur('t-rex', 'carnivore', 50);
  dinosaur2 = new Dinosaur('raptor', 'carnivore', 25);
  dinosaur3 = new Dinosaur('diplodocus', 'herbivore', 40);

  this.dinosaurs.push(dinosaur1);
  this.dinosaurs.push(dinosaur2);
  this.dinosaurs.push(dinosaur3);
};

Park.prototype.addDinosaur = function (dino) {
  this.dinosaurs.push(dino);
};

Park.prototype.removeLastDinosaur = function(){
  this.dinosaurs.pop();
}

Park.prototype.removeDinoBySpecies = function(dino_species){
  const remainingDinosaurs = [];
  for (dino of this.dinosaurs){
    if (dino_species !== dino.species){
      remainingDinosaurs.push(dino);
    }
  }
  this.dinosaurs = remainingDinosaurs;
};

Park.prototype.findBySpecies = function (dino_species) {
  const foundDinosaurs = [];
  for (dino of this.dinosaurs){
    if (dino_species === dino.species){
      foundDinosaurs.push(dino);
    }
  }
  return foundDinosaurs;
};

Park.prototype.findByPopularity = function(){
  let mostPopularDinosaur = null;
  const numberOfDinosaurs = this.dinosaurs.length;
  for (i = 0; i < numberOfDinosaurs; i++) {
    if (mostPopularDinosaur === null){
      mostPopularDinosaur = this.dinosaurs[i];
    }
    else if (this.dinosaurs[i].guestsAttractedPerDay > mostPopularDinosaur.guestsAttractedPerDay){
      mostPopularDinosaur = this.dinosaurs[i];
    }
  }
  return mostPopularDinosaur;
};

Park.prototype.calculateVisitors = function(){
  let visitorCount = 0;
  for (dino of this.dinosaurs){
    visitorCount += dino.guestsAttractedPerDay;
  }
  return visitorCount;
};

Park.prototype.calculateVisitorsPerYear = function(){
  return (this.calculateVisitors() * 365);
}

Park.prototype.calculateTotalRevenue = function(){
  return (this.calculateVisitorsPerYear() * this.price);
}

Park.prototype.returnDietObject = function(){
  let dietObject = null;
  let carnivoreCount = 0;
  let herbivoreCount = 0;
  let omnivoreCount = 0;
  for (dino of this.dinosaurs){
    if (dino.diet === 'carnivore'){
      carnivoreCount ++;
    }
    else if (dino.diet === 'herbivore'){
      herbivoreCount ++;
    }
    else if (dino.diet === 'omnivore'){
      omnivoreCount ++;
    }
  }
  dietObject = new DietObject(carnivoreCount, herbivoreCount, omnivoreCount);
  return dietObject;
}

// Park.prototype.returnCarnivores = function(){
//   const carnivores = [];
//   for (dino in this.dinosaurs){
//     if (dino.species === 'carnivore'){
//       carnivores.push(dino);
//     }
//   }
//   return carnivores;
// }



module.exports = Park;
