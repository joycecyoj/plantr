// const db = require("./model");



const {Gardener, Plot, Vegetable, db} = require('./model')


db
  .sync({ force: true })
  .then(() => {
    console.log("Database synced!");
    // We need to seed before catch and finally...
    const brocolli = Vegetable.create({name: "Brocolli", color: "Green"})
    const bokchoy = Vegetable.create({name: "Bok Choy", color: "Green"})
    const mushroom = Vegetable.create({name: "Mushroom", color: "Brown"})

    return Promise.all([brocolli, bokchoy, mushroom])
  })
  .then(() => {
    // We need to seed before catch and finally...
    const tom = Gardener.create({name: "Tom", age: 45, favoriteVegetableId: Vegetable.id})
    const sheri = Gardener.create({name: "Sheri", age: 24, favoriteVegetableId: Vegetable.id})
    const joyce = Gardener.create({name: "Joyce", age: 28, favoriteVegetableId: Vegetable.id})

    return Promise.all([tom, sheri, joyce])
  })
  .catch(err => {
    console.log("Disaster! Something went wrong! ");
    console.log(err);
  })
  .finally(() => {
    db.close();
  });

// We want to seed
