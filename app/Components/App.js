import React from 'react';
import io from 'socket.io-client';
let socket = io.connect('');

class App extends React.Component {
  constructor(props) {
    super(props);
    socket.on('assigngameID', (gameID) => this._assignGameID(gameID));
    socket.on('isgameID', (flag) => this._isGameID(flag));
    this.state = {value: "", warningOn: false};
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onJoinGame = this.onJoinGame.bind(this);
  }

  createGame() {
    socket.emit("newgame");
  }

  _isGameID(flag) {
    if (flag) {
      window.location = '/#/' + this.state.value;
    } else {
      this.setState({warningOn: true});
    }
  }

  _assignGameID(gameID) {
    window.location = '/#/' + gameID;
  }

  onJoinGame(e) {
    e.preventDefault();
    socket.emit('joingame', this.state.value);
  }

  onHandleChange(event) {
    this.setState({value: event.target.value, warningOn: false});
  }

  render() {
    return (
      <div>
        <h1> Welcome to MIT Teaching System Lab's ELK Game </h1>
        <p> Create a new game using the button below </p>
        <button onClick={this.createGame}> Create New Game</button>
        <form onSubmit={this.onJoinGame} className="MyForm">
          <p>Or join an existing game using the game ID </p>
          <input type="text" value={this.state.value} onChange={this.onHandleChange} placeholder="gameID"/>

          <input type="submit" value="Join Game"/>
        </form>
        {this.state.warningOn ? "Please enter an existing game number" : null}
      </div>
    );
  }
}

App.propTypes = {

};

export default App;