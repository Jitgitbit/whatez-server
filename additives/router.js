const { Router } = require("express");
// const auth = require("../auth/middleware");
const Additive = require("./model");
const { imageToData } = require("../extractText");
const multer = require(`multer`);
const {toData} = require('../auth/jwt')
const User = require("../users/model");
const Shot = require("../shots/model")


const router = new Router();

router.get("/additivesnot", (request, response, next) => {

  Additive.findAll()   
    .then(additives => response.json(additives))
    console.log(additives)
    .catch(error => next(error));
});


module.exports = router;