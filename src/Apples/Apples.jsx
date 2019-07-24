import React from 'react';
import './apples.css';

const step = 50;


export default class Apples extends React.Component {


    componentDidMount() {
        this.drawApples(this.props.apples);
    }

    componentDidUpdate() {
        this.drawApples(this.props.apples);
    }


    rect(params) {
        const {ctx, x, y, width, height} = params;
        ctx.fillRect(x, y, width, height);
    }

    drawApples = (apples) => {

        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 500, 500);
        ctx.fillStyle = "orchid";
        // отобразить "дочерние" компоненты
        apples.map((el) => {
            return this.rect({ctx, x: el[0]*step, y: el[1]*step, width: 50, height: 50});
        });
        console.log('Это сейчас в яблоках', this.props.apples);
    }



    render() {

        return (
            <div className='apples'>
                <canvas ref="canvas" width={500} height={500}/>
            </div>

        );
    }

}