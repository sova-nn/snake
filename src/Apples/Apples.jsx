import React from 'react';
import './apples.css';

const step = 50;


function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}

export default class Apples extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: this.props.apples
        }
    }

    componentDidMount() {
        this.drawApples();
    }

    drawApples() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 500, 500);
        ctx.fillStyle = "orchid";
        // отобразить "дочерние" компоненты
        this.state.grid.map((el) => {
            return rect({ctx, x: el[0]*step, y: el[1]*step, width: 50, height: 50});
        });
    }



    render() {

        return (
            <div className='apples'>
                <canvas ref="canvas" width={500} height={500} />
            </div>

        );
    }

}