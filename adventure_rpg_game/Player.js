export default class Player {
    playerStats = {
        hp: 7,
        atk: 10,
        def: 26
    }

    getPlayerStats() {
        return `Player stats: HP: ${this.playerStats.hp} ATK: ${this.playerStats.atk} DEF: ${this.playerStats.def}`
    }

    updateStats(stats) {
        if (stats.name === 'sword') {
            this.playerStats.hp += stats.hp;
            this.playerStats.atk += stats.atk;
            this.playerStats.def += stats.def;
            return this.getPlayerStats();
        }
    }

    battle(stats) {
        let winner = false;

        while (this.playerStats.hp > 0 && stats.hp > 0) {

            // Monster attacks
            let damage = stats.atk - this.playerStats.def;
            this.playerStats.hp = this.playerStats.hp - damage;
            //console.log('player hp:', this.playerStats.hp)
            //console.log('dagame by monster:', damage)

            // Player attacks
            damage = this.playerStats.def - stats.atk;
            stats.hp = stats.hp - damage;
            //console.log('monster hp:', stats.hp)
            //console.log('dagame by player:', damage)

        }
        winner = this.playerStats.hp > stats.hp;
        
        if (winner) {
            return "You defeated the monster and increased your defenses!"
        }

        // return "Sorry you lost the game :(";
    }
}