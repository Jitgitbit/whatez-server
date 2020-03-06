const { Router } = require("express");
const auth = require("../auth/middleware");
const Shot = require("./model");
const { imageToData } = require("../extractText");

const router = new Router();

router.get("/shots", (request, response, next) => {
  // const limit = Math.min(request.query.limit || 9, 500)
  // const offset = request.query.offset || 0

  Shot.findAll()    //{ limit, offset }
    .then(shots => response.json(shots))
    .catch(error => next(error));
});




router.post("/shots/new", auth, async (request, response) => {
  console.log(
    "**************** NEW SHOT *****************",
    request.body
  );
  const imageData = await imageToData(req.file);
  

  const { imageUrl } = request.body.data;
  const userId = request.body.user.id;

  const newShot = { imageUrl, arrayE: imageData, userId };
  const shot = await Shot.create(newShot);
  
  return response.status(201).send(shot);
});

module.exports = router;
