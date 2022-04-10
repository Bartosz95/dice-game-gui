import React from "react"
import { Button } from 'react-bootstrap';
import './dice.css'

export const Dice = props => {
    return <Button onClick={() => props.markDiceToRoll(props.dice_props.id)} 
                    variant={((props.numberOfRoll === 0) || (props.numberOfRoll === 3)) ? "outline-success" : "success" } 
                    className={` dice${props.dice_props.roll ? ' diceToRoll' : ''}`}
                    id={props.dice_props.id}
                    disabled={(props.numberOfRoll === 0) || (props.numberOfRoll === 3)} >
                {props.dice_props.value}
            </Button>
}

export default Dice
