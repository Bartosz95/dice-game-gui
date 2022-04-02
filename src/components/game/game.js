import React, { Component } from "react";

import { Container, Row, Col, Button } from 'react-bootstrap';

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
        id: null,
        idToChange: []
    }

    async getGame() {
        const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/1/game/624769a7d673c4335ea6f2d2`)
        let body = await response.text();
        console.log(body)
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
        if(dice.roll) {
            this.state.idToChange.push(id)
        } else {
            this.state.idToChange = this.state.idToChange.filter( diceID => diceID != id )
        }
        this.setState({ idToChange: this.state.idToChange})
        this.setState({ mug: this.state.mug})
    }

    async rollTheDices() {
        console.log(this)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numbersToChange: this.state.idToChange })
        };
        console.log(requestOptions)
        const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/1/game/624769a7d673c4335ea6f2d2`, requestOptions)
        let body = await response.text();
        console.log(body)
        body = JSON.parse(body);
        const mug = []
        const game = body.game
        this.setState({ numberOfRoll: game.numberOfRoll });
        for (const [id, value] of Object.entries(game.mug)) {
            mug.push({
                id: id,
                value: value,
                roll: false
            })
        }
        this.setState({ mug: mug })
        
    }

    render() {
        const mug = this.state.mug.map(dice => <Dice key={dice.id} dice_props={dice} markToRoll={this.markToRoll.bind(this)}/> ) 
        const tables = <Row>{this.state.players.map(player => <Col><Table key={player.id} player={player}/></Col> )}</Row>
        return (
            <div className="table">
                <Container>
                <h1>Player: {this.state.currentPlayer}</h1>
                <p>{this.state.idToChange}</p>
                   
                    {mug}
                    <Button onClick={this.rollTheDices.bind(this)} variant="warning">Roll chosen dices</Button>
                    
                {tables}
                </Container>
            </div>
        )
        ;
    }
}