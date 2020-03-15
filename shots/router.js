const { Router } = require("express");

// const auth = require("../auth/middleware");
const Shot = require("./model");
const { imageToData } = require("../extractText");
const multer = require(`multer`);
const { toData } = require("../auth/jwt");
const User = require("../users/model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single(`file`);

const router = new Router();

router.get("/shots", (request, response, next) => {
  // const limit = Math.min(request.query.limit || 9, 500)
  // const offset = request.query.offset || 0

  Shot.findAll() //{ limit, offset }
    .then(shots => response.json(shots))
    .catch(error => next(error));
});

let veryGlobal = 0;

router.post("/shots/new/", upload, async (request, response) => {
  // console.log(`================================> WHAT IS REQUEST.FILE.ORIGINALNAME:`, request.file.originalname)

  // console.log(`================================> WHAT IS REQUEST.BODY.USER.USER`, request.body.user.user)

  const auth =
    request.headers.authorization && request.headers.authorization.split(" ");
  let myUSerid = 0;
  if (auth && auth[0] === "Bearer" && auth[1]) {
    const data = toData(auth[1]);
    console.log("++++++++++++++++++++++++++++>>data", data);
    const myUSer = await User.findByPk(data.id);
    veryGlobal = myUSer.dataValues.id;
  }

  // Increase timeout for this requests only, not to whole server.
  request.setTimeout(240000);

  console.log("request file: ", request.file);

  const imageData = await imageToData(request.file.originalname);

  console.log(
    `================================> WHAT IS REQUEST.FILE.ORIGINALNAME:`,
    request.file.originalname
  );
  console.log(
    `=======================>> userId after fn, global and VERY GLOBAL`,
    myUSerid,
    veryGlobal
  );

  const newShot = {
    fileName: request.file.originalname,
    arrayE: imageData,
    userId: veryGlobal
  };
  const shot = await Shot.create(newShot);

  // console.log(`THIS IS THE:`, shot)
  console.log("DONE!!", shot);
  response.status(201).json(shot);
});

module.exports = router;
