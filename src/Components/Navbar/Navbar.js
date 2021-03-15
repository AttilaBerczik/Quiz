import React, { useState } from "react";
import { Container, Navbar, Nav, Form, FormControl, Button, Image } from "react-bootstrap";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [expanded, setExpanded] = useState(false);
    const user = null;
    return (
        <div>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top" expanded={expanded} className="top-nav">
                <Container>
                    <Link to="/">
                        <Navbar.Brand href="#home">Quiz</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
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
                        <Navbar.Text>
                            {user ? (
                                <div className="profile">
                                    {user.result.imageUrl ? (
                                        <Image src={user.result.imageUrl} className="avatar" alt={user.result.name} roundedCircle />
                                    ) : (
                                        <div className="avatar-circle">
                                            <span className="initials">{user.result.name.charAt(0)}</span>
                                        </div>
                                    )}
                                    <p className="h6 userName">{user.result.name}</p>
                                    <Button variant="outline-info" className="logout-button">
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Link to="/auth">
                                    <Button variant="outline-info" className="signin-button">
                                        Sign In
                                    </Button>
                                </Link>
                            )}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;
