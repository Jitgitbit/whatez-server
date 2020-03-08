const { Router } = require("express");
const auth = require("../auth/middleware");
const Shot = require("./model");
const { imageToData } = require("../extractText");
const multer = require(`multer`);
// const User = require("../users/model");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req,file,cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage}).single(`file`);

const router = new Router();

router.get("/shots", (request, response, next) => {
  // const limit = Math.min(request.query.limit || 9, 500)
  // const offset = request.query.offset || 0

  Shot.findAll()    //{ limit, offset }
    .then(shots => response.json(shots))
    .catch(error => next(error));
});




router.post("/shots/new", upload, async (request, response) => {

  const imageData = await imageToData(request);
  
  console.log(`================================> WHAT IS REQUEST.FILE:`, request.file)
  const { imageUrl } = request.file.filename;
  // const { imageUrl } = request.body.data;

  console.log(`================================> WHAT IS REQUEST.BODY`, request.user)
  // console.log(`============================================> USER:`, request)
  const userId = request.body.user.id;

  // const newShot = { arrayE: imageData, userId };
  const newShot = { imageUrl, arrayE: imageData, userId };
  const shot = await Shot.create(newShot);
  
  return response.status(201).send(shot);
});

module.exports = router;
