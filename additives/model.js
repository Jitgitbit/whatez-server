const db = require("../db");
const Sequelize = require("sequelize");
const User = require("../users/model");
const Shot = require("../shots/model");


const Additive = db.define("additive", {

  additiveName: Sequelize.STRING
  
});

Additive.belongsTo(Shot);
Additive.belongsTo(User);
User.hasMany(Additive);
Shot.hasMany(Additive);

module.exports = Additive;