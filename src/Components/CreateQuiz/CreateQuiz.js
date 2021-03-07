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
    correctAnswer: (answer) =>
        correctAnswerValidation("Correct Answer", answer),
    wrongAnswer_1: (answer) =>
        correctAnswerValidation("Wrong Answer 1", answer),
    wrongAnswer_2: (answer) => wrongAnswerValidation("Wrong Answer 2", answer),
    wrongAnswer_3: (answer) => wrongAnswerValidation("Wrong Answer 3", answer),
    userName: (name) => userNameValidation("User Name", name),
};

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
    const [errors, setErrors] = useState({
        question: "",
        correctAnswer: "",
        wrongAnswer: ["", "", ""],
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
            return category.map((item) => (
                <option key={item.id}>{item.name}</option>
            ));
        }
    };

    const handleChange = (e) => {
        //this is for handling change for all the components that we want to have form validation on, these are the question, correctAnswer, wrongAnswer and userName
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case "question":
                /*
                if (value.length < 5 || value.includes(" ") == false) {
                    console.log("hi");
                    formErrors.question =
                        "minimum 5 characaters and a space are required";
                } else {
                    formErrors.question =
                        value.length > 151
                            ? "maximum 150 characaters are allowed"
                            : "";
                }*/
                setQuestion(value);
                break;
            case "correctAnswer":
                /* formErrors.correctAnswer =
                   value.length > 120
                        ? "maximum 119 characaters are allowed"
                        : "";*/
                setCorrectAnswer(value);
                break;
            case "userName":
                /*formErrors.userName =
                    value.length < 3 ? "minimum 3 characaters required" : "";*/
                break;
            default:
                break;
        }
        setTouched({
            ...touched,
            [name]: true,
        });
    };

    const handleBlur = (evt) => {
        const { name, value } = evt.target;

        // remove whatever error was there previously
        const { [name]: removedError, ...rest } = errors;

        // check for a new error
        const error = validate[name](value);

        // // validate the field if the value has been touched
        setErrors({
            ...rest,
            ...(error && { [name]: touched[name] && error }),
        });
    };

    // form submit handler
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(evt);
        /*
        // validate the form
        const formValidation = Object.keys(values).reduce(
            (acc, key) => {
                const newError = validate[key](values[key]);
                const newTouched = { [key]: true };
                return {
                    errors: {
                        ...acc.errors,
                        ...(newError && { [key]: newError }),
                    },
                    touched: {
                        ...acc.touched,
                        ...newTouched,
                    },
                };
            },
            {
                errors: { ...errors },
                touched: { ...touched },
            }
        );
        setErrors(formValidation.errors);
        setTouched(formValidation.touched);

        if (
            !Object.values(formValidation.errors).length && // errors object is empty
            Object.values(formValidation.touched).length ===
                Object.values(values).length && // all fields were touched
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
                                    className={
                                        errors.correctAnswer.length > 0
                                            ? "error"
                                            : null
                                    }
                                />
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
                                    name="wrongAnswer_1"
                                    className={
                                        errors.wrongAnswer[0].length > 0
                                            ? "error"
                                            : null
                                    }
                                />
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
                                    name="wrongAnswer_2"
                                    className={
                                        errors.wrongAnswer[1].length > 0
                                            ? "error"
                                            : null
                                    }
                                />
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
                                    name="wrongAnswer_3"
                                    className={
                                        errors.wrongAnswer[2].length > 0
                                            ? "error"
                                            : null
                                    }
                                />
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
                    <Row>
                        <Col>
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
                        </Col>
                        <Col>
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
                        className={errors.question.length > 0 ? "error" : null}
                    />
                    {errors.question.length > 0 && (
                        <span className="errorMessage">{errors.question}</span>
                    )}
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
                <Row>
                    <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
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
                                onChange={(e) =>
                                    setSelectedDifficulty(e.target.value)
                                }
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
                        className={errors.userName.length > 0 ? "error" : null}
                    />
                </Form.Group>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <div className="mb-2">
                            <Button
                                variant="primary"
                                size="lg"
                                formNoValidate
                                onClick={handleSubmit}
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
