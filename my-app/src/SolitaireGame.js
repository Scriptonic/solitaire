
import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './SolitaireGameComponent.css';

class SolitaireGame extends Component {
    constructor() {
        super();
    
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
        this.deck = suits.flatMap(suit => {
          return values.map(value => {
            return { suit, value };
          });
        });
    
        this.overflow = [];
        this.stacks = [[], [], [], [], [], [], []];
        this.score = 0;
      
        this.deal();
    
        this.foundations = [
          { suit: 'diamonds', cards: [] },
          { suit: 'clubs', cards: [] },
          { suit: 'hearts', cards: [] },
          { suit: 'spades', cards: [] },
        ];
      }
  
    createDeck() {
      const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
      const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
      return suits.flatMap(suit =>
        values.map(value => ({ suit, value }))
      );
    }
  
    shuffleDeck() {
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
    }
  
    deal() {
      if (this.deck.length === 0) {
        this.deck = this.overflow.reverse();
        this.overflow = [];
        this.shuffleDeck();
        this.score -= 100;
      }
  
      if (this.overflow.length === 0) {
        this.overflow.push(...this.deck.splice(-1, 1));
      } else if (this.overflow.length < 3) {
        this.overflow.push(...this.deck.splice(-3, 3));
      }
  
      this.score += 5;
    }
  
    moveCard(sourceStackIndex, targetStackIndex) {
      const sourceStack = this.stacks[sourceStackIndex];
      const targetStack = this.stacks[targetStackIndex];
  
      const card = sourceStack.pop();
  
      if (card === undefined) {
        return;
      }
  
      if (targetStack.length === 0 && card.value !== 'K') {
        sourceStack.push(card);
        return;
      }
  
      const targetCard = targetStack[targetStack.length - 1];
  
      if (targetCard && targetCard.suit === card.suit && targetCard.value === this.values[this.values.indexOf(card.value) - 1]) {
        targetStack.push(card);
      } else {
        sourceStack.push(card);
      }
    }
  }
  

  export default SolitaireGame;