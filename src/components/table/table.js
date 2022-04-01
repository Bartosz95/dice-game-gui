import React from "react";
import './table.css'
import Dice from '../dice/dice'

export default class Table extends React.Component {
    state = {
        dices: [
            {id: '1', number: '1', roll: false},
            {id: '2', number: '3', roll: false},
            {id: '3', number: '6', roll: false},
            {id: '4', number: '2', roll: false},
            {id: '5', number: '1', roll: false},

        ]
    }

    markToRoll(id) {
        const newDices = this.state.dices.map( dice => { 
            dice.roll = dice.id == id ? !dice.roll : dice.roll; 
            return dice
        })
        this.setState({dices: newDices})
    }

    render() {
        const dices = this.state.dices.map(dice => <Dice key={dice.id} dice_props={dice} markToRoll={this.markToRoll.bind(this)}/> )
        return (
        <div className="table">{dices} </div>)
        ;
    }
}