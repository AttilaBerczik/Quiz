import React, { useState } from "react";
import "./Card.css";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";

import axios from "axios";

const Cards = (props) => {
    const question = props.question;
    console.log(question);
    const newArrayOfQuestions = [
        props.buttonVariants[props.id][0],
        props.buttonVariants[props.id][2],
        props.buttonVariants[props.id][4],
        props.buttonVariants[props.id][6],
    ];
    const styles = [
        props.buttonVariants[props.id][1],
        props.buttonVariants[props.id][3],
        props.buttonVariants[props.id][5],
        props.buttonVariants[props.id][7],
    ];

    const getImage = () => {
        if (props.buttonVariants[props.id][8] == undefined) {
            const accessKey = "IxtZhZU6SFDgdL_eH6uOFno0M9TpWxyGJENAmKtfatE";
            let state = [...props.buttonVariants];
            const url =
                "https://api.unsplash.com/search/photos?page=1&query=" +
                atob(question.question) +
                "&client_id=" +
                accessKey;
            axios
                .get(url)
                .then((response) => {
                    function getRandomInt(max) {
                        return Math.floor(Math.random() * Math.floor(max));
                    }
                    const random = getRandomInt(10);
                    state[props.id][8] =
                        response.data.results[0].urls.raw + "&w=550&dpr=1";
                    props.setButtonVariants(state);
                })
                .catch((error) => {
                    // Error 😨
                    if (error.response) {
                        /*
                         * The request was made and the server responded with a
                         * status code that falls out of the range of 2xx
                         */
                        console.log(error.response.data);
                    } else if (error.request) {
                        /*
                         * The request was made but no response was received, `error.request`
                         * is an instance of XMLHttpRequest in the browser and an instance
                         * of http.ClientRequest in Node.js
                         */
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request and triggered an Error
                        console.log("Error", error.message);
                    }
                });
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const buttonClicked = (clicked) => {
        //gets activated when the user clicks on a solution
        //sets the color of the button to red or green, to show the solution
        //the color is different if the player found the correct answer
        if (styles[0] == "outline-secondary") {
            let style = [...props.buttonVariants];
            let styles2 = styles;
            for (let i = 0; i < newArrayOfQuestions.length; i++) {
                if (question.type == "Ym9vbGVhbg==") {
                    //what happens if the type of the question is true or false
                    if (clicked == atob(question.correct_answer)) {
                        if ("VHJ1ZQ==" == question.correct_answer) {
                            styles2[0] = "outline-success";
                            styles2[1] = "outline-danger";
                        } else {
                            styles2[1] = "outline-success";
                            styles2[0] = "outline-danger";
                        }
                    } else {
                        if ("VHJ1ZQ==" == question.correct_answer) {
                            styles2[0] = "success";
                            styles2[1] = "danger";
                        } else {
                            styles2[1] = "success";
                            styles2[0] = "danger";
                        }
                    }
                } else {
                    //what happens if the type of the question is multiple choice
                    if (clicked == atob(question.correct_answer)) {
                        if (newArrayOfQuestions[i] == question.correct_answer) {
                            styles2[i] = "outline-success";
                        } else {
                            styles2[i] = "outline-danger";
                        }
                    } else {
                        if (newArrayOfQuestions[i] == question.correct_answer) {
                            styles2[i] = "success";
                        } else {
                            styles2[i] = "danger";
                        }
                    }
                }
            }
            style[props.id] = [
                newArrayOfQuestions[0],
                styles2[0],
                newArrayOfQuestions[1],
                styles2[1],
                newArrayOfQuestions[2],
                styles2[2],
                newArrayOfQuestions[3],
                styles2[3],
                props.buttonVariants[props.id][8],
            ];
            props.setButtonVariants(style);
        }
    };

    const checkStyle = () => {
        console.log();
        if (props.buttonVariants[props.id][1] == "outline-secondary") {
            return {
                backgroundColor: "#4A0541",
                color: "cornsilk",
            };
        } else if (
            props.buttonVariants[props.id][1] == "outline-success" ||
            props.buttonVariants[props.id][1] == "outline-danger"
        ) {
            return {
                backgroundColor: "#4A0541",
                color: "cornsilk",
            };
        } else {
            return {
                color: "cornsilk",
            };
        }
    };

    const multipleOrTrue = () => {
        if (atob(question.type) == "multiple") {
            return (
                <>
                    {newArrayOfQuestions.map((item, id) => {
                        return (
                            <ListGroupItem className="answers">
                                <Button
                                    block
                                    key={id}
                                    onClick={(e) =>
                                        buttonClicked(e.target.value)
                                    }
                                    value={atob(item)}
                                    style={checkStyle()}
                                    variant={styles[id]}
                                >
                                    {atob(item)}
                                </Button>
                            </ListGroupItem>
                        );
                    })}
                </>
            );
        } else if (atob(question.type) == "boolean") {
            return (
                <>
                    <ListGroupItem className="answers">
                        <Button
                            key={1}
                            block
                            onClick={(e) => buttonClicked(e.target.value)}
                            value="True"
                            style={checkStyle()}
                            variant={props.buttonVariants[props.id][1]}
                        >
                            True
                        </Button>
                    </ListGroupItem>
                    <ListGroupItem className="answers">
                        <Button
                            key={2}
                            block
                            onClick={(e) => buttonClicked(e.target.value)}
                            value="False"
                            style={checkStyle()}
                            variant={props.buttonVariants[props.id][3]}
                        >
                            False
                        </Button>
                    </ListGroupItem>
                </>
            );
        }
    };
    getImage();
    return (
        <div className="question-card">
            <Card className="inner-card">
                <Card.Img
                    variant="top"
                    src={props.buttonVariants[props.id][8]}
                    rounded
                />
                <Card.Body>
                    <Card.Title>{atob(question.question)}</Card.Title>
                    <Card.Text>
                        <p>{atob(question.category)}</p>
                        <p>
                            Difficulty:{" "}
                            {capitalizeFirstLetter(atob(question.difficulty))}
                        </p>
                    </Card.Text>
                    <ListGroup className="list-group-flush answers">
                        {multipleOrTrue()}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Cards;
