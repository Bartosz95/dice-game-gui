import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Badge } from 'react-bootstrap';

import './game.css'
import Dice from './dice/dice'
import GameTable from './table/GameTable'
import AlertMessage from './alerts/AlertMessage'
import WinMessage from "./winMessage/WinMessage";

export default props => {
    
    const [ currentPlayer, setCurrentPlayer] = useState('')
    const [ indexOfFirstPlayer, setIndexOfFirstPlayer] = useState('')
    const [ isActive, setIsActive] = useState(true)
    const [ mug, setMug] = useState([])
    const [ numberOfRoll, setNumberOfRoll] = useState(null)
    const [ numberOfTurn, setNumberOfTurn] = useState(null)
    const [ playerIDs, setPlayerIDs] = useState([])
    const [ players, setPlayers] = useState([])
    const [ gameID, setGameID] = useState(null)
    const [ dicesToChange, setDicesToChange] = useState([])
    const [ chosenFigure, setChosenFigure] = useState(null)
    const [ alertMessage, setAlertMessage] = useState(null)
    const [ level, setLevel] = useState('')

    const getGame = async (force) => {   
        try {
            if(props.keycloak.authenticated && (force || currentPlayer === '')) {
                const gameID = window.location.pathname.split('/').at(-1)
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${props.keycloak.token}`
                    },
                };
                const userInfo = await props.keycloak.loadUserInfo()
                console.log(userInfo)
                const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/${userInfo.sub}/game/${gameID}`, requestOptions)
                let body = await response.json();
                console.log(body)
                const game = body.game
                const players = []
                for (const [playerID, value] of Object.entries(game.players)) {
                    players.push({
                        id: playerID,
                        table: value.table,
                    })
                }
                const mug = []
                for (const [gameID, value] of Object.entries(game.mug)) {
                    mug.push({
                        id: gameID,
                        value: value,
                        roll: false
                    })
                }
                setGameID(body._id)
                setCurrentPlayer(game.currentPlayer)
                setIndexOfFirstPlayer(game.indexOfFirstPlayer)
                setIsActive(game.isActive)
                setNumberOfRoll(game.numberOfRoll)
                setNumberOfTurn(game.numberOfTurn)
                setPlayerIDs(game.playerIDs)
                setPlayers(players)
                setMug(mug)
                setDicesToChange([])
                setChosenFigure(null)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getGame() })

    const markDiceToRoll = (diceID) => {
        if((numberOfRoll === 0) || (numberOfRoll === 3)) return;
        const dice = mug.find(dice => dice.id === diceID)
        dice.roll = !dice.roll
        let dicesToChange = []
        if(dice.roll) {
            dicesToChange.push(diceID)
        } else {
            dicesToChange = dicesToChange.filter( id => id !== diceID )
        }
        setDicesToChange(dicesToChange) 
        setMug(mug)
    }

    const rollTheDices = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.keycloak.token}`
                },
                body: JSON.stringify({ numbersToChange: dicesToChange })
            };
            // todo change playerID and gameID later 
            const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/${currentPlayer}/game/${gameID}`, requestOptions)
            const body = await response.json();
            if((body.level === 'warning') || (body.level === 'error')) {
                setAlertMessage(body)
            } else {
                getGame(true)
            }
        } catch (err) {
            setLevel('error')
            setAlertMessage(err.message)
        }
    }

    const markFigureTochoose = async (figureID) => {
        setChosenFigure(chosenFigure === figureID ? null : figureID)
    }

    const chooseFigure = async () =>  {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.keycloak.token}`
                },
                body: JSON.stringify({ chosenFigure: chosenFigure })
            };
            // todo change playerID and gameID later 
            const response = await fetch(`${process.env.REACT_APP_DICE_GAME_API}/user/${currentPlayer}/game/${gameID}`, requestOptions)
            const body = await response.json();
            if((body.level === 'warning') || (body.level === 'error')) {
                setAlertMessage(body)
            } else {
                getGame(true)
            }
        } catch (err) {
            setLevel('error')
            setAlertMessage(err.message)
        }
    }

    const alert = alertMessage ? <AlertMessage elems={alertMessage} /> : ''

    const dices = mug.map(dice => <Dice 
        key={dice.id} 
        dice_props={dice} 
        numberOfRoll={numberOfRoll} 
        markDiceToRoll={markDiceToRoll.bind(this)}
    />)

    const rollTheDicesButton = <Button 
        onClick={rollTheDices.bind(this)} 
        variant={(numberOfRoll === 0) || (dicesToChange.length !== 0) ?  "success" : "outline-secondary"} 
        disabled={(numberOfRoll === 3) || ((dicesToChange.length === 0) && numberOfRoll !== 0)}>
        {chosenFigure ? "You cannot roll dices if you choose a figure" : 
        (numberOfRoll === 3 ? "You don't have next roll" : 
        (numberOfRoll === 0 ? "Roll all dices" : 
        (dicesToChange.length === 0 ? "Choose dices to roll" : 
        (numberOfRoll === 1 ? "Roll dices secound time" : "Roll dices last time"))))}
    </Button>

    const chooseFigureButton = <Button 
        onClick={chooseFigure.bind(this)} 
        variant={chosenFigure ? "success" : "outline-secondary"} 
        disabled={(numberOfRoll === 0) || !chosenFigure}>
            {numberOfRoll === 0 ? "You have to roll all dices" : 
            (chosenFigure ? "Save figure" : 
            "Choose figure to save")}
    </Button>

    const play = <div>
        <Row>
            <Col><h1>Player: {currentPlayer}</h1></Col>
            <Col><Badge pill bg="secondary" className="turn">Turn: {numberOfTurn}</Badge></Col>
        </Row>
        <Row className="dices">{dices}</Row>
            <Row>
            <Col>
                {rollTheDicesButton}
            </Col>
            <Col>
                {chooseFigureButton}
            </Col>
        </Row>
    </div>

    const winMessage = <WinMessage elems={players} />

    const table = <div>
        <GameTable 
            players={players} 
            currentPlayer={ numberOfRoll === 0 ? null : currentPlayer} 
            chosenFigure={chosenFigure} 
            markFigureTochoose={markFigureTochoose.bind(this)}
        />
    </div>

    return <Container fluid className="dice-game-container">
        {alert}
        <Row>
            <Col>
                {isActive ? play : winMessage }
            </Col>
            <Col>
                {table}
            </Col>
        </Row>
    </Container>
}