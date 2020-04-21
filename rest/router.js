const { Router } = require("express");
const axios = require("axios");

const router = new Router();

router.get("/categories", (request, response, next) => {
  
  axios({
    "method":"GET",
    "url":"https://vx-e-additives.p.rapidapi.com/categories",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"vx-e-additives.p.rapidapi.com",
    "x-rapidapi-key":"592be0ac5emsh1f2a31abf42d2e4p15ee76jsnf519e97b2684"
    },"params":{
    "sort":"name"
    }
    })
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })
});

module.exports = router;