import _ from 'underscore';
import React from 'react';


import GameTable from '../GameTable/GameTable';
import Snake from "../Snake/Snake";
import Apples from "../Apples/Apples";


export default class Game extends React.Component{
    constructor(){
        super();
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
            field: Array(10).fill(Array(10).fill(0))
        };
    }

    eatTheApple = () => {
        let apple = [5,5];
        let newApples = this.state.apples;
        let newApplesMod = _.reject(newApples, (arr) => { return ((arr[0] === apple[0]) && (arr[1] === apple[1]))});
        console.log('Змея ест яблоко');
        console.log('Удаляем яблоко', newApplesMod);
        this.setState({apples: newApplesMod});
    }



    render() {
        return(
            <div>
                <Snake snake={this.state.snake}/>
                <Apples apples={this.state.apples}/>
                <GameTable field={this.state.field}/>
                <button onClick={this.eatTheApple}>Съесть яблоко</button>
            </div>
        );
    }
}