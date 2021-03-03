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
    const difficulty = req.body.difficulty;
    const image = req.body.image;

    const newQuestion = new Question({
        username,
        category,
        correct_answer,
        incorrect_answer_1,
        incorrect_answer_2,
        incorrect_answer_3,
        question,
        type,
        difficulty,
        image
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
            question.difficulty = req.body.difficulty;
            question.image = req.body.image;

            question
                .save()
                .then(() => res.json("Question updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

//find by difficulty, category and type
router.route("/category/:cat/difficulty/:dif/type/:tip").get((req, res) => {
    //ask for all the combinations of these three conditions
    if (
        req.params.cat != "any" &&
        req.params.dif == "any" &&
        req.params.tip == "any"
    ) {
        Question.find({ category: req.params.cat })
            .then((question) => res.json(question))
            .catch((err) => res.status(400).json("Error: " + err));
    } else if (
        req.params.cat == "any" &&
        req.params.dif != "any" &&
        req.params.tip == "any"
    ) {
        Question.find({ difficulty: req.params.dif })
            .then((question) => res.json(question))
            .catch((err) => res.status(400).json("Error: " + err));
    } else if (
        req.params.cat == "any" &&
        req.params.dif == "any" &&
        req.params.tip != "any"
    ) {
        Question.find({ type: req.params.tip })
            .then((question) => res.json(question))
            .catch((err) => res.status(400).json("Error: " + err));
    } else if (
        req.params.cat != "any" &&
        req.params.dif != "any" &&
        req.params.tip == "any"
    ) {
        Question.find({ difficulty: req.params.dif, category: req.params.cat })
            .then((question) => res.json(question))
            .catch((err) => res.status(400).json("Error: " + err));
    } else if (
        req.params.cat != "any" &&
        req.params.dif == "any" &&
        req.params.tip != "any"
    ) {
        Question.find({ type: req.params.tip, category: req.params.cat })
            .then((question) => res.json(question))
            .catch((err) => res.status(400).json("Error: " + err));
    } else if (
        req.params.cat == "any" &&
        req.params.dif != "any" &&
        req.params.tip != "any"
    ) {
        Question.find({ type: req.params.tip, difficulty: req.params.dif })
            .then((question) => res.json(question))
            .catch((err) => res.status(400).json("Error: " + err));
    } else if (
        req.params.cat != "any" &&
        req.params.dif != "any" &&
        req.params.tip != "any"
    ) {
        Question.find({
            difficulty: req.params.dif,
            category: req.params.cat,
            type: req.params.tip,
        })
            .then((question) => res.json(question))
            .catch((err) => res.status(400).json("Error: " + err));
    } else if (
        req.params.cat == "any" &&
        req.params.dif == "any" &&
        req.params.tip == "any"
    ) {
        Question.find()
            .then((question) => res.json(question))
            .catch((err) => res.status(400).json("Error: " + err));
    }
});

module.exports = router;
