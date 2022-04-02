import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './game.css'
import Dice from '../dice/dice'
import Table from '../table/table'

export default class Game extends Component {
    state = {
        currentPlayer: null,
        indexOfFirstPlayer: null,
        isActive: true,
        mug:[],
        numberOfRoll: null,
        numberOfTurn: null,
        playerIDs: [],
        players: [],
        id: null
    }

    async getGame() {

        const response = await fetch('http://127.0.0.1:3001/api/v1/user/1/game/624867936365901ad5f29e7e')
        let body = await response.text();
        body = JSON.parse(body);
        this.setState( {id: body._id });
        const game = body.game
        this.setState({ currentPlayer: game.currentPlayer });
        this.setState({ indexOfFirstPlayer: game.indexOfFirstPlayer });
        this.setState({ isActive: game.isActive });
        this.setState({ numberOfRoll: game.numberOfRoll });
        this.setState({ numberOfTurn: game.numberOfTurn });
        this.setState({ playerIDs: game.playerIDs });
        const players = []
        for (const [id, value] of Object.entries(game.players)) {
            players.push({
                id: id,
                table: value.table,
            })
        }
        this.setState({ players: players });

        const mug = []
        for (const [id, value] of Object.entries(game.mug)) {
            mug.push({
                id: id,
                value: value,
                roll: false
            })
        }
        this.setState({ mug: mug })
    }

    componentDidMount() {
        this.getGame()
    }

    markToRoll(id) {
        const dice = this.state.mug.find(dice => dice.id === id)
        dice.roll = !dice.roll
        this.setState( {game: this.state.mug})
    }

    render() {
        const mug = this.state.mug.map(dice => <Dice key={dice.id} dice_props={dice} markToRoll={this.markToRoll.bind(this)}/> ) 
        const tables = this.state.players.map(player => <Table key={player.id} player={player}/>)
        return (
            <div className="table">
                <h1>Player: {this.state.currentPlayer}</h1> 
                {mug}
                {tables}
            </div>
        )
        ;
    }
}