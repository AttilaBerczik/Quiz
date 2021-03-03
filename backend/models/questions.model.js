const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        category: { type: String, required: true },
        correct_answer: { type: String, required: true },
        incorrect_answer_1: { type: String, required: true },
        incorrect_answer_2: { type: String, required: false },
        incorrect_answer_3: { type: String, required: false },
        question: { type: String, required: true },
        type: { type: String, required: true },
        difficulty: { type: String, required: true },
        image: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
