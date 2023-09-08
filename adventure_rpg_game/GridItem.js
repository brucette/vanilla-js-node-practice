export class GridItem {
    spriteOptions = ['⛰', '🌳', '🌲'];
    static descriptions = [' Things look calm here', ' The coast is clear', ' Onward and upward!'];

    constructor(sprite, type="undiscovered") {
        if (!sprite) {
            const randomIndex = Math.floor(Math.random() * this.spriteOptions.length);
            this.sprite = this.spriteOptions[randomIndex];
        } else {
            this.sprite = sprite;
        }
        this.type = type;
    }

    static describe() {
        const randomDesription = Math.floor(Math.random() * this.descriptions.length);
        console.log(this.descriptions[randomDesription]);
    }
}