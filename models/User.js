const Sequelize = require('sequelize');
const db = require('../config/database')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  resetPasswordToken: {
    type: Sequelize.STRING
  },
  resetPasswordExpires: {
    type: Sequelize.DATE
  },
})

module.exports = User;

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   user.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'user',
//   });
//   return user;
// };
