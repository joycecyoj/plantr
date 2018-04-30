const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr', {logging: false});

// db.authenticate().
// then(() => {
//   console.log('connected');
// })

const Gardener = db.define('gardener', {
  name: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  }
});

const Plot = db.define('plot', {
  size: {
    type: Sequelize.INTEGER
  },
  shaded: {
    type: Sequelize.BOOLEAN
  }
});


const Vegetable = db.define('vegetable', {
  name: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  planted_on: {
    type: Sequelize.DATE
  }
});

/* By doing the following, these will happen:
1. the Plot table will have a foreign key column, "ID", corresponding to the primary key in the Gardener table.

2. Sequelize automatically creates two instance methods for plot, "getGardener" and "setGardener", and gardener will have "getPlot" and "setPlot". All the aforementioned will return promises. However, only sets will update IDs.

3. Sequelize will allow us to "include" the plot's gardener, or the gardener's plot in queries.
*/

// One to one
Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

/* Many to many
This created a new table through the alias called Plot/Vegetable Join Table*/
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'});
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'});

// One to many
Gardener.belongsTo(Vegetable, {as: "favorite_vegetable"});

// In order to start seeding, we have to choose a table that doesn't any foreign keys to another table nor rely on other tables.

module.exports = {Gardener, Plot, Vegetable, db};
