const Sequelize = require("sequelize");

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

const db = new Sequelize(databaseUrl);


db
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log("DB connect");
  })
  // .then(hardCodedEvents())
  .catch(err => {
    console.error(`Table schema fail`, err);
    process.exit(1);
  })
  .catch(console.error);

module.exports = db;