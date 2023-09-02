import { GridItem } from './GridItem.js';

class Grid {
    constructor(width, height, xPos, yPos) {
        this.width = width
        this.height = height
    
        this.grid = [];
        for (let row = 0; row < this.height; row++) {
            let currentRow = [];

            for (let col = 0; col < this.width; col++) {
                currentRow.push(new GridItem)              
            }
            this.grid.push(currentRow);
        }

    }

    displayGrid() {
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                process.stdout.write(grid[row][col].sprite)
                process.stdout.write("\t");
            }
            process.stdout.write("\n");
        }

        //player start at bottom left
        this.grid[height - 1][0] = new GridItem('🐵', 'player');
        // goal is at top right
        this.grid[0][width - 1] = new GridItem('⭐️', 'win');
    }
}

// TESTING 
const width = 7
const height = 5
const grid = []

for (let row = 0; row < height; row++) {
    let currentRow = [];

    for (let col = 0; col < width; col++) {                
        currentRow.push(new GridItem()) 
    }
    grid.push(currentRow);
}

//console.log(grid)

//player start at bottom left
grid[height - 1][0] = new GridItem('🐵', 'player');
// goal is at top right
grid[0][width - 1] = new GridItem('⭐️', 'win');

for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
        process.stdout.write(grid[row][col].sprite);
        process.stdout.write("\t");
    }
    process.stdout.write("\n");
}
