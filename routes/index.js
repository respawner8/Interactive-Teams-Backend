var express = require("express");
var router = express.Router();
const User = require("../db/user.model.js");
const Quiz = require("../db/quiz.model.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router
  .post("/createUser", (req, res) => {
    const newUser = new User({
      displayName: req.body.displayName,
      email: req.body.email,
    });
    User.find({ email: req.body.email })
  .exec()
  .then((user) => {
    if (user.length > 0) {
      res.json({ message: "user exists" });
    } else {
      newUser.save();
      res.json({ message: "account created" });
    }
  })
  .catch((error) => {
    res.json({ message: `${error}` });
  });
});

router.post("/questionSubmit", (req, res) => {
  Quiz.find({ quizName: req.body.quizName})
  .exec()
  .then((quiz) => {
    if(quiz.length > 0) {
      quiz.questions.push(req.body.question)
    }
      
  })
})
module.exports = router;
