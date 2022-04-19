import React from "react"
import { Table } from 'react-bootstrap';
import './GameTable.css'

export const GameTable = props => {
    const head = []
    const body = []
    console.log(props)
    head.push(<th key='#'></th>)
    const dummyfcn = () => {}

    const canBeSelected = (player, figure, props) => {
        return (player.id === props.currentPlayer) && (player.table[figure] === null) && (figure !== 'bonus') && (figure !== 'to_bonus') && (figure !== 'total')
    }

    const isFigureSelected = (player, figure, props) => {
        return (canBeSelected(player, figure, props) && (figure === props.chosenFigure)) 
    }

    const getStyle = (player, figure, props) => {
        const cellStyle = ' table-success'
        if (isFigureSelected(player, figure, props)){
            return cellStyle + ' selected-cell'
        } else if (canBeSelected(player, figure, props)) {
            return cellStyle + ' can-be-select-cell'
        } 
        return ''
       
    }

    const selectedIcon = ' × ' 
    if (props.players[0]) {
        for(const player of props.players) {
            head.push(
                <th key={player.id} className={`my-row-style ${player.id === props.currentPlayer ? 'table-success' : ''}`}>
                    {player.id}
                    </th>
                )
        }
        for (const figure of Object.keys(props.players[0].table)){
            const row = []
            row.push(<td key={`f${figure}`}>{figure}</td>)
            for(const player of props.players) {
                row.push(
                    <td key={`p${player.id}f${figure}`} 
                    onClick={player.id === props.currentPlayer ? () => props.markFigureTochoose(figure) : dummyfcn}
                    className={`my-row-style ${getStyle(player, figure, props)}`}
                    >
                        {isFigureSelected(player, figure, props) ? selectedIcon : ''}
                        {player.table[figure]}
                    </td>
                )
            }
            body.push(<tr key={`r${figure}`}>{row}</tr>)
        }
    }

    return <Table bordered >
                <thead><tr>{head}</tr></thead>
                <tbody>{body}</tbody>
            </Table>
}

export default GameTable