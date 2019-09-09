import { ROUND, CROSS } from "./values";

export default class Bot {
  botChoices = [];
  userChoices = [];
  possibilities = [];
  
  constructor (game) {
    
    this.registerState(game);
  }

  play () {
    if (this.userChoices.length < 2
      && this.botChoices.length < 2) {
        return this.startGame();
    } else {
        return this.continueGame();
    }
  }

  registerState (game) {
    for (let choice in game) {
      if (game[choice] == ROUND) {
        this.userChoices.push(choice);
      } else if (game[choice] === CROSS) {
        this.botChoices.push(choice);
      } else {
        this.possibilities.push(choice);
      }
    }
  }

  startGame () {
    if (this.possibilities.includes('4')) {
      return 4;
    }

    let freeAngles = [];
    if (this.possibilities.includes('0')) {
      freeAngles.push(0);
    }
    if (this.possibilities.includes('2')) {
      freeAngles.push(2);
    }
    if (this.possibilities.includes('6')) {
      freeAngles.push(6);
    }
    if (this.possibilities.includes('8')) {
      freeAngles.push(8);
    }
     return freeAngles[Math.floor(Math.random() * freeAngles.length)];
  }

  continueGame () {
    return this.isDangerous();
  }

  isDangerous () {
    let dangers = [
      [
       ['0','1'],
       2 
      ],
      [
       ['2','1'],
       0 
      ],
      [
       ['2','0'],
       1 
      ],
      [
       ['3','4'],
       5 
      ],
      [
       ['5','4'],
       3 
      ],
      [
       ['5','3'],
       4 
      ],
      [
       ['6','7'],
       8 
      ],
      [
       ['6','8'],
       7
      ],
      [
       ['7','8'],
       6
      ],
      [
       ['6','4'],
       2
      ],
      [
       ['4','2'],
       6
      ],
      [
       ['6','2'],
       4
      ],
      [
       ['0','3'],
       6
      ],
      [
       ['0','6'],
       3
      ],
      [
       ['3','6'],
       0
      ],
      [
       ['1','4'],
       7
      ],
      [
       ['7','4'],
       1
      ],
      [
       ['7','1'],
       4
      ],
      [
       ['2','5'],
       8
      ],
      [
       ['8','5'],
       2
      ],
      [
       ['8','2'],
       5
      ],
      [
       ['0','4'],
       8
      ],
      [
       ['8','4'],
       0
      ],
      [
       ['8','0'],
       4
      ],
    ];
    
    for (let i = 0; i < dangers.length; i++) {
      let data = dangers[i];
      let toInspect = data[0];

      if (this.botChoices.includes(toInspect[0]) &&
      this.botChoices.includes(toInspect[1]) ) {
        if (this.possibilities.includes(String(data[1]))) {
          return data[1];
        }
      }
    }
    for (let i = 0; i < dangers.length; i++) {
      let data = dangers[i];
      let toInspect = data[0];

      if (this.userChoices.includes(toInspect[0]) &&
      this.userChoices.includes(toInspect[1]) ) {
        if (this.possibilities.includes(String(data[1]))) {
          return data[1];
        }
      }
    }
    
    for (let i = 0; i < dangers.length; i++) {
      let data = dangers[i];
      let toInspect = data[0];

      if (this.botChoices.includes(String(data[1]))) {
        if (this.possibilities.includes(toInspect[0])
        && this.possibilities.includes(toInspect[1])) {
          if (toInspect[0] === '4' || toInspect[1] === '4') {
            return 4;
          } else if ( ['0', '2', '6', '8'].includes(toInspect[0]) ) {
            return Number(toInspect[0]);
          } else if ( ['0', '2', '6', '8'].includes(toInspect[1]) ) {
            return Number(toInspect[1]);
          } else {
            return Number(toInspect[Math.floor(Math.random() * 2)]);
          }
        }
      }
    }
      return  this.possibilities[Math.floor( Math.random() * this.possibilities.length )];
  }
}