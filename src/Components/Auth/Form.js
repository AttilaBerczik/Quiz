import React from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";

const FormGrid = ({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => {
    return (
        <Container>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Row className="justify-content-center">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label htmlFor="first-name-input">
                            User Name *
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="first-name-input"
                                placeholder="Enter first name"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="firstName"
                                required
                            />
                            {touched.firstName && errors.firstName}
                        </Form.Label>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center">
                    <Form.Group>
                        <Form.Label htmlFor="email">
                            Email address *
                            <Form.Control
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                required
                            />
                            {touched.email && errors.email}
                        </Form.Label>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center">
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Row>
                <Row className="justify-content-center">
                        <Button variant="primary" size="lg" type="submit">
                            Submit
                        </Button>
                </Row>
            </Form>
        </Container>
    );
};

export default FormGrid;
