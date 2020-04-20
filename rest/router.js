const { Router } = require("express");

// const cors = require("cors");
// const corsMiddleware = cors();

const axios = require("axios");

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