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

  componentDidMount() {
    this.getPlayers();
  }

  render() {
    return (
      <div>
        {this.state.players.map((player) => (<PlayerCard key={player.id} player={player}/>))}
      </div>
    );
  }
}

export default PlayerContainer;
