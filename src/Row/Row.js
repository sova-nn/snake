import React from 'react';
import './row.css';

import Col from '../Col/Col';

export default class Row extends React.Component{
    render() {
        return(
            <div className='row'>
                {this.props.arr.map((el, id) => {
                    return <Col key={id}/>
                })}
            </div>
        );
    }
}