import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class CardEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      front: '',
      back: '',
    }

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  addCard = () => {
    this.props.addCard(this.state.front, this.state.back);
    this.setState({
      front: '',
      back: ''
    })
  }

  deleteCard = (event) => {
    this.props.deleteCard(event.target.dataset.index);
  }

  render() {
    const rows = this.props.cards.map((card, i) => {
      return (
        <tr key={i}>
        <td>{card.front}</td>
        <td>{card.back}</td>
        <td><button data-index={i} onClick={this.deleteCard}>Delete</button></td>
      </tr>
      );     
    })
    return (
      <div>
        <h2>Card Editor</h2>
        <table>
          <thead>
            <tr>
              <td>Front</td>
              <td>Back</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <br/>
        <input 
          onChange={this.handleChange} 
          name='front' 
          placeholder='Front of a card'
          value={this.state.front}/>
        <input 
          onChange={this.handleChange} 
          name='back' 
          placeholder='Back of a card' 
          value={this.state.back}/>
        <button onClick={this.addCard}>Add Card</button>
        <hr/>
        <button onClick={this.props.switchMode}>Go to viewer</button>
      </div>
    )
  }

}

class CardViewer extends React.Component {

  render() {
    return (
      <div>
        This is the viewer.
        <hr/>
        <button onClick={this.props.switchMode}>Go to editor</button>
      </div>
    )
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editor: true,
      cards: [
        {
          front: 'test front',
          back: 'test back'
        },
        {
          front: 'test 2 front',
          back: 'test 2 back'
        }
      ],
    };
  }


  render() {
    if (this.state.editor) {
      return (
        <div>
          <CardEditor 
            switchMode={this.switchMode}
            cards={this.state.cards}
            addCard={this.addCard}
            deleteCard={this.deleteCard}
          />
        </div>
      )
    } else {
      return (
        <div>
          <CardViewer 
            switchMode={this.switchMode}
            cards={this.state.cards}
          />
        </div>
      )
    }
  }

  switchMode = () => {
    this.setState(state => ({
      editor: !state.editor,
    }))
  }

  addCard = (front, back) => {
    this.setState(state => ({
      cards: [...state.cards, { front, back }]
    }));
  };

  deleteCard = (index) => {
    this.setState(state => {
      const cards = [...state.cards];
      cards.splice(index, 1);
      return {
        cards: cards
      };
    })
  }

}


ReactDOM.render(<App />, document.getElementById('root'));

