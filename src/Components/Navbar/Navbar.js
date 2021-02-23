import React, { useState } from "react";
import {
    Container,
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div>
            <Navbar
                collapseOnSelect
                expand="md"
                bg="dark"
                variant="dark"
                fixed="top"
                expanded={expanded}
            >
                <Container>
                    <Link to="/">
                        <Navbar.Brand href="#home">Quiz</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle
                        aria-controls="responsive-navbar-nav"
                        onClick={() =>
                            setExpanded(expanded ? false : "expanded")
                        }
                    />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/">
                                <Nav.Link href="#home">Home</Nav.Link>
                            </Link>
                            <Link to="/quizes">
                                <Nav.Link href="#Quizes">Quizes</Nav.Link>
                            </Link>
                            <Link to="/create">
                                <Nav.Link href="#Create">Create</Nav.Link>
                            </Link>
                        </Nav>
                        <Form inline>
                            <FormControl
                                type="text"
                                placeholder="Search Quizes"
                                className="mr-sm-2"
                            />
                            <Button
                                className={expanded ? "search-button" : null}
                                variant="outline-info"
                            >
                                Search
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;
