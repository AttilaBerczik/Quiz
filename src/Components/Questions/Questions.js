import React, { useState, useEffect } from "react";
import axios from "axios";

const Questions = ({ match }) => {
    const [questions, setQuestions] = useState();
    const props = match.params;

    useEffect(() => {
        const fetchData = async () => {
            const calculateCategory = () => {
                if (isNaN(props.categoryID)) {
                    //the user didn't pick any particular category
                } else {
                    return `&category=${parseInt(props.categoryID)}`;
                }
            };
            const calculateDifficulty = () => {
                if (props.difficulty == "Any") {
                    //the user didn't pick any particular difficulty
                } else {
                    return `&difficulty=${props.difficulty.toLowerCase()}`;
                }
            };
            const calculateType = () => {
                if (props.type == "Any") {
                    //the user didn't pick any particular type
                } else if (props.type == "Multiple Choice") {
                    return `&type=multiple`;
                } else if (props.type == "boolean") {
                    return `&type=boolean`;
                }
            };
            let toAsk = `https://opentdb.com/api.php?amount=${props.numberOfQuestions}`;
            if (calculateCategory() != undefined) {
                toAsk = toAsk + calculateCategory();
            }
            if (calculateDifficulty() != undefined) {
                toAsk = toAsk + calculateDifficulty();
            }
            if (calculateType() != undefined) {
                toAsk = toAsk + calculateType();
            }
            toAsk = toAsk + "&encode=base64";
            let result = await axios(toAsk);
            //check if the API returned enough questions
            //if there aren't enough questions from the type the user specified we first remove the difficulty part, then if there still isn't, the type part
            if (result.data.results.length != props.numberOfQuestions) {
                toAsk = `https://opentdb.com/api.php?amount=${props.numberOfQuestions}`;
                if (calculateCategory() != undefined) {
                    toAsk = toAsk + calculateCategory();
                }
                if (calculateType() != undefined) {
                    toAsk = toAsk + calculateType();
                }
                toAsk = toAsk + "&encode=base64";
                result = await axios(toAsk);
                if (result.data.results.length != props.numberOfQuestions) {
                    toAsk = `https://opentdb.com/api.php?amount=${props.numberOfQuestions}`;
                    if (calculateCategory() != undefined) {
                        toAsk = toAsk + calculateCategory();
                    }
                    toAsk = toAsk + "&encode=base64";
                    result = await axios(toAsk);
                    if (result.data.results.length != props.numberOfQuestions) {
                        result = await axios(
                            `https://opentdb.com/api.php?amount=${props.numberOfQuestions}&encode=base64`
                        );
                    }
                }
            }
            setQuestions(result.data.results);
        };
        fetchData();
    }, []);
    const mapQuestions = (question) => {
        if (question != undefined) {
            return question.map((item) => {
                return <h3>{atob(item.question)}</h3>;
            });
        }
    };
    return <div>{mapQuestions(questions)}</div>;
};

export default Questions;
