export const EMPTY = 0;
export const CROSS = 1;
export const ROUND = 2;

const winPossibilities =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];

export const haveWinner = (game) => {
      let winner = false;
      for (let i = 0; i < winPossibilities.length; i++) {
        let line = isFull(winPossibilities[i], game);
        if (line) {
            winner = line;
            break;
        }
      }
      return winner;
      }
      const isFull = (line, game) => {
          if (game[line[0]] === game[line[1]]
            && game[line[1]] === game[line[2]] ) {
                return game[line[0]];
            }
            return false;
      }
  /** /let roundChoices = [];
    for (let choice in game) {
        if (game[choice] === ROUND) {
            roundChoices.push(choice);
        }
    }

    if (roundChoices.length < 3) {
        // le rond n' a pas gagné
    }*/
    
/**let {game} = this.state;
for (game[0] === game[4]
    && game[4] === game[8])
for  (game [0]!=EMPTY)
    game [0] 
};*/