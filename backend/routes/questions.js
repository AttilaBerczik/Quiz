const router = require("express").Router();
let Question = require("../models/questions.model");

router.route("/").get((req, res) => {
    Question.find()
        .then((questions) => res.json(questions))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const category = req.body.category;
    const correct_answer = req.body.correct_answer;
    const incorrect_answer_1 = req.body.incorrect_answer_1;
    const incorrect_answer_2 = req.body.incorrect_answer_2;
    const incorrect_answer_3 = req.body.incorrect_answer_3;
    const question = req.body.question;
    const type = req.body.type;

    const newQuestion = new Question({
        username,
        category,
        correct_answer,
        incorrect_answer_1,
        incorrect_answer_2,
        incorrect_answer_3,
        question,
        type,
    });

    newQuestion
        .save()
        .then(() => res.json("Question added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Question.findById(req.params.id)
        .then((question) => res.json(question))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Question.findByIdAndDelete(req.params.id)
        .then(() => res.json("Question deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Question.findById(req.params.id)
        .then((question) => {
            question.username = req.body.username;
            question.category = req.body.category;
            question.correct_answer = req.body.correct_answer;
            question.incorrect_answer_1 = req.body.incorrect_answer_1;
            question.incorrect_answer_2 = req.body.incorrect_answer_2;
            question.incorrect_answer_3 = req.body.incorrect_answer_3;
            question.question = req.body.question;
            question.type = req.body.type;

            question
                .save()
                .then(() => res.json("Question updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
