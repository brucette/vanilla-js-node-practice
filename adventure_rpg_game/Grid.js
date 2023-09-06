import { GridItem } from './GridItem.js';
import promptPlayer from './promptPlayer.js';
import Player from "./Player.js"

export class Grid {
    constructor(width, height, playerX = 0, playerY = height - 1) {
        this.width = width
        this.height = height
        this.playerX = playerX
        this.playerY = playerY
        this.player = new Player();
        // new Player("Monkey King", { attack: 10, defense: 5, hp: 20 });
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
        while (this.player.hp > 0) {
            console.log('PLAYER:', this.player.hp)
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

    generateNextCell() {
        const chance = Math.random()
        if (chance < 0.15) {
            console.log('\n', 'You ran into a monster! 👹', '\n')
        } else if (chance > 0.20 && chance < 0.35) {
            console.log('\n', 'You found a weapon! 🔫', '\n')
        } else {
            console.log('\n', 'Normal!', '\n')
        }

    }

    // Moving across the grid
    moveRight() {
        if (this.playerX === this.width - 1) {
            console.log('\n', 'Cannot move right!', '\n');
            return;
        }

        if (this.grid[this.playerY][this.playerX + 1].type === 'undiscovered') {
            // randomly choose type of grid object in direction player has chosen:
            this.generateNextCell()
        }

        this.grid[this.playerY][this.playerX] = new GridItem('🐾', 'discovered');
        this.playerX += 1;
        this.grid[this.playerY][this.playerX] = new GridItem('🐵');
        return;
    }

    moveLeft() {
        if (this.playerX === 0) {
            console.log('\n', 'Cannot move left!', '\n')
            return
        }

        if (this.grid[this.playerY][this.playerX - 1].type === 'undiscovered') {
            // randomly choose type of grid object in direction player has chosen:
            this.generateNextCell()
        }
        this.grid[this.playerY][this.playerX] = new GridItem('🐾', 'discovered');
        this.playerX -= 1;
        this.grid[this.playerY][this.playerX] = new GridItem('🐵');
        return
    }

    moveUp() {
        if (this.playerY === 0) {
            console.log('\n', 'Cannot move up!', '\n');
            return;
        }

        if (this.grid[this.playerY - 1][this.playerX].type === 'undiscovered') {
            // randomly choose type of grid object in direction player has chosen:
            this.generateNextCell()
        }

        this.grid[this.playerY][this.playerX] = new GridItem('🐾', 'discovered');
        this.playerY -= 1;
        this.grid[this.playerY][this.playerX] = new GridItem('🐵');
        return;
    }

    moveDown() {
        if (this.playerY === this.height - 1) {
            console.log('\n', 'Cannot move down!', '\n');
            return;
        }

        if (this.grid[this.playerY + 1][this.playerX].type === 'undiscovered') {
            // randomly choose type of grid object in direction player has chosen:
            this.generateNextCell()
        }

        this.grid[this.playerY][this.playerX] = new GridItem('🐾', 'discovered');
        this.playerY += 1;
        this.grid[this.playerY][this.playerX] = new GridItem('🐵');
    }
}

const game = new Grid(7, 5);