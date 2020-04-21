const express = require("express");
const cors = require("cors");
const auth = require("./auth/middleware");

const userRouter = require("./users/router");
const authRouter = require("./auth/router");
const shotRouter = require("./shots/router");
const additiveRouter = require("./additives/router");
const restRouter = require("./rest/router");

const app = express();
const port = process.env.PORT || 5000;

const corsMiddleware = cors();
app.use(corsMiddleware, express.json());

app.get("/ping", (request, response) => {
  response.send("You rang?");
});

app.use(userRouter);
app.use(authRouter);
app.use(shotRouter);
app.use(additiveRouter);
app.use(restRouter);

app.listen(port, () => console.log(`Listening on :${port}`));
