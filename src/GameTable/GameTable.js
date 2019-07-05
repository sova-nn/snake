import React from 'react';
import './game-table.css';

import Row from '../Row/Row';
import Snake from "../Snake/Snake";

export default class Game extends React.Component {
    state = {
        width: 10,
        height: 10,
        snake: [
            [1, 1],
            [1, 2],
            [1, 3]
        ],
        field: Array(10).fill(Array(10).fill(0))
    };


    render() {
        return (
            <div className='gamegrid'>
                <Snake/>
                {this.state.field.map((row, i) => {
                    return <Row key={i} arr={row}/>
                })}

            </div>
        );
    }
}