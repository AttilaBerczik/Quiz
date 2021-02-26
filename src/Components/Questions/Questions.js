import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card/Card";
import { Container, Row, Col } from "react-bootstrap";
import "./Questions.css";

const Questions = ({ match }) => {
    const [questions, setQuestions] = useState();
    const [buttonVariants, setButtonVariants] = useState([]);
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
            if (buttonVariants.length == 0) {
                //function to shuffle array
                function shuffle(array) {
                    var copy = [],
                        n = array.length,
                        i;
                    // While there remain elements to shuffle…
                    while (n) {
                        // Pick a remaining element…
                        i = Math.floor(Math.random() * n--);
                        // And move it to the new array.
                        copy.push(array.splice(i, 1)[0]);
                    }
                    return copy;
                }
                //loop that sets all the button styles to the basic grey
                let styles = [];
                const number = parseInt(props.numberOfQuestions);
                for (let i = 0; i < number; i++) {
                    let arrayOfQuestions = [...question[i].incorrect_answers];
                    arrayOfQuestions.push(question[i].correct_answer);
                    const newArrayOfQuestions = shuffle(arrayOfQuestions);
                    styles[styles.length] = [
                        newArrayOfQuestions[0],
                        "outline-secondary",
                        newArrayOfQuestions[1],
                        "outline-secondary",
                        newArrayOfQuestions[2],
                        "outline-secondary",
                        newArrayOfQuestions[3],
                        "outline-secondary",
                    ];
                }
                setButtonVariants(styles);
            }
            return question.map((item, id) => {
                return (
                    <Card
                        question={item}
                        key={id}
                        id={id}
                        buttonVariants={buttonVariants}
                        setButtonVariants={setButtonVariants}
                    />
                );
            });
        }
    };
    return (
        <Container>
            <Row className="questions-column">
                <Col />
                <Col className="questions-column " xs="auto">
                    {mapQuestions(questions)}
                </Col>
                <Col />
            </Row>
        </Container>
    );
};

export default Questions;
