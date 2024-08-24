import { Sequelize } from 'sequelize';
// import { MySqlDialect } from '@sequelize/mysql';

const db = new Sequelize('db', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
});

export default db;