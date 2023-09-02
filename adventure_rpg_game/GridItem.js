export class GridItem {
    spriteOptions = ['⛰', '🌳', '🌲'];
    hasSurprise = false;

    constructor(sprite, type="undiscovered") {
        if (!sprite) {
            const randomIndex = Math.floor(Math.random() * this.spriteOptions.length);
            this.sprite = this.spriteOptions[randomIndex];
        } else {
            this.sprite = sprite;
        }
        this.type = type;
    }
}

// TESTING
// console.log(new GridItem().hasSurprise)