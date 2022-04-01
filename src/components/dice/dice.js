import React from "react"
import './dice.css'

export const Dice = props => {
    return <button onClick={() => props.markToRoll(props.dice_props.id)} 
                    className={`dice ${props.dice_props.roll ? 'diceToRoll' : ''}`}
                    id={props.dice_props.id}>
                {props.dice_props.value}
            </button>
}

export default Dice
