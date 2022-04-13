import React, { Component } from "react";
import { Container, Button, ButtonGroup, ListGroup, Row, Col, Badge } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './game.css'
import Dice from '../dice/dice'
import GameTable from '../table/GameTable'
import AlertMessage from '../alerts/AlertMessage'



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
        alertMessage: null
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
        if(this.state.numberOfRoll === 0) {
            this.setState({ dicesToChange: ['0','1','2','3','4'] })
        }
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
                roll: this.state.numberOfRoll === 0
            })
        }
        this.setState({ mug: mug })

        this.setState({ dicesToChange: [] })
        this.setState({ chosenFigure: null })
    }

    componentDidMount() {
        this.getGame()
    }

    markDiceToRoll(diceID) {
        if((this.state.numberOfRoll === 0) || (this.state.numberOfRoll === 3)) return;
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
            if((body.level === 'warning') || (body.level === 'error')) {
                this.setState({ alertMessage: body })
            } else {
                this.getGame()
            }
        } catch (err) {
            this.setState({ level: 'error', alertMessage: { error: err.message }})
        }
    }

    markFigureTochoose(figureID) {
        this.setState({ chosenFigure: this.state.chosenFigure === figureID ? null : figureID })
    }

    async chooseFigure() {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chosenFigure: this.state.chosenFigure })
            };
            // todo change playerID and gameID later 
            const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/${this.state.currentPlayer}/game/${this.state.gameID}`, requestOptions)
            const body = await response.json();
            if((body.level === 'warning') || (body.level === 'error')) {
                this.setState({ alertMessage: body })
            } else {
                this.getGame()
            }
        } catch (err) {
            this.setState({ level: 'error', alertMessage: { error: err.message }})
        }
    }

    render() {
        const mug = this.state.mug.map(dice => 
            <Dice 
                key={dice.id} 
                dice_props={dice} 
                numberOfRoll={this.state.numberOfRoll} 
                markDiceToRoll={this.markDiceToRoll.bind(this)}
            />)
        const table = <GameTable 
                        players={this.state.players} 
                        currentPlayer={ this.state.numberOfRoll === 0 ? null : this.state.currentPlayer} 
                        chosenFigure={this.state.chosenFigure} 
                        markFigureTochoose={this.markFigureTochoose.bind(this)}
                    />
        const alertMessage = this.state.alertMessage ? <AlertMessage elems={this.state.alertMessage} /> : ''
        return ( <Container fluid className="dice-game-container">
                {alertMessage}
                <Row>
                    <Col>
                    <Row>
                        <Col><h1>Player: {this.state.currentPlayer}</h1></Col>
                        <Col><Badge pill bg="secondary" className="turn">Turn: {this.state.numberOfTurn}</Badge></Col>
                    </Row>
                    <Row>{mug}</Row>
                    <Row>
                        <ButtonGroup aria-label="Basic example">
                        <Button 
                            onClick={this.rollTheDices.bind(this)} 
                            variant={(this.state.numberOfRoll === 0) || (this.state.dicesToChange.length !== 0) ?  "success" : "outline-secondary"} 
                            disabled={(this.state.numberOfRoll === 3) || ((this.state.dicesToChange.length === 0) && this.state.numberOfRoll !== 0)}>
                            {this.state.chosenFigure ? "You cannot roll dices if you choose a figure" : 
                            (this.state.numberOfRoll === 3 ? "You don't have next roll" : 
                            (this.state.numberOfRoll === 0 ? "Roll all dices" : 
                            (this.state.dicesToChange.length === 0 ? "Choose dices to roll" : 
                            (this.state.numberOfRoll === 2 ? "Roll dices secound time" : "Roll dices last time"))))}
                        </Button>
                        <Button 
                            onClick={this.chooseFigure.bind(this)} 
                            variant={this.state.chosenFigure ? "success" : "outline-secondary"} 
                            disabled={(this.state.numberOfRoll === 0) || !this.state.chosenFigure}>
                                {this.state.numberOfRoll === 0 ? "You have to roll all dices" : 
                                (this.state.chosenFigure ? "Save figure" : 
                                "Choose figure to save")}
                        </Button>
                        </ButtonGroup>
                    </Row>
                    </Col>
                    <Col>
                        {table}
                    </Col>
                </Row>
        </Container>)
    }
}