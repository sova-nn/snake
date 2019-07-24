import _ from 'underscore';
import React from 'react';


import GameTable from '../GameTable/GameTable';
import Snake from "../Snake/Snake";
import Apples from "../Apples/Apples";





export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: 10,
            height: 10,
            snake: [
                [1, 1],
                [1, 2],
                [1, 3]
            ],
            apples: [
                [5,5],
                [7,7],
                [3,8]
            ],
            field: Array(10).fill(Array(10).fill(0)),
            prevButton: 'ArrowRight',
            eat: false
        };
    }



    componentDidMount() {
        document.addEventListener('keydown', (event) => this.onKeyPress(event.key));
        this.timer = setInterval(this.noneKeyPress, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    //само движение - удаляем первый элемент массива, увеличиваем последний
    move = (newStepCoords) => {
        const newGrid = this.state.snake;
        newGrid.splice(newGrid.length,0, newStepCoords);
        newGrid.splice(0,1);
        console.log(newGrid);
        this.setState({snake: newGrid})
    }

    //функция для удлиннения змеи
    makeTheSnakeLonger = (newStepCoords) => {
        const newGrid = this.state.snake;
        newGrid.splice(newGrid.length,0, newStepCoords);
        console.log('Змея изменилась', newGrid);
        this.setState({snake: newGrid, eat: false})
    }

    //функция для разворота змеи обратно
    snakeRevers = () => {
        const newGrid = this.state.snake;
        newGrid.reverse();
        console.log('Змея перевернулась', newGrid);
        this.setState({snake: newGrid})
    }

    // функиция для обработки команд клавиатуры (используем стрелки)
    // если змее нужно ползти в обратном направлении, у массива меняется порядок на обратный
    // перед ползком идет сравнение с предыдущими координатами
    onKeyPress = (key) => {
        let x = this.state.snake[this.state.snake.length-1][0];
        let y = this.state.snake[this.state.snake.length-1][1];
        let prevX = this.state.snake[this.state.snake.length-2][0];
        let prevY = this.state.snake[this.state.snake.length-2][1];
        let lastX = this.state.snake[0][0];
        let lastY = this.state.snake[0][1];
        const keyName = key;
        console.log('keydown event:   key: ' + keyName);
        switch (keyName) {
            case('ArrowDown'): {
                if ((y+1) === prevY) {
                    //обратный порядок змеи
                    this.snakeRevers();
                    y = lastY+1;
                }
                else { y += 1; }
                //записываем текущее значение кнопки для продолжения самостоятельного движения
                this.setState({prevButton: 'ArrowDown'});
                break;
            }
            case('ArrowRight'): {
                if ((x+1) === prevX) {
                    this.snakeRevers();
                    x = lastX+1;
                }
                else { x += 1; }
                this.setState({prevButton: 'ArrowRight'});
                break;
            }
            case('ArrowLeft'): {
                if ((x-1) === prevX) {
                    this.snakeRevers();
                    x = lastX-1;
                }
                else { x -= 1; }
                this.setState({prevButton: 'ArrowLeft'});
                break;
            }
            case('ArrowUp'): {
                if ((y-1) === prevY) {
                    this.snakeRevers();
                    y = lastY-1;
                }
                else { y -= 1; }
                this.setState({prevButton: 'ArrowUp'});
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
        (this.state.eat)?this.makeTheSnakeLonger(newCoords):this.move(newCoords);
    }

    //для самостоятельного движения
    noneKeyPress = () => {
        this.onKeyPress(this.state.prevButton)
    }

    //для окончания игры
    handleClick = () => {
        clearInterval(this.timer);
    }

    //удлинняем змею - перенести функцию в Game
    handleClickSnake = () => {
        this.setState({eat:true})
    }

    deleteTheApple = () => {
        let apple = [5,5];
        let newApples = this.state.apples;
        let newApplesMod = _.reject(newApples, (arr) => { return ((arr[0] === apple[0]) && (arr[1] === apple[1]))});
        console.log('Удаляем яблоко', newApplesMod);
        this.setState({apples: newApplesMod});
    }


    render() {
        return(
            <div>
                <Snake snake={this.state.snake}/>
                <Apples apples={this.state.apples}/>
                <GameTable field={this.state.field}/>

                <button onClick={this.deleteTheApple}>Съесть яблоко</button>
                <br/>
                <button onClick={this.handleClick}>Остановить игру</button>
                <button onClick={this.handleClickSnake}>Удлиннить змею</button>
            </div>
        );
    }
}