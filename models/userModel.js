import { Sequelize } from 'sequelize';
import db from '../config/database.js';

// Access the DataTypes object in sequelize
const { DataTypes } = Sequelize;

// Define the users model
const Users = db.define('users', {
  username: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  refresh_token: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName:true
});

// Sync to the current database
(async () => {
  await db.sync();
})();

export default Users;