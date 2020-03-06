const { Router } = require("express");
const router = new Router();

const User = require("./model");

const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");

router.get("/user", (request, response, next) => {
  User.findAll()
    .then(users => response.json(users))
    .catch(error => next(error));
});

router.post("/user/signup", (request, response, next) => {
  // console.log("SIGNUP REQUEST DATA", request.body);
  const { username, email, password } = request.body;
  User.create({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10)
  })
    .then(user => response.send(user))
    .catch(error => next(error));
});

router.post("/user/login", async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).send("Missing email or password.");
  }

  try {
    const user = await User.findOne({ where: { email: email } });
    const passwordValid = bcrypt.compareSync(password, user.password);

    if (passwordValid) {
      const { id, username, email } = user.dataValues;
      // console.log(user);
      const token = toJWT({ id: user.id });
      return response.status(200).send({
        id: id,
        username: username,
        email: email,
        token: token
      });
    } else {
      return response
        .status(401)
        .send({ message: "Email or password is invalid" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
