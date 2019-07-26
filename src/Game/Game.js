import _ from 'underscore';
import React from 'react';

import GameTable from '../GameTable/GameTable';
import Snake from "../Snake/Snake";
import Apples from "../Apples/Apples";

const BOX_SIZE = 10;

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
            field: Array(BOX_SIZE).fill(Array(BOX_SIZE).fill(0)),
            prevButton: 'ArrowRight',
            eat: false
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', (event) => this.snakeMove(event.key));
        this.timer = setInterval(this.snakeMove, 900);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        window.removeEventListener('keydown', this.snakeMove);
    }

    //изменение state змеи - удаляем первый элемент массива, увеличиваем последний
    move = (newStepCoords) => {
        const newGrid = this.state.snake;
        newGrid.splice(newGrid.length,0, newStepCoords);
        newGrid.splice(0,1);
        this.setState({snake: newGrid})
    }

    //функция для удлиннения змеи
    makeTheSnakeLonger = (newStepCoords) => {
        const newGrid = this.state.snake;
        newGrid.splice(newGrid.length,0, newStepCoords);
        this.setState({snake: newGrid, eat: false})
    }

    //функция для разворота змеи обратно
    snakeRevers = () => {
        const newGrid = this.state.snake;
        newGrid.reverse();
        this.setState({snake: newGrid})
    }

    // функиция для расчета координат на основе нажатой стрелки или (если стрелка не нажата) на основе state.prevButton
    // если змее нужно ползти в обратном направлении, у массива меняется порядок на обратный
    // перед ползком идет сравнение с предыдущими координатами
    // если не нажато ничего, считаем, что нажата предыдущая стрелка
    nextCoords = (key) => {
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

        //проверяем, нет ли рядом яблока, если есть, выставляем флаг
        this.whereIsAnApple(newCoords);

        return newCoords;
    }

    //функция для итогового движения змеи
    snakeMove = (key) => {
        const coords = this.nextCoords(key || this.state.prevButton);
        console.log(coords);
        (this.state.eat)&&this.deleteTheApple(coords);
        (this.state.eat)?this.makeTheSnakeLonger(coords):this.move(coords);
    }

    //удаляем яблоко из массива при съедении
    deleteTheApple = (apple) => {
        let newApples = this.state.apples;
        let newApplesMod = _.reject(newApples, (arr) => { return ((arr[0] === apple[0]) && (arr[1] === apple[1]))});

        this.setState({apples: newApplesMod});
    }

    //для окончания игры
    handleClick = () => {
        clearInterval(this.timer);
    }

    whereIsAnApple = (head) => {
        const apples = this.state.apples;
        apples.map(apple => ((_.isEqual(apple,head)) && this.setState({eat:true})));
    }


    render() {

        return(
            <div>
                <Snake snake={this.state.snake}/>
                <Apples apples={this.state.apples}/>
                <GameTable field={this.state.field}/>

                <button onClick={this.handleClick}>Остановить игру</button>

                <div>
                    {(_.isEmpty(this.state.apples)) && (
                        <div>Вы выиграли, поздравляем!</div>
                    )}
                </div>
            </div>
        );
    }
}