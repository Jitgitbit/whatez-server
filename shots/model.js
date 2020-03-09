const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("../users/model");

const Shot = sequelize.define("shot", {
  
  fileName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  arrayE: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

Shot.belongsTo(User);
User.hasMany(Shot);

module.exports = Shot;