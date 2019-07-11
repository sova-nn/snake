import React from 'react';
import './game-table.css';

import Row from '../Row/Row';

export default class GameTable extends React.Component {
    state = {
        field: this.props.field
    };




    render() {
        return (
            <div className='gamegrid'>
                {this.state.field.map((row, i) => {
                    return <Row key={i} arr={row}/>
                })}
            </div>
        );
    }
}