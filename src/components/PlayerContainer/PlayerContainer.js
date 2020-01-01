import React from 'react';

import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';
import PlayerCard from '../PlayerCard/PlayerCard';

class PlayerContainer extends React.Component {
  state = {
    players: [],
  }

  componentDidMount() {
    playerData.getPlayersByUid(authData.getUid())
      .then((players) => {
        this.setState({ players });
      })
      .catch((errFromPlayersContainer) => console.error({ errFromPlayersContainer }));
  }

  render() {
    return (
      <div>{this.state.players.map((player) => (<PlayerCard player={player}/>))}
    </div>
    );
  }
}

export default PlayerContainer;
