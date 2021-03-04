import React, { useState, useEffect } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import "./CreateQuiz.css";

const CreateQuiz = () => {
    const [categoryData, setCategoryData] = useState();
    const [question, setQuestion] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(
        "General Knowledge"
    );
    const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
    const [selectedType, setSelectedType] = useState("Multiple Choice");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [wrongAnswer, setWrongAnswer] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://opentdb.com/api_category.php");
            setCategoryData(result.data.trivia_categories);
        };

        fetchData();
    }, []);

    const mapCategory = (category) => {
        if (category != undefined) {
            return category.map((item) => (
                <option key={item.id}>{item.name}</option>
            ));
        }
    };

    const displayAnswers = () => {
        if (selectedType == "Multiple Choice") {
            const changeState = (i, value) => {
                //function to change the states of the wrong answers when something is written inside them
                let stateCopy = [...wrongAnswer];
                stateCopy[i] = value;
                setWrongAnswer(stateCopy);
            };
            return (
                <>
                    <Form.Group controlId="exampleForm.ControlSelect4">
                        <Form.Label>Correct answer</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Correct answer"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            formNoValidate
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect">
                        <Form.Label>Wrong answers</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Wrong answer 1"
                            value={wrongAnswer[0]}
                            onChange={(e) => changeState(0, e.target.value)}
                            formNoValidate
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect">
                        <Form.Control
                            type="text"
                            placeholder="Wrong answer 2 (optional)"
                            value={wrongAnswer[1]}
                            onChange={(e) => changeState(1, e.target.value)}
                            formNoValidate
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect">
                        <Form.Control
                            type="text"
                            placeholder="Wrong answer 3 (optional)"
                            value={wrongAnswer[2]}
                            onChange={(e) => changeState(2, e.target.value)}
                            formNoValidate
                        />
                    </Form.Group>
                </>
            );
        } else if (selectedType == "True / False") {
            const calculateWrongAnswer = (goalAnswer) => {
                //function to reverse the value of the correct answer
                if (goalAnswer != wrongAnswer[0]) {
                    //if the goal answer is different than the current one we cange
                    setWrongAnswer([goalAnswer]);
                    if (goalAnswer == "True" && correctAnswer == "True") {
                        setCorrectAnswer("False");
                    } else if (
                        goalAnswer == "False" &&
                        correctAnswer == "False"
                    ) {
                        setCorrectAnswer("True");
                    }
                }
            };

            const calculateCorrectAnswer = (goalAnswer) => {
                //function to reverse the value of the wrong answer
                if (goalAnswer != correctAnswer) {
                    //if the goal answer is different than the current one we cange
                    setCorrectAnswer(goalAnswer);
                    if (goalAnswer == "True" && wrongAnswer[0] == "True") {
                        setWrongAnswer(["False"]);
                    } else if (
                        goalAnswer == "False" &&
                        wrongAnswer[0] == "False"
                    ) {
                        setWrongAnswer(["True"]);
                    }
                }
            };

            return (
                <>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Correct answer</Form.Label>
                        <Form.Control
                            as="select"
                            value={correctAnswer}
                            onChange={(e) =>
                                calculateCorrectAnswer(e.target.value)
                            }
                            formNoValidate
                        >
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Wrong answer</Form.Label>
                        <Form.Control
                            as="select"
                            value={wrongAnswer[0]}
                            onChange={(e) =>
                                calculateWrongAnswer(e.target.value)
                            }
                            formNoValidate
                        >
                            <option>False</option>
                            <option>True</option>
                        </Form.Control>
                    </Form.Group>
                </>
            );
        }
    };

    const changeType = (target) => {
        //need to clear the correct and wrong answers when the user changes type to prevent weird things from happening
        setSelectedType(target);
        if (target == "Multiple Choice") {
            setCorrectAnswer("");
            setWrongAnswer([]);
        } else if (target == "True / False") {
            setCorrectAnswer("True");
            setWrongAnswer(["False"]);
        }
    };

    const questionSubmited = () => {
        //when the user submits the question first we check if all the necessary stuff are filled in
        for (let i = 0; i < 1; i++) {
            //created a loop so I can easily break out and I don't have to nest everything
            console.log(question)
        }
    };

    return (
        <Container className="create-container">
            <h1>Create your own question!</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        formNoValidate
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedType}
                        onChange={(e) => changeType(e.target.value)}
                        formNoValidate
                    >
                        <option>Multiple Choice</option>
                        <option>True / False</option>
                    </Form.Control>
                </Form.Group>
                {displayAnswers()}
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                        formNoValidate
                    >
                        {mapCategory(categoryData)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        value={selectedDifficulty}
                        formNoValidate
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        formNoValidate
                    />
                </Form.Group>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <div className="mb-2">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => questionSubmited()}
                                formNoValidate
                            >
                                Submit your question
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default CreateQuiz;
