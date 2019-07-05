import React from 'react';
import './snake.css';

const step = 50;
const grid = [
    [1,1],
    [2,1],
    [3,1] //это - голова змеи
];

function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}


export default class Snake extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            grid: grid,
        }
    }

    componentDidUpdate() {
        this.drawSnake();
    }

    componentDidMount() {
        this.drawSnake();
        document.addEventListener('keydown', (event) => this.onKeyPress(event));
    }



    drawSnake() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 500, 500);
        ctx.fillStyle = "burlywood";
        // отобразить "дочерние" компоненты
        this.state.grid.map((el) => {
            return rect({ctx, x: el[0]*step, y: el[1]*step, width: 50, height: 50});
        });
    }

    //само движение - удаляем первый элемент массива, увеличиваем последний
    move = (newStepCoords) => {
        const newGrid = this.state.grid;
        newGrid.splice(newGrid.length,0, newStepCoords);
        newGrid.splice(0,1);
        console.log(newGrid);
        this.setState({grid: newGrid})
    }


    // функиция для обработки команд клавиатуры (используем стрелки)
    onKeyPress = (event) => {
        let x = this.state.grid[this.state.grid.length-1][0];
        let y = this.state.grid[this.state.grid.length-1][1];
        const keyName = event.key;
        console.log('keydown event\n\n' + 'key: ' + keyName);
        switch (keyName) {
            case('ArrowDown'): {
                y += 1;
                break;
            }
            case('ArrowRight'): {
                x += 1;
                break;
            }
            case('ArrowLeft'): {
                x -= 1;
                break;
            }
            case('ArrowUp'): {
                y -= 1;
                break;
            }
            default:
                x += 1;
        }
        const newCoords = [x,y];
        console.log(newCoords);
        this.move(newCoords);


    }

    render() {
        return (
            <div className='snake'>
                <canvas ref="canvas" width={500} height={500} />
                <button onClick={this.move}>Нажми меня</button>
            </div>

        );
    }
}