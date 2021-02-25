import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Quizes from "./Components/Quizes/Quizes";
import CreateQuiz from "./Components/CreateQuiz/CreateQuiz";
import Questions from "./Components/Questions/Questions";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <Route path="/" exact component={Home} />
                <Route path="/quizes" exact component={Quizes} />
                <Route path="/create" exact component={CreateQuiz} />
                <Route
                    exact
                    path="/q/:categoryID/:difficulty/:type/:numberOfQuestions"
                    component={Questions}
                />
            </div>
        </BrowserRouter>
    );
};

export default App;
