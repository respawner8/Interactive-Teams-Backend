var express = require("express");
var router = express.Router();
const User = require("../db/user.model.js");
const Quiz = require("../db/quiz.model.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/createUser", (req, res) => {
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

router.post("/createQuiz", (req, res) => {
  const newQuiz = new Quiz({
    quizName: req.body.quizName,
    quizCreator: req.body.quizCreator,
    questions: req.body.questions,
  });
  Quiz.find({ quizName: req.body.quizName })
    .exec()
    .then((quiz) => {
      if (quiz.length > 0) {
        res.json({ message: "quiz name already set", check: "0" });
      } else {
        newQuiz.save();
        res.json({
          message: `quiz created with code ${req.body.quizName}`,
          check: "1",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/quiz/:quizName", function (req, res) {
  const quizName = req.params.quizName;
  Quiz.find({
    quizName: quizName,
  })
    .exec()
    .then((quiz) => {
      res.json(quiz);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
