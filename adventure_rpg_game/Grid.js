import { GridItem } from './GridItem.js';
import promptPlayer from './promptPlayer.js';
import Player from "./Player.js"

export class Grid {
    constructor(width, height, playerX = 0, playerY = height - 1) {
        this.width = width
        this.height = height
        this.playerX = playerX
        this.playerY = playerY
        this.player = new Player("Monkey King", { attack: 10, defense: 5, hp: 20 });

        this.grid = [];
        for (let row = 0; row < this.height; row++) {
            let currentRow = [];

            for (let col = 0; col < this.width; col++) {
                currentRow.push(new GridItem)
            }
            this.grid.push(currentRow);
        }

        //player start at bottom left
        this.grid[this.height - 1][0] = new GridItem('🐵', 'player');
        // goal is at top right
        this.grid[0][this.width - 1] = new GridItem('⭐️', 'win');

        this.getDirection();
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

    async getDirection() {
        while (this.player.hp > 0) {
            this.displayGrid();

            const direction = await promptPlayer();

            switch (direction) {
                case 'Right':
                    this.moveRight();
                    break;
                case 'Left':
                    this.moveLeft();
                    break;
                case 'Up':
                    this.moveUp();
                    break;
                case 'Down':
                    this.moveDown();
                    break;
            }
        }
    }

    // Moving across the grid
    moveRight() {
        if (this.playerX === this.width - 1) {
            console.log('\n', 'Cannot move there!', '\n');
            return;
        }

        this.grid[this.playerY][this.playerX] = new GridItem('🐾');
        this.playerX += 1;
        this.grid[this.playerY][this.playerX] = new GridItem('🐵');
        return;
    }

    moveLeft() {
        if (this.playerX === 0) {
            console.log('\n', 'Cannot move there!', '\n')
            return
        }

        this.grid[this.playerY][this.playerX] = new GridItem('🐾');
        this.playerX -= 1;
        this.grid[this.playerY][this.playerX] = new GridItem('🐵');
        return
    }

    moveUp() {
        if (this.playerY === 0) {
            console.log('\n', 'Cannot move there!', '\n');
            return;
        }

        this.grid[this.playerY][this.playerX] = new GridItem('🐾');
        this.playerY -= 1;
        this.grid[this.playerY][this.playerX] = new GridItem('🐵');
        return;
    }

    moveDown() {
        if (this.playerY === this.height - 1) {
            console.log('\n', 'Cannot move there!', '\n');
            return;
        }

        this.grid[this.playerY][this.playerX] = new GridItem('🐾');
        this.playerY += 1;
        this.grid[this.playerY][this.playerX] = new GridItem('🐵');
    }
}

const game = new Grid(7, 5);