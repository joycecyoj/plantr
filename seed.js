const {Gardener, Plot, Vegetable, db} = require('./model')
const PlotVegetable = db.model('vegetable_plot')
const vegetable = db.model('vegetable')
const gardener = db.model('gardener')

db
  .sync({ force: true })
  .then(() => {
    console.log("Database synced!");
    // We need to seed before catch and finally...
    const brocolli = Vegetable.create({name: "Brocolli", color: "Green", planted_on: '2018-04-30'})
    const bokchoy = Vegetable.create({name: "Bok Choy", color: "Green", planted_on: '2018-04-30'})
    const mushroom = Vegetable.create({name: "Mushroom", color: "Brown", planted_on: '2018-04-30'})

    return Promise.all([brocolli, bokchoy, mushroom])
  })
  .then(() => {
    const tom = Gardener.create({name: "Tom", age: 45, favoriteVegetableId: vegetable.brocolli.id})
    const sheri = Gardener.create({name: "Sheri", age: 24, favoriteVegetableId: 2})
    const joyce = Gardener.create({name: "Joyce", age: 28, favoriteVegetableId: 3})

    return Promise.all([tom, sheri, joyce])
  })
  .then(() => {
    const plotA = Plot.create({size: 100, shaded: true, gardenerId: 1})
    const plotB = Plot.create({size: 200, shaded: false, gardenerId: 2})
    const plotC = Plot.create({size: 300, shaded: true, gardenerId: 3})

    return Promise.all([plotA, plotB, plotC])
  })
  // PLOT/VEGETABLE JOIN TABLE
  .then(() => {
    const vegPlotA = PlotVegetable.create({vegetableId: brocolli.id, plotId: plotA.id})
    const vegPlotB = PlotVegetable.create({vegetableId: bokchoy.id, plotId: plotB.id})
    const vegPlotC = PlotVegetable.create({vegetableId: mushroom.id, plotId: plotC.id})

    return Promise.all([vegPlotA, vegPlotB, vegPlotC])

  })


  .catch(err => {
    console.log("Disaster! Something went wrong! ");
    console.log(err);
  })
  .finally(() => {
    db.close();
  });

// We want to seed
