import React, { Component } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';

// Define suits and values
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

// Solitaire game class
class SolitaireGame {
  constructor() {
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

    // Sort the deck into seven piles going up by one as you go right
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

    // Initialize overflow pile
    this.overflow = this.deck;
    this.score = 0;
  }

  moveCard(fromStackIndex, toStackIndex) {
    // Check if move is valid
    const fromStack = this.stacks[fromStackIndex];
    const toStack = this.stacks[toStackIndex];
    const cardToMove = fromStack[fromStack.length - 1];
    const lastCard = toStack[toStack.length - 1];

    if (lastCard) {
      // Check if the cards have opposite colors and values differ by 1
      const oppositeColor = (lastCard.suit === 'Hearts' || lastCard.suit === 'Diamonds') &&
                            (cardToMove.suit === 'Clubs' || cardToMove.suit === 'Spades');
      const valueDiffersByOne = values.indexOf(lastCard.value) - values.indexOf(cardToMove.value) === 1;
      if (!oppositeColor || !valueDiffersByOne) {
        return false;
      }
    } else {
      // Only kings can be moved to an empty stack
      if (cardToMove.value !== 'King') {
        return false;
      }
    }

    // Move card from one stack to another
    fromStack.pop();
    toStack.push(cardToMove);

    // Update score
    this.score++;
    return true;
  }

  deal() {
    if (this.overflow.length === 0) {
      return false;
    }

    // Add card to each stack
    for (let i = 0; i < this.stacks.length; i++) {
      if (this.overflow.length === 0) {
        return false;
      }

      this.stacks[i].push(this.overflow.pop());
    }

    // Update score
    this.score += 5;
    return true;
  }
}