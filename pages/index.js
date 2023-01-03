import React from "react";
import Draggable from 'react-draggable';

const circles = [
    { id: 1, x: 50, y: 50 },
    { id: 2, x: 100, y: 100 }
]

class Circle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color,
            startX: 0,
            startY: 0,
            coordinates: []
        }
    }

    handleStart = (event) => {
        this.setState({
            startX: event.clientX,
            startY: event.clientY
        })
    }

    handleStop = (event) => {
        let coordinates = [event.clientX - this.state.startX, event.clientY - this.state.startY]
        this.setState({
            coordinates: [coordinates[0], coordinates[1]]
        })
    }

    render() {
        return (
            <Draggable axis="x" scale={1} onStart={this.handleStart} onStop={this.handleStop}>
                <circle cx={this.props.x} cy={this.props.y} r={this.props.radius} fill={this.state.color} onMouseDown={this.handlePress}/>
            </Draggable>
            )
    }
}

export default function App() {
  return (
    <div className="App">
        <svg width="400" height="400" style={{border: "1px solid black"}}>
            {circles.map((circle) => <Circle id={circle.id} x={circle.x} y={circle.y} radius={15} color="black" />)}
        </svg>
    </div>
  );
}
