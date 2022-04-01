import React, { Component } from "react";
import './game.css'
import Dice from '../dice/dice'

export default class Game extends Component {
    state = {
        currentPlayer: null,
        indexOfFirstPlayer: null,
        isActive: true,
        mug:[{
                id: 0,
                value: null,
                roll: false
            },{
                id: 1,
                value: null,
                roll: false
            },{
                id: 2,
                value: null,
                roll: false
            },{
                id: 3,
                value: null,
                roll: false
            },{ 
                id: 4,
                value: null,
                roll: false
            }
        ],
        numberOfRoll: null,
        numberOfTurn: null,
        playerIDs: null,
        players: null,
        id: null
    }

    async getGame() {
        const response = await fetch('http://127.0.0.1:3001/api/v1/user/1/game/624769a7d673c4335ea6f2d2')
        let body = await response.text();
        body = JSON.parse(body);
        this.setState({ id: body._id });
        const game = body.game

        this.setState({ currentPlayer: game.currentPlayer });
        this.setState({ indexOfFirstPlayer: game.indexOfFirstPlayer });
        this.setState({ isActive: game.isActive });
        for (const [id, value] of Object.entries(game.mug)) {
            const dice = this.state.mug.find(dice => dice.id == id)
            dice.value = value
        }
        this.setState({ numberOfRoll: game.numberOfRoll });
        this.setState({ numberOfTurn: game.numberOfTurn });
        this.setState({ playerIDs: game.playerIDs });
        this.setState({ players: game.players });
        
    }

    componentDidMount() {
        this.getGame()
    }

    markToRoll(id) {
        const dice = this.state.mug.find(dice => dice.id == id)
        dice.roll = !dice.roll
        this.setState( {game: this.state.mug})
    }

    render() {
        const mug = this.state.mug.map(dice => <Dice key={dice.id} dice_props={dice} markToRoll={this.markToRoll.bind(this)}/> ) 
        return (
            <div className="table">
                <p>Player: {this.state.currentPlayer}</p> 
                {mug}
            </div>
        )
        ;
    }
}