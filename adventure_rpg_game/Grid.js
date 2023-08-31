
class Grid {

 constructor(wide, high) {

     this.wide = wide
     this.high = high
 }

 
 generateGrid = function () {
    const grid = []
    const row = []

    for (let i = 0; i < this.wide; i++) {
        row.push([])
        for (let j = 0; j < this.high; j++) {
            console.log('cell') //⛰
        }
        console.log('\n')
    }
 }

}

const gameGrid = new Grid(12, 12)

const wide = 12
const high = 12
const grid = []
const row = []

    for (let i = 0; i < wide; i++) {
        row.push('⛰')
    }
        
    for (let j = 0; j < high; j++) {
        grid.push(row) //⛰
    }
        // console.log('\n')
    
// gameGrid.generateGrid()
console.log({grid})