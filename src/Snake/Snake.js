import React from 'react';
import './snake.css';

const step = 50;

function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}


export default class Snake extends React.Component {

    componentDidMount() {
        this.drawSnake()
    }

    componentDidUpdate() {
        this.drawSnake()
    }

    //отображаем змею на основе state
    drawSnake() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 500, 500);
        ctx.fillStyle = "goldenrod";
        // отобразить "дочерние" компоненты
        this.props.snake.map((el) => {
            return rect({ctx, x: el[0]*step, y: el[1]*step, width: 50, height: 50});
        });
    }

    render() {

        return (
            <div className='snake'>
                <canvas ref="canvas" width={500} height={500} />
            </div>

        );
    }
}