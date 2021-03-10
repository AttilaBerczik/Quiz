import React, { useState, useEffect } from "react";
import "./Quizes.css";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Quizes = () => {
    const [sliderValue, setSliderValue] = useState(10);
    const [categoryData, setCategoryData] = useState();
    const [selectedCategory, setSelectedCategory] = useState("Any");
    const [selectedDifficulty, setSelectedDifficulty] = useState("Any");
    const [selectedType, setSelectedType] = useState("Any");

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

    const getCategoryID = () => {
        if (categoryData != undefined) {
            let searchedID;
            for (var i = 0; i < categoryData.length; i++) {
                if (categoryData[i].name === selectedCategory) {
                    searchedID = categoryData[i].id;
                }
            }
            if (searchedID != undefined) {
                return searchedID;
            } else {
                return "any";
            }
        }
    };

    const getType = () => {
        if (selectedType == "True / False") {
            return "boolean";
        } else {
            return selectedType;
        }
    };

    return (
        <Container className="quizes-container">
            <h1>Start a Quiz</h1>
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                        <option key="any">Any</option>
                        {mapCategory(categoryData)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Control as="select" onChange={(e) => setSelectedDifficulty(e.target.value)} value={selectedDifficulty}>
                        <option>Any</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        <option>Any</option>
                        <option>Multiple Choice</option>
                        <option>True / False</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicRangeCustom">
                    <Form.Label>Number of Questions</Form.Label>
                    <Row className="justify-content-md-center">
                        <Col>
                            <Form.Control
                                value={sliderValue}
                                min={1}
                                max={50}
                                onChange={(changeEvent) => setSliderValue(changeEvent.target.value)}
                                type="range"
                                custom
                            />
                        </Col>
                        <Col lg="1">
                            <Form.Control className="slider-number-output" value={sliderValue} readOnly />
                        </Col>
                    </Row>
                </Form.Group>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <div className="mb-2">
                            <Link to={`/q/${getCategoryID()}/${selectedDifficulty}/${getType()}/${sliderValue}`}>
                                <Button variant="primary" size="lg">
                                    Start Quiz
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default Quizes;
