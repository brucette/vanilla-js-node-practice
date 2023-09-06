import { GridItem } from "./GridItem.js";

// Sword or Spider
class Item extends GridItem {
    constructor(sprite, type, hp, atk, def ) {
        super(sprite, type);
        this.hp = hp
        this.atk = atk
        this.def = def
    }
}

export default Item;

const chance = Math.random()
console.log(chance)