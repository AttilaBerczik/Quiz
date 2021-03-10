import React, { useState, useEffect } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import "./CreateQuiz.css";

const questionValidation = (fieldName, fieldValue) => {
    //quetion validation
    if (fieldValue.trim() === "") {
        return `${fieldName} is required`;
    }
    if (fieldValue.trim().length < 4) {
        return `${fieldName} needs to be at least three characters`;
    }
    if (fieldValue.trim().includes(" ") == false) {
        return `${fieldName} needs to contain at least a space`;
    }
    if (fieldValue.trim().length > 150) {
        return `${fieldName} needs to be maximum 150 characters long`;
    }
    return null;
};
const correctAnswerValidation = (fieldName, fieldValue) => {
    //correctAnswer and wrongAnswer 1 validation
    if (fieldValue.trim() === "") {
        return `${fieldName} is required`;
    }
    if (fieldValue.trim().length > 120) {
        return `${fieldName} needs to be maximum 120 characters long`;
    }
    return null;
};
const wrongAnswerValidation = (fieldName, fieldValue) => {
    //wrongAnswer 2, 3 validation
    if (fieldValue.trim().length > 120) {
        return `${fieldName} needs to be maximum 120 characters long`;
    }
    return null;
};
const userNameValidation = (fieldName, fieldValue) => {
    //userName validation
    if (fieldValue.trim() === "") {
        return `${fieldName} is required`;
    }
    if (fieldValue.trim().length > 20) {
        return `${fieldName} needs to be maximum 20 characters long`;
    }
    if (fieldValue.trim().length < 4) {
        return `${fieldName} needs to be at least three characters`;
    }
    return null;
};
const validate = {
    question: (question) => questionValidation("Question", question),
    correctAnswer: (answer) => correctAnswerValidation("Correct Answer", answer),
    wrongAnswer1: (answer) => correctAnswerValidation("Wrong Answer 1", answer),
    wrongAnswer2: (answer) => wrongAnswerValidation("Wrong Answer 2", answer),
    wrongAnswer3: (answer) => wrongAnswerValidation("Wrong Answer 3", answer),
    userName: (name) => userNameValidation("User Name", name),
};

const CreateQuiz = () => {
    const [categoryData, setCategoryData] = useState();
    const [question, setQuestion] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("General Knowledge");
    const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
    const [selectedType, setSelectedType] = useState("Multiple Choice");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [wrongAnswer, setWrongAnswer] = useState([]);
    const [userName, setUserName] = useState("");
    const [errors, setErrors] = useState({
        question: "",
        correctAnswer: "",
        wrongAnswer1: "",
        wrongAnswer2: "",
        wrongAnswer3: "",
        userName: "",
    });
    const [touched, setTouched] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://opentdb.com/api_category.php");
            setCategoryData(result.data.trivia_categories);
        };

        fetchData();
    }, []);

    const mapCategory = (category) => {
        if (category != undefined) {
            return category.map((item) => <option key={item.id}>{item.name}</option>);
        }
    };

    const handleChange = (e) => {
        //this is for handling change for all the components that we want to have form validation on, these are the question, correctAnswer, wrongAnswer and userName
        e.preventDefault();
        const { name, value } = e.target;
        let wrongAnswerCopy = [...wrongAnswer];
        switch (name) {
            case "question":
                setQuestion(value);
                break;
            case "correctAnswer":
                setCorrectAnswer(value);
                break;
            case "userName":
                setUserName(value);
                break;
            case "wrongAnswer1":
                wrongAnswerCopy[0] = value;
                setWrongAnswer(wrongAnswerCopy);
                break;
            case "wrongAnswer2":
                wrongAnswerCopy[1] = value;
                setWrongAnswer(wrongAnswerCopy);
                break;
            case "wrongAnswer3":
                wrongAnswerCopy[2] = value;
                setWrongAnswer(wrongAnswerCopy);
                break;
            default:
                break;
        }
        setTouched({
            ...touched,
            [name]: true,
        });
        //if the error has been resolved or it's different we remove it
        const { [name]: removedError, ...rest } = errors;
        const error = validate[name](value);
        if (error == null) {
            setErrors({
                ...rest,
                ...(error && { [name]: touched[name] && error }),
            });
        } else if (errors[name] != null && errors[name] != error) {
            setErrors({
                ...rest,
                ...(error && { [name]: touched[name] && error }),
            });
        }
    };

    const handleBlur = (evt) => {
        const { name, value } = evt.target;

        // remove whatever error was there previously
        const { [name]: removedError, ...rest } = errors;
        // check for a new error
        const error = validate[name](value);
        setErrors({
            ...rest,
            ...(error && { [name]: touched[name] && error }),
        });
    };

    const handleSubmit = (evt) => {
        // form submit handler
        evt.preventDefault();
        // make all the errors visible
        let checkErrors = {};
        const keys = ["question", "correctAnswer", "userName", "wrongAnswer1", "wrongAnswer2", "wrongAnswer3"];
        for (let i = 0; i < keys.length; i++) {
            const name = keys[i];
            const getValue = (n) => {
                switch (n) {
                    case "question":
                        return question;
                        break;
                    case "correctAnswer":
                        return correctAnswer;
                        break;
                    case "userName":
                        return userName;
                        break;
                    case "wrongAnswer1":
                        return wrongAnswer[0];
                        break;
                    case "wrongAnswer2":
                        return wrongAnswer[1];
                        break;
                    case "wrongAnswer3":
                        return wrongAnswer[2];
                        break;
                    default:
                        break;
                }
            };
            const value = getValue(name);
            console.log(name);
            console.log(value);
        }
        setErrors(checkErrors);
        setTouched({
            question: true,
            correctAnswer: true,
            wrongAnswer1: true,
            wrongAnswer2: true,
            wrongAnswer3: true,
            userName: true,
        });

        /*if (
            !Object.values(formValidation.errors).length && // errors object is empty
            Object.values(formValidation.touched).length === Object.values(values).length && // all fields were touched
            Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
        ) {
            alert(JSON.stringify(values, null, 2));
        }*/
    };

    const displayAnswers = () => {
        if (selectedType == "Multiple Choice") {
            return (
                <>
                    <Row>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlSelect4">
                                <Form.Label>Correct answer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Correct answer"
                                    value={correctAnswer}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    formNoValidate
                                    name="correctAnswer"
                                    className={touched.correctAnswer && errors.correctAnswer ? "error" : null}
                                />
                                {touched.correctAnswer && errors.correctAnswer ? (
                                    <p className="errorMessage">{errors.correctAnswer}</p>
                                ) : null}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlSelect">
                                <Form.Label>Wrong answers</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Wrong answer 1"
                                    value={wrongAnswer[0]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    formNoValidate
                                    name="wrongAnswer1"
                                    className={touched.wrongAnswer1 && errors.wrongAnswer1 ? "error" : null}
                                />
                                {touched.wrongAnswer1 && errors.wrongAnswer1 ? <p className="errorMessage">{errors.wrongAnswer1}</p> : null}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlSelect">
                                <Form.Control
                                    type="text"
                                    placeholder="Wrong answer 2 (optional)"
                                    value={wrongAnswer[1]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    formNoValidate
                                    name="wrongAnswer2"
                                    className={touched.wrongAnswer2 && errors.wrongAnswer2 ? "error" : null}
                                />
                                {touched.wrongAnswer2 && errors.wrongAnswer2 ? <p className="errorMessage">{errors.wrongAnswer2}</p> : null}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlSelect">
                                <Form.Control
                                    type="text"
                                    placeholder="Wrong answer 3 (optional)"
                                    value={wrongAnswer[2]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    formNoValidate
                                    name="wrongAnswer3"
                                    className={touched.wrongAnswer3 && errors.wrongAnswer3 ? "error" : null}
                                />
                                {touched.wrongAnswer3 && errors.wrongAnswer3 ? <p className="errorMessage">{errors.wrongAnswer3}</p> : null}
                            </Form.Group>
                        </Col>
                    </Row>
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
                    } else if (goalAnswer == "False" && correctAnswer == "False") {
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
                    } else if (goalAnswer == "False" && wrongAnswer[0] == "False") {
                        setWrongAnswer(["True"]);
                    }
                }
            };

            return (
                <>
                    <Row>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Correct answer</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={correctAnswer}
                                    onChange={(e) => calculateCorrectAnswer(e.target.value)}
                                    formNoValidate
                                >
                                    <option>True</option>
                                    <option>False</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Wrong answer</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={wrongAnswer[0]}
                                    onChange={(e) => calculateWrongAnswer(e.target.value)}
                                    formNoValidate
                                >
                                    <option>False</option>
                                    <option>True</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
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

    return (
        <Container className="create-container">
            <h1>Create your own question!</h1>
            <Form autoComplete="off">
                <Form.Group>
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your question"
                        value={question}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        formNoValidate
                        name="question"
                        className={touched.question && errors.question ? "error" : null}
                    />
                    {touched.question && errors.question ? <p className="errorMessage">{errors.question}</p> : null}
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" value={selectedType} onChange={(e) => changeType(e.target.value)} formNoValidate>
                        <option>Multiple Choice</option>
                        <option>True / False</option>
                    </Form.Control>
                </Form.Group>
                {displayAnswers()}
                <Row>
                    <Col>
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
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your name"
                        value={userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        formNoValidate
                        name="userName"
                        className={touched.userName && errors.userName ? "error" : null}
                    />
                    {touched.userName && errors.userName ? <p className="errorMessage">{errors.userName}</p> : null}
                </Form.Group>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <div className="mb-2">
                            <Button variant="primary" size="lg" formNoValidate onClick={handleSubmit}>
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
