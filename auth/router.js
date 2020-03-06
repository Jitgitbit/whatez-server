const { Router } = require("express");
const { toJWT } = require("./jwt");
const User = require("./../users/model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({
        message: "Please supply a valid email and password"
      });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const validPass = bcrypt.compareSync(password, user.password);
      if (validPass) {
        res.send({
          jwt: toJWT({ userId: user.id }),
          nickname: user.nickname,
          email: user.email
        });
      } else {
        res.status(400).send({
          message: "Password was incorrect"
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
