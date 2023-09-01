
class Grid {
    constructor(width, height) {
        this.width = width
        this.height = height
    
        this.grid = [];

        for (let row = 0; row < this.height; row++) {
            let currentRow = [];

            for (let col = 0; col < this.width; col++) {
                currentRow.push(' ⛰ ');                // 🌳", "🌲",
            }
            this.grid.push(currentRow);
        }
    }

    displayGrid() {
        // 

    }

}

const width = 7
const height = 5
const grid = []


    for (let row = 0; row < height; row++) {

        let currentRow = []

        for (let col = 0; col < width; col++) {
            currentRow.push(' ⛰ ') // 🌳", "🌲",
        }
        grid.push(currentRow)
    }
    console.log(grid)
    process.stdout.write(grid)

    // console.log(...row) 
    // process.stdout.write('row')   
    // process.stdout.write("\t");
    
    //for (let j = 0; j < high; j++) {
        // grid.push(...row) //⛰
        // console.log('\n')
        //console.log(...row)
    //}
    
