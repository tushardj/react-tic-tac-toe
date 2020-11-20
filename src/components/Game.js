import React, {
    Component
} from "react";
import {
    Board
} from "./Board";

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [{
                squares: Array(9).fill()
            }],
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const square = current.squares.slice()
        const winner = calculateWinner(square);
        if (winner || square[i]) {
            return
        }
        square[i] = this.state.xIsNext ? 'x' : 'o';
        this.setState({
            history: history.concat({
                squares: square
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
        console.log(this.state)
    }
    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = "winner is " + winner;
        } else {
            status = "Next Player is " + (this.state.xIsNext ? 'X' : 'o')
        }
        return ( 
            <div className = "game" >
                <div className = 'game-info'> 
                    { status } 
                    </div> 
                <div className = "game-board" >
                    <Board onClick = {
                        (i) => this.handleClick(i)
                        }
                        squares = {
                            current.squares
                        } > 
                    </Board>   
                </div>
            </div> 
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a]
        }
    }
    return null
}