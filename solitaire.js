
class solitaire {

    constructor() {
        // Define suits and values
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

        // Create an empty deck array
        this.deck = [];

        // Loop through each suit and value to create cards and add them to the deck
        for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
            for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
                this.deck.push({ value: values[valueIndex], suit: suits[suitIndex] });
            }
        }

        // Shuffle the deck
        this.deck.sort(() => Math.random() - 0.5);
        
        //Sort the deck into seven piles going up by one as you go right
        this.stacks = [];
        for (let pileCount = 0; pileCount < 7; pileCount++) {
            let tempCount = pileCount;
            let tempDeck = [];
            while (tempCount >= 0) {
                tempDeck.push(this.deck.pop());
                tempCount--;
            }
            this.stacks.push(tempDeck);
        }

        this.overflow = this.deck;
    }

}

function createCard(value, suit, showSuite) {
    const cardDiv = document.createElement('li');
    cardDiv.classList.add('card');
    const cardValue = document.createElement('p');
    cardValue.innerText = showSuite ? value : '';
    const cardSuit = document.createElement('p');
    cardSuit.innerText = showSuite ? suit : '';
    cardDiv.appendChild(cardValue);
    cardDiv.appendChild(cardSuit);
    return cardDiv;
}


// Print the deck
//console.log(deck);





function displayDeck(stacks) {
    const board = document.querySelector('.board');

    for (let i = 0; i < 7; i++) {
        const stack = document.createElement('div');
        stack.classList.add('stack');

        for (let j = 0; j < stacks[i].length; j++) {
            let showSuite = j == stacks[i].length - 1 ? true : false;
            const card = createCard(stacks[i][j].value, stacks[i][j].suit, showSuite);
            stack.appendChild(card);
        }
        board.appendChild(stack);
    }
}


let game = new solitaire();

displayDeck(game.stacks);

console.log(game.stacks);
console.log(game.overflow);

