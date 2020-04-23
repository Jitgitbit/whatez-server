const { Router } = require("express");
const axios = require("axios");

const router = new Router();


router.get("/categories", async (req, res) => {
  const response = await axios(
    {
      "method":"GET",
      "url":"https://vx-e-additives.p.rapidapi.com/categories",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"vx-e-additives.p.rapidapi.com",
      "x-rapidapi-key":"592be0ac5emsh1f2a31abf42d2e4p15ee76jsnf519e97b2684"
      },"params":{
      "sort asc":"id"
      }
    }
  );
  // console.log("==============================>>> response.data @categories router", response.data);
  res.send(response.data);
});

router.get("/categories/:id", async (req, res) => {
  // console.log("=====================>>>  req.params @category router", req.params);
  let specificId = req.params.id

  const response = await axios(
    {
      "method":"GET",
      "url":"https://vx-e-additives.p.rapidapi.com/categories/" + specificId,
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"vx-e-additives.p.rapidapi.com",
      "x-rapidapi-key":"592be0ac5emsh1f2a31abf42d2e4p15ee76jsnf519e97b2684"
      },"params":{
      "locale":"en"
      }
      }
  );
  console.log("==============================>>>  response.data @category router", response.data);
  res.send(response.data);
});

router.get("/additives", async (req, res) => {
  const response = await axios(
    {
      "method":"GET",
      "url":"https://vx-e-additives.p.rapidapi.com/additives",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"vx-e-additives.p.rapidapi.com",
      "x-rapidapi-key":"592be0ac5emsh1f2a31abf42d2e4p15ee76jsnf519e97b2684"
      },"params":{
      "order":"asc",
      "locale":"en",
      "sort":"code"
      }
    }
  );
  // console.log("==============================>>> response.data @additives router", response.data);
  res.send(response.data);
});

router.get("/additives/:code", async (req, res) => {
  console.log("=====================>>>  req.params @additive router", req.params);

  let specificCode = req.params.code

  const response = await axios(
    {
      "method":"GET",
      "url":"https://vx-e-additives.p.rapidapi.com/additives/" + specificCode,
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"vx-e-additives.p.rapidapi.com",
      "x-rapidapi-key":"592be0ac5emsh1f2a31abf42d2e4p15ee76jsnf519e97b2684"
      },"params":{
      "locale":"en"
      }
    }
  );
  console.log("==============================>>>  response.data @additive router", response.data);
  res.send(response.data);
});


module.exports = router;