
const generateDeck = () => {
    const suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
    const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
    const cards = [];
    for (const suit of suits) {
        for (const number of numbers) {
            cards.push({card: number, suit: suit})
        }
    }
    return cards;
}

const deck = generateDeck();

const drawCard = (deck) => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const singleCard = deck[randomIndex];
    deck.splice(randomIndex, 1);
    return singleCard;
}

const checkScore = (hand) => {
   return hand.reduce((sum, item) => {
        if (typeof item.card === 'string') {
            if (item.card === 'Ace') {
                return sum + 1;
            } else {
                return sum + 10;
            }
        }
        return sum + item.card
    }, 0)
}

const playerHand = [drawCard(deck), drawCard(deck)];
let playerScore = checkScore(playerHand);
const dealerHand = [drawCard(deck), drawCard(deck)];
let dealerScore = checkScore(dealerHand);

const checkWinner = () => {
    let winner = '';
    if (playerScore === 21) {
        winner = 'player';
    } else if (playerScore > 21) {
        winner = 'dealer';
    } 
    if (dealerScore === 21) {
        winner = 'dealer';
    } else if (dealerScore > 21) {
        winner = 'player';
    } 
    return winner;
}

console.log('Starting Player Hand:', playerHand);
console.log(`Starting Player Score: ${playerScore}`);
console.log('Starting Dealer Hand:', dealerHand);
console.log(`Starting Dealer Score: ${dealerScore}`);

let won;

while (true) {
    const playerCard = drawCard(deck);
    playerHand.push(playerCard); 
    playerScore = checkScore(playerHand);
    won = checkWinner();
    if (won) break;

    const dealerCard = drawCard(deck);
    dealerHand.push(dealerCard); 
    dealerScore = checkScore(dealerHand);
    won = checkWinner();
    if (won) break;
}

setTimeout(() => {
    console.log('\n')
    console.log(`You ${won === 'player' ? 'win' : 'lose'}! Your final score was ${playerScore} while the dealer had ${dealerScore}`)
    console.log('Ending Player Hand:', playerHand);
    console.log('Ending Player Score:', playerScore);
    console.log('Ending Dealer Hand:', dealerHand);
    console.log('Ending Dealer Score:', dealerScore);
}, 2000)