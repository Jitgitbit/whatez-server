const { Router } = require("express");
// const auth = require("../auth/middleware");
const Additive = require("./model");
const { imageToData } = require("../extractText");
const multer = require(`multer`);
const {toData} = require('../auth/jwt')
const User = require("../users/model");
const Shot = require("../shots/model")


const router = new Router();

router.get("/additives", (request, response, next) => {

  Additive.findAll()   
    .then(additives => response.json(additives))
    console.log(additives)
    .catch(error => next(error));
});

// router.post("/additives/new", (request, response, next) => {
//   // console.log("SHOT REQUEST DATA", request.body);
//   // const { additiveName } = request.body;
//   router.get("/shots", (request, response, next) => {

//     Shot.findAll()   
//       .then(shots => response.json(shots))
//       console.log(shots)
//       .catch(error => next(error));
//   });
//   Additive.create({
//     additiveName: additiveName,
//   })
//     .then(additive => response.send(additive))
//     .catch(error => next(error));
// });

module.exports = router;