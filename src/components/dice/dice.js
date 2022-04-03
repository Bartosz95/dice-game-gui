import React from "react"
import { Button } from 'react-bootstrap';
import './dice.css'

export const Dice = props => {
    return <Button onClick={() => props.markDiceToRoll(props.dice_props.id)} 
                    className={`btn-success dice${props.dice_props.roll ? ' diceToRoll' : ''}`}
                    id={props.dice_props.id}>
                {props.dice_props.value}
            </Button>
}

export default Dice
