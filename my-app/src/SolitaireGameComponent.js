import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './SolitaireGameComponent.css';
import SolitaireGame from './SolitaireGame';

class SolitaireGameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new SolitaireGame(),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { game } = this.state;
    if (!result.destination) return;
    const sourceStackIndex = parseInt(result.source.droppableId, 10);
    const destinationStackIndex = parseInt(result.destination.droppableId, 10);
    const cardIndex = result.source.index;
    const newGame = game.moveCard(sourceStackIndex, destinationStackIndex, cardIndex);
    this.setState({ game: newGame });
  }

  render() {
    const { game } = this.state;
    return (
      <Container fluid>
        <h1>Solitaire</h1>
        {game && <h2>Score: {game.score}</h2>}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Row>
            <Col>
              <h3>Overflow pile</h3>
              <Droppable droppableId="overflow">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {game.overflow.length > 0 ? (
                      <Card>
                        <Card.Body>
                          <Card.Title>{game.overflow[game.overflow.length - 1].value} of {game.overflow[game.overflow.length - 1].suit}</Card.Title>
                          <Button onClick={() => {
                            const newGame = game.deal();
                            this.setState({ game: newGame });
                          }}>Deal</Button>
                        </Card.Body>
                      </Card>
                    ) : (
                      <h5>No more cards in overflow pile.</h5>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
            <Col>
              <h3>Stacks</h3>
              <Row>
                {game.stacks.map((stack, stackIndex) => (
                  <Col key={stackIndex}>
                    <h4>Stack {stackIndex + 1}</h4>
                    <Droppable droppableId={`${stackIndex}`}>
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {stack.map((card, cardIndex) => (
                            <Draggable key={cardIndex} draggableId={`${stackIndex}-${cardIndex}`} index={cardIndex}>
                              {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <Card>
                                    <Card.Body>
                                      <Card.Title>{card.value} of {card.suit}</Card.Title>
                                    </Card.Body>
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                    <Button onClick={() => {
                      const newGame = game.moveCard(stackIndex, stackIndex - 1);
                      this.setState({ game: newGame });
                    }}>Move left</Button>
                    <Button onClick={() => {
                      const newGame = game.moveCard(stackIndex, stackIndex + 1);
                      this.setState({ game: newGame });
                    }}>Move right</Button>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col>
              <h3>Foundation piles</h3>
              <Row>
                {game.foundations.map((foundation, foundationIndex) => (
                  <Col key={foundationIndex}>
                    <h4>{foundation.suit} Foundation</h4>
                    <Droppable droppableId={`foundation-${foundation.suit}`} isDropDisabled={foundation.cards.length === 0}>
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {foundation.cards.length > 0 ? (
                            <Card>
                              <Card.Body>
                                <Card.Title>{foundation.cards[foundation.cards.length - 1].value} of {foundation.cards[foundation.cards.length - 1].suit}</Card.Title>
                              </Card.Body>
                            </Card>
                          ) : (
                            <h5>Empty</h5>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </DragDropContext>
      </Container>
    );
  }
}

export default SolitaireGameComponent;

