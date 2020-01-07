import React from 'react';
import PlayerCard from '../PlayerCard/PlayerCard';
import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';
import PlayerForm from '../PlayerForm/PlayerForm';

class PlayerContainer extends React.Component {
  state = {
    players: [],
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
      })
      .catch((error) => console.error(error));
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
      <PlayerForm addPlayer={this.addPlayer} />
        <div className="d-flex flex-wrap justify-content-between">
          {this.state.players.map((player) => (<PlayerCard key={player.id} player={player} deleteSinglePlayer={this.deleteSinglePlayer} />))}
        </div>
    </div>
    );
  }
}

export default PlayerContainer;
