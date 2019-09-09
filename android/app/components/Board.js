import React, { Component } from 'react';
import {View, StyleSheet, Text, Dimensions, Button, roundPoints,
    crossPoints} from 'react-native';
import { EMPTY, CROSS, ROUND, haveWinner } from '../consts/Values';
import Cell from './Cell';
import Bot from '../consts/Bot';


const {width, height} = Dimensions.get("window");
let minSize;
if (width < height) {
    minSize = width * .9;
} else {
    minSize = height * .9;
}
const Styles = StyleSheet.create({

    board: {
        width: minSize+6,
        height:minSize+6,
        flexWrap: 'wrap',
        borderColor: 'gold',
        borderWidth: 3,
        //paddingHorizontal: 15
    },
    cell: {
        width: minSize / 3,
        height:minSize / 3,
        borderColor: 'gold',
        borderWidth: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main : {
        flex: 1, 
        flexDirection: 'column'
    },
    pointBox: {
        flex: 1, 
        flexDirection: 'row',
        paddingTop: 50
    },
    crossPoints: {
        backgroundColor: 'blue' ,
    },
    pointText: {
        color: 'blue' ,
        fontSize: 50
    },
    roundPoints: {
        backgroundColor: 'blue' ,
    },
    victoryText: {
        fontSize:50,
        paddingBottom: 20
    }
});

export default class Board extends Component {
    constructor (props) {
        super();
        this.state = {
            game: [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
            winner: false, //null,
            player: ROUND,
            roundPoints: 0,
            crossPoints: 1
        }
    }

    onTouch (index, bot = false) {
        let {game, winner, player} = this.state;
        if (
            !winner && (player != CROSS  || bot)
        ) { // !false, it's fun coz it's true!
            game[index] = this.state.player;
        this.setState({game: game});
        this.changeTour();
        } 
    }
       
    changeTour () {
        let {player, game, roundPoints, crossPoints} = this.state;
        let winner = haveWinner(game);
        if (winner) {
            //console.warn(winner);
            this.setState({
                winner: (winner === CROSS) ? 'Bravo aux croix' : 'Les ronds remportent la victoire',
                roundPoints: (winner === CROSS) ? roundPoints+1 : roundPoints,
                crossPoints: (winner === ROUND) ? crossPoints+1 : crossPoints
            });
        } else if (game.indexOf(EMPTY) === -1 /** ou mettre: <0 */) {
            this.setState({
                winner : 'egalité !' 
            }); 
        } else {  
            if (player === ROUND) {
                let bot = new Bot (game);
                let botChoice = bot.play();
                let t = this;
                setTimeout(() => {
                    t.onTouch(botChoice, true);
                }, 1000); 
            }                                   
            this.setState({
                player: (player === ROUND) ? CROSS : ROUND
            });   
        }
    }

    restart () { 
        let {player} = this.state;
        this.setState({
            game: [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
            winner: false,
            player: (player === ROUND) ? CROSS : ROUND  
        })
    }

    render () {
        return (
        <View style={Styles.main}>
            <View style={Styles.board}>
                {
                    this.state.game.map(
                        (i, k) =>
                        <Cell style={Styles.cell} state={i} key={k} onTouch={() => {this.onTouch(k)}} />
                    )
                } 
            </View>
            <View>   
            {
                (this.state.winner) &&
                <View style={style.boards}>
                <Text>{this.state.winner}</Text>
                <Button onPress={this.restart.bind(this)} title='Rejouer' />
                </View>
            }
            </View>
        
            <View>
                <View> 
                    <Text>Ronds</Text>
                    <Text>{this.state.roundPoints}</Text>
                </View>
            </View>
            <View>
                <Text>Croix</Text>
                <Text>{this.state.crossPoints}</Text>
            </View>
        </View>
        )
    }
}
