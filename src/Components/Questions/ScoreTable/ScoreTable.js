import React from "react";
import { Table } from "react-bootstrap";
import "./ScoreTable.css";

const ScoreTable = ({ buttonVariants }) => {
    //count the number of successes and fails from the state
    const count = () => {
        //create an array which we will return
        //the first is the corrects, the second is the fails
        let toReturn = [0, 0];
        for (var i = 0; i < buttonVariants.length; i++) {
            for (var j = 0; j < buttonVariants[i].length; j++) {
                if (buttonVariants[i][j] == "outline-success") {
                    toReturn[0] = toReturn[0] + 1;
                } else if (buttonVariants[i][j] == "success") {
                    toReturn[1] = toReturn[1] + 1;
                }
            }
        }
        return toReturn;
    };

    return (
        <Table striped bordered hover variant="dark" className="scores">
            <tbody className="score-table">
                <tr>
                    <td>
                        <p>Corrects</p>
                    </td>
                    <td>
                        <p>Fails</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>{count()[0]}</p>
                    </td>
                    <td>
                        <p>{count()[1]}</p>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};

export default ScoreTable;
