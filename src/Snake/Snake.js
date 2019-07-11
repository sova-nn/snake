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
            prevButton: 'ArrowRight'
        }
    }

    componentDidUpdate() {
        this.drawSnake();
    }

    componentDidMount() {
        this.drawSnake();
        document.addEventListener('keydown', (event) => this.onKeyPress(event.key));
        this.timer = setInterval(this.noneKeyPress, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }



    drawSnake() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 500, 500);
        ctx.fillStyle = "goldenrod";
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

    //функция для разворота змеи обратно
    snakeRevers = () => {
        const newGrid = this.state.grid;
        newGrid.reverse();
        console.log('Змея перевернулась', newGrid);
        this.setState({grid: newGrid})
    }


    // функиция для обработки команд клавиатуры (используем стрелки)
    // если змее нужно ползти в обратном направлении, у массива меняется порядок на обратный
    // перед ползком идет сравнение с предыдущими координатами
    onKeyPress = (key) => {
        let x = this.state.grid[this.state.grid.length-1][0];
        let y = this.state.grid[this.state.grid.length-1][1];
        let prevX = this.state.grid[this.state.grid.length-2][0];
        let prevY = this.state.grid[this.state.grid.length-2][1];
        let lastX = this.state.grid[0][0];
        let lastY = this.state.grid[0][1];
        const keyName = key;
        console.log('keydown event:   key: ' + keyName);
        switch (keyName) {
            case('ArrowDown'): {
                if ((y+1) === prevY) {
                    //обратный порядок змеи
                    this.snakeRevers();
                    //записываем текущее значение кнопки для продолжения самостоятельного движения
                    this.setState({prevButton: 'ArrowDown'});
                    y = lastY+1;
                }
                else {
                    this.setState({prevButton: 'ArrowDown'});
                    y += 1;
                }
                break;
            }
            case('ArrowRight'): {
                if ((x+1) === prevX) {
                    this.snakeRevers();
                    this.setState({prevButton: 'ArrowRight'});
                    x = lastX+1;
                }
                else {
                    this.setState({prevButton: 'ArrowRight'});
                    x += 1;
                }
                break;
            }
            case('ArrowLeft'): {
                if ((x-1) === prevX) {
                    this.snakeRevers();
                    this.setState({prevButton: 'ArrowLeft'});
                    x = lastX-1;
                }
                else {
                    this.setState({prevButton: 'ArrowLeft'});
                    x -= 1;
                }
                break;
            }
            case('ArrowUp'): {
                if ((y-1) === prevY) {
                    this.snakeRevers();
                    this.setState({prevButton: 'ArrowUp'});
                    y = lastY-1;
                }
                else {
                    this.setState({prevButton: 'ArrowUp'});
                    y -= 1;
                }
                break;
            }
            //при нажатии остальных клавиш
            default:
                alert ('Используйте стрелки для движения змеи');
                return 1;
        }

        if ((x === 10) || (y === 10) || (x === -1) || (y === -1)) {
            alert('Вы проиграли!');
            clearInterval(this.timer);
            return 1;
        }

        const newCoords = [x,y];
        console.log('новая координата для ползка', newCoords);
        this.move(newCoords);
    }


    //для самостоятельного движения
    noneKeyPress = () => {
        this.onKeyPress(this.state.prevButton)
    }

    //для окончания игры
    handleClick = () => {
        clearInterval(this.timer);
    }

    render() {

        return (
            <div className='snake'>
                <canvas ref="canvas" width={500} height={500} />
                <button onClick={this.handleClick}>Остановить игру</button>
            </div>

        );
    }
}