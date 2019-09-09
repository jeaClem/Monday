import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions, Button} from 'react-native';
import { EMPTY, CROSS, ROUND, haveWinner } from '../consts/values';
import {Link} from 'react-native-router;'
import Cell from './Cell';
import Bot from '../../app/consts/Bot';

const {width, height} = Dimensions.get("window");
let minSize;
if (width < height) {
  minSize = width * .9;
} else {
  minSize = height * .9;
}

const styles = StyleSheet.create({

  board: {
    width:minSize+4,
    height:minSize+4,
    flexWrap: 'wrap',
    borderColor: '#222222',
    borderWidth: 2,
    marginVertical: 30
  },
  cell: {
    width:minSize / 3,
    height:minSize / 3,
    borderColor: '#222222',
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center"
  },
  pointBox: {
    flex:1,
    flexDirection: "row",
    paddingTop: 50
  },
  crossPoint: {
    backgroundColor: '#c95d5d',
  },
  pointText: {
    color: '#ffffff',
    fontSize: 30
  },
  roundPoint: {
    backgroundColor: '#92c45c',
  },
  victoryText: {
    fontSize: 20,
    paddingBottom: 20
  }

});
export default class Board extends Component {
  constructor (props) {
    super();
    this.state = {
      game: [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
      winner: false,
      player: ROUND,
      roundPoints: 0,
      crossPoints: 0
    }
  }

  onTouch (index) {
    let {game, winner} = this.state;
    if (!winner) { // !false, it's fun because it's true
      game[index] = this.state.player;
      this.setState({game: game});
      this.changeTour();
    }
  }

  changeTour () {
    let {player, game, roundPoints, crossPoints} = this.state;
    let winner = haveWinner(game);
    if (winner) {
      this.setState({
        winner: (winner === CROSS) ? 'Félicitation aux croix' : 'Les ronds remportent la victoire',
        roundPoints: (winner === ROUND) ? roundPoints+1 : roundPoints,
        crossPoints: (winner === CROSS) ? crossPoints+1 : crossPoints
      });
    } else if (game.indexOf(EMPTY) === -1) {
      this.setState({
        winner: 'égalité !'
      });
    } else {
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
    }, () =>  {
     if (palyer === ROUND) {
      let bot = new Bot ([EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY]);
      let botChoice = bot.play();
      let t = this;
      setTimeout(() => {
        t.onTouch(botChoice, true);
      }, 1000);
    } 
   });
  }

  render () {
    return (
      <View style={styles.main}>
        <view>
  <Link to="/" underlayColor="#f0f4f7">
      <Text>Solo</Text>
  </Link>
  <Link to="/multi" underlayColor="#f0f4f7">
      <Text>Multi</Text>
  </Link>
</view>
        <View style={styles.board}>
          {
            this.state.game.map(
              (i, k) => 
                <Cell style={styles.cell} state={i} key={k} onTouch={() => {this.onTouch(k)}} />
            )
          }
        </View>
        {
          (this.state.winner) &&
            <View style={styles.main}>
              <Text style={styles.victoryText}>{this.state.winner}</Text>
              <Button color='#92c45c' onPress={this.restart.bind(this)} title='Rejouer'/>
            </View>
        }
        <View style={styles.pointBox}>
          <View style={[styles.main, styles.roundPoint]}>
            <Text style={styles.pointText}>Ronds</Text>
            <Text style={styles.pointText}>{this.state.roundPoints}</Text>
          </View>
          <View style={[styles.main, styles.crossPoint]}>
            <Text style={styles.pointText}>Croix</Text>
            <Text style={styles.pointText}>{this.state.crossPoints}</Text>
          </View>
        </View>
      </View>
    )
  }
}

