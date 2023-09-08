import { GridItem } from './GridItem.js';
import promptPlayer from './promptPlayer.js';
import Player from "./Player.js"
import Item from "./Item.js";
import Monster from "./Monster.js";

export class Grid {
    constructor(width, height, playerX = 0, playerY = height - 1) {
        this.width = width
        this.height = height
        this.playerX = playerX
        this.playerY = playerY
        this.player = new Player();
        this.grid = [];

        for (let row = 0; row < this.height; row++) {
            let currentRow = [];

            for (let col = 0; col < this.width; col++) {
                currentRow.push(new GridItem)
            }
            this.grid.push(currentRow);
        }

        //player starts at bottom left
        this.grid[this.height - 1][0] = new GridItem('🐵', 'player');
        // goal is at top right
        this.grid[0][this.width - 1] = new GridItem('⭐️', 'win');

        this.startGame();
    }

    // display the grid
    displayGrid() {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                process.stdout.write(this.grid[row][col].sprite)
                process.stdout.write("\t");
            }
            process.stdout.write("\n");
        }
    }

    async startGame() {
        while (this.player.playerStats.hp > 0) {
            console.log('\n', this.player.getPlayerStats(), '\n')
            this.displayGrid();

            console.log('\n');
            const direction = await promptPlayer();
            console.log('\n');

            switch (direction) {
                case 'Right':
                    this.makeMove('Right');
                    break;
                case 'Left':
                    this.makeMove('Left');
                    break;
                case 'Up':
                    this.makeMove('Up');
                    break;
                case 'Down':
                    this.makeMove('Down');
                    break;
            }
        }
    }

    generateNextCell() {
        const chance = Math.random()
        if (chance < 0.15) {
            console.log('\n', 'You ran into a monster! 👹', '\n');
            console.log(this.player.battle(new Monster));

        } else if (chance > 0.20 && chance < 0.35) {
            console.log('\n', 'You found a weapon and increased your defenses! 🔫', '\n');
            this.player.updateStats(new Item);

        } else {
            GridItem.describe();
        }
    }
    
    makeMove(direction) {
        let xPos = this.playerX;
        let yPos = this.playerY;
        
        switch (direction) {
            case 'Right':
                if (this.playerX === this.width - 1) {
                    console.log('\n', 'Cannot move right!', '\n');
                    return;
                }
                xPos++;
                break;

            case 'Left':
                if (this.playerX === 0) {
                    console.log('\n', 'Cannot move left!', '\n')
                    return
                }
                xPos--;
                break;

            case 'Up':
                if (this.playerY === 0) {
                    console.log('\n', 'Cannot move up!', '\n');
                    return;
                }
                yPos--;
                break;

            case 'Down':
                if (this.playerY === this.height - 1) {
                    console.log('\n', 'Cannot move down!', '\n');
                    return;
                }
                yPos++;
                break;
        }

        if (yPos === 0 && xPos === this.width - 1) {
            this.grid[this.playerY][this.playerX] = new GridItem('🐾');
            this.grid[yPos][xPos] = new GridItem('🐵');
            this.displayGrid();
            console.log('\n', '🎆 Congrats! You reached the end of the game!', '\n');
            process.exit();
        }

        if (this.grid[yPos][xPos].type === 'undiscovered') {
            // randomly choose type of grid object in direction player has chosen:
            this.generateNextCell();
        }
        this.grid[this.playerY][this.playerX] = new GridItem('🐾', 'discovered');
        
        // update actual coordinates
        this.playerX = xPos;
        this.playerY = yPos;

        this.grid[yPos][xPos] = new GridItem('🐵');
    }
}

const game = new Grid(7, 5);