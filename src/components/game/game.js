import React from "react";
import './game.css'
import Table from '../table/table'

export default class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <Table/>
            </div>
        )
    }
}