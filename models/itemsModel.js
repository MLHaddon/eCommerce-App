import { Sequelize } from 'sequelize';
import db from '../config/database.js';

// Access the datatypes object in sequelize
const { DataTypes } = Sequelize;

// Define the items model
const Items = db.define('items', {
  name: {
    type:DataTypes.STRING
  },
  price: {
    type:DataTypes.INTEGER
  },
  description: {
    type:DataTypes.STRING
  }
}, {
  freezeTableName:true
});

// Sync to the current database
(async () => {
  await db.sync();
})();

export default Items;