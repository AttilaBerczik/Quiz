import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";

const Cards = (props) => {
    const question = props.question;
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
            style[props.id] = [
                newArrayOfQuestions[0],
                styles2[0],
                newArrayOfQuestions[1],
                styles2[1],
                newArrayOfQuestions[2],
                styles2[2],
                newArrayOfQuestions[3],
                styles2[3],
            ];
            props.setButtonVariants(style);
        }
    };

    const multipleOrTrue = () => {
        if (atob(question.type) == "multiple") {
            return (
                <>
                    {newArrayOfQuestions.map((item, id) => {
                        return (
                            <ListGroupItem>
                                <Button
                                    variant={styles[id]}
                                    block
                                    key={id}
                                    onClick={(e) =>
                                        buttonClicked(e.target.value)
                                    }
                                    value={atob(item)}
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
                    <ListGroupItem>
                        <Button
                            variant={props.buttonVariants[props.id][1]}
                            key={1}
                            block
                            onClick={(e) => buttonClicked(e.target.value)}
                        >
                            True
                        </Button>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button
                            variant={props.buttonVariants[props.id][3]}
                            key={2}
                            block
                            onClick={(e) => buttonClicked(e.target.value)}
                        >
                            False
                        </Button>
                    </ListGroupItem>
                </>
            );
        }
    };
    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>{atob(question.question)}</Card.Title>
                    <Card.Text>
                        <p>{atob(question.category)}</p>
                        <p>
                            Difficulty:{" "}
                            {capitalizeFirstLetter(atob(question.difficulty))}
                        </p>
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {multipleOrTrue()}
                </ListGroup>
            </Card>
        </div>
    );
};

export default Cards;
