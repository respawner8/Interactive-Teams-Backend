const mongoose = require("mongoose");
const { Schema } = mongoose;
const QuestionSchema = new Schema({
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    correctAns: Number
  });

const QuizSchema = new Schema({
  quizName: String,
  quizCreator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  questions: [QuestionSchema]
});

module.exports = mongoose.model("Quiz", QuizSchema);
