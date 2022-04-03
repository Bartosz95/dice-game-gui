import React, { Component } from "react";

import { Container, Row, Col, Button, ButtonGroup, ListGroup } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './game.css'
import Dice from '../dice/dice'
import Table from '../table/table'
import Tip from '../alerts/Tip'
import ErrorReqest from '../alerts/ErrorReqest'



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
        gameID: null,

        dicesToChange: [],
        chosenFigure: null,
        tip: null,
        error: null
    }

    async getGame() {
        const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/1/game/6249a4e96fa532d7972c34cd`)
        let body = await response.json();
        this.setState( {gameID: body._id });
        const game = body.game
        this.setState({ currentPlayer: game.currentPlayer });
        this.setState({ indexOfFirstPlayer: game.indexOfFirstPlayer });
        this.setState({ isActive: game.isActive });
        this.setState({ numberOfRoll: game.numberOfRoll });
        this.setState({ numberOfTurn: game.numberOfTurn });
        this.setState({ playerIDs: game.playerIDs });
        const players = []
        for (const [playerID, value] of Object.entries(game.players)) {
            players.push({
                id: playerID,
                table: value.table,
            })
        }
        this.setState({ players: players });

        const mug = []
        for (const [gameID, value] of Object.entries(game.mug)) {
            mug.push({
                id: gameID,
                value: value,
                roll: false
            })
        }
        this.setState({ mug: mug })
    }

    componentDidMount() {
        this.getGame()
    }

    markDiceToRoll(diceID) {
        const dice = this.state.mug.find(dice => dice.id === diceID)
        dice.roll = !dice.roll
        if(dice.roll) {
            this.state.dicesToChange.push(diceID)
        } else {
            this.state.dicesToChange = this.state.dicesToChange.filter( id => id !== diceID )
        }
        this.setState({ dicesToChange: this.state.dicesToChange})
        this.setState({ mug: this.state.mug})
    }

    async rollTheDices() {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numbersToChange: this.state.dicesToChange })
            };
            // todo change playerID and gameID later 
            const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/${this.state.currentPlayer}/game/${this.state.gameID}`, requestOptions)
            const body = await response.json();
            if(body.tip) {
                this.setState({ tip: body })
            } else  if(body.error) {
                this.setState({ error: body })
            } else {
                this.setState({ tip: null })
                this.setState({ error: null })
                const mug = []
                const game = body
                this.setState({ numberOfRoll: game.numberOfRoll });
                for (const [diceID, value] of Object.entries(game.mug)) {
                    mug.push({
                        id: diceID,
                        value: value,
                        roll: false
                    })
                }
                this.setState({ mug: mug })
            }
        } catch (err) {
            this.setState({ error: { error: err.message }})
        }
        this.setState({ dicesToChange: [] })
        this.setState({ chosenFigure: null })
    }

    markFigureTochose(figureID) {
        this.setState({ chosenFigure: figureID })
    }

    async choseFigure() {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chosenFigure: this.state.chosenFigure })
            };
            // todo change playerID and gameID later 
            const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/${this.state.currentPlayer}/game/${this.state.gameID}`, requestOptions)
            const body = await response.json();
            if(body.tip) {
                this.setState({ tip: body })
            } else  if(body.error) {
                this.setState({ error: body })
            } else {
                this.setState({ tip: null })
                this.setState({ error: null })
                const game = body
                this.setState({ currentPlayer: game.currentPlayer });
                this.setState({ indexOfFirstPlayer: game.indexOfFirstPlayer });
                this.setState({ isActive: game.isActive });
                this.setState({ numberOfRoll: game.numberOfRoll });
                this.setState({ numberOfTurn: game.numberOfTurn });
                const players = []
                for (const [playerID, table] of Object.entries(game.players)) {
                    players.push({
                        id: playerID,
                        table: table.table,
                    })
                }
                this.setState({ players: players });
            }
        } catch (err) {
            this.setState({ error: { error: err.message }})
        }
    }

    render() {
        const mug = this.state.mug.map(dice => <Dice key={dice.id} dice_props={dice} markDiceToRoll={this.markDiceToRoll.bind(this)}/> ) 
        const tables = <Row key='table'>{this.state.players.map(player => <Col><Table key={player.id} player={player} markFigureTochose={this.markFigureTochose.bind(this)}/></Col> )}</Row>
        const alert = this.state.tip ? <Tip elems={this.state.tip} /> : ''
        const errorReqest = this.state.error ? <ErrorReqest elems={this.state.error} /> : ''
        return ( 
            <div className="table">
                <Container>
                <h1>Player: {this.state.currentPlayer}</h1>
                <ListGroup>
                    <ListGroup.Item>Players: [{this.state.playerIDs.map(id => ` ${id}, `)} ]</ListGroup.Item>
                    <ListGroup.Item>Active game: {this.state.isActive ? 'yes' : 'No'} </ListGroup.Item>
                    <ListGroup.Item>Roll: {this.state.numberOfRoll} </ListGroup.Item>
                    <ListGroup.Item>Turn: {this.state.numberOfTurn} </ListGroup.Item>
                    <ListGroup.Item>Game ID: {this.state.gameID} </ListGroup.Item>
                    <ListGroup.Item>Chosen dices: {this.state.dicesToChange.map(id => `[${id}]`)}</ListGroup.Item>
                    <ListGroup.Item>Chosen figure: {this.state.chosenFigure} </ListGroup.Item>
                </ListGroup>
                {alert}
                {errorReqest}
                {mug}
                <ButtonGroup vertical>
                    <Button onClick={this.rollTheDices.bind(this)} variant="warning">Roll chosen dices</Button>
                    <Button onClick={this.choseFigure.bind(this)} variant="warning">Save chosen figure</Button>
                </ButtonGroup>
                {tables}
                </Container>
            </div>
        )
        ;
    }
}