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
    console.log(newArrayOfQuestions);
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
        let style = [...props.buttonVariants];
        let styles2 = styles;
        for (let i = 0; i < newArrayOfQuestions.length; i++) {
            if (newArrayOfQuestions[i] == question.correct_answer) {
                styles2[i] = "success";
            } else {
                styles2[i] = "danger";
            }
        }
        style[props.id] = styles2;
        console.log(style);
        console.log(props.buttonVariants);
        props.setButtonVariants(style);
    };

    const buttonDisabled = (id) => {
        //checks if the button is disabled
        if (styles[id] == "outline-secondary") {
            return false;
        } else {
            return true;
        }
    };

    const multipleOrTrue = () => {
        if (atob(question.type) == "multiple") {
            return (
                <>
                    {newArrayOfQuestions.map((item, id) => {
                        console.log(item);
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
                                    disabled={buttonDisabled(id)}
                                >
                                    {atob(item)}
                                </Button>
                            </ListGroupItem>
                        );
                    })}
                </>
            );
        } else if (atob(question.type) == "boolean") {
            /*
            return (
                <>
                    <ListGroupItem>
                        <Button
                            variant={props.buttonVariants[props.id][0]}
                            key={1}
                            block
                        >
                            True
                        </Button>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button
                            variant={props.buttonVariants[props.id][1]}
                            key={2}
                            block
                        >
                            False
                        </Button>
                    </ListGroupItem>
                </>
            );
            */
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
