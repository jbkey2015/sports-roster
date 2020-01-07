import React from 'react';
import PlayerCard from '../PlayerCard/PlayerCard';
import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';
import PlayerForm from '../PlayerForm/PlayerForm';

class PlayerContainer extends React.Component {
  state = {
    players: [],
    editMode: false,
    playerToEdit: {},
    showPlayerForm: false,
  }

  getPlayers = () => {
    playerData.getPlayersByUid(authData.getUid())
      .then((players) => {
        this.setState({ players });
      })
      .catch((errFromPlayersContainer) => console.error({ errFromPlayersContainer }));
  }

  addPlayer = (newPlayer) => {
    const uid = authData.getUid();
    playerData.addNewPlayer(newPlayer)
      .then(() => {
        this.getPlayers(uid);
        this.setState({ showPlayerForm: false });
      })
      .catch((error) => console.error(error));
  }

  updateCurrentPlayer = (playerId, updatedInfo) => {
    playerData.updatePlayer(playerId, updatedInfo)
      .then(() => {
        this.getPlayers(authData.getUid);
        this.setState({ editMode: false, showPlayerForm: false });
      })
      .catch((errorFromUpdatePin) => console.error(errorFromUpdatePin));
  }

  setShowPlayerForm = () => {
    this.setState({ showPlayerForm: true });
  }

  setHidePlayerForm = () => {
    this.setState({ showPlayerForm: false, editMode: false });
  }

  setEditMode = () => {
    this.setState({ editMode: true, showPlayerForm: true });
  }

  setPlayerToEdit = (player) => {
    this.setState({ playerToEdit: player });
  }

  deleteSinglePlayer = (playerId) => {
    playerData.deletePlayerById(playerId)
      .then(() => {
        this.getPlayers();
      })
      .catch((errorFromDeleteSinglePlayer) => console.error({ errorFromDeleteSinglePlayer }));
  }

  componentDidMount() {
    this.getPlayers();
  }

  render() {
    return (
      <div>
      <button className="btn btn-primary" onClick={this.setShowPlayerForm}>Add a new player</button>
      { this.state.showPlayerForm && <PlayerForm addPlayer={this.addPlayer} editMode={this.state.editMode} playerToEdit={this.state.playerToEdit} updateCurrentPlayer={this.updateCurrentPlayer} setHidePlayerForm={this.setHidePlayerForm} /> }
      <div className="d-flex flex-wrap justify-content-center" id="playersContainer">
        { this.state.players.map((player) => (<PlayerCard key={player.id} player={player} deleteSinglePlayer={this.deleteSinglePlayer} addPlayer={this.addPlayer} setEditMode={this.setEditMode} setPlayerToEdit={this.setPlayerToEdit} />))}
      </div>
      </div>
    );
  }
}

export default PlayerContainer;
