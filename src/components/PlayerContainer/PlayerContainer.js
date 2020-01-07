import React from 'react';
import PlayerCard from '../PlayerCard/PlayerCard';
import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';

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
      <div className="d-flex flex-wrap justify-content-between">
        {this.state.players.map((player) => (<PlayerCard key={player.id} player={player} deleteSinglePlayer={this.deleteSinglePlayer} />))}
      </div>
    );
  }
}

export default PlayerContainer;
