import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import playerShape from '../../helpers/propz/playerShape';


class PlayerForm extends React.Component {
  static propTypes = {
    addPlayer: PropTypes.func,
    playerToEdit: playerShape.playerShape,
    editMode: PropTypes.bool,
    updatePlayer: PropTypes.func,
    setHidePlayerForm: PropTypes.func,
  }

  state = {
    playerName: '',
    playerPosition: '',
    playerImage: '',
  }

  componentDidMount() {
    const { playerToEdit, editMode } = this.props;
    if (editMode) {
      this.setState({ playerName: playerToEdit.name, playerImageUrl: playerToEdit.imageUrl, playerPosition: playerToEdit.position });
    }
  }

  updatePlayerEvent = (e) => {
    e.preventDefault();
    const { updateCurrentPlayer, playerToEdit } = this.props;
    const updatedPlayer = {
      name: this.state.playerName,
      imageUrl: this.state.playerImageUrl,
      position: this.state.playerPosition,
      uid: authData.getUid(),
    };
    updateCurrentPlayer(playerToEdit.id, updatedPlayer);
  }

  addPlayerEvent = (e) => {
    const { addPlayer } = this.props;
    e.preventDefault();
    const newPlayer = {
      name: this.state.playerName,
      position: this.state.playerPosition,
      imageUrl: this.state.playerImage,
      uid: authData.getUid(),
    };
    addPlayer(newPlayer);
    this.setState({ playerName: '', playerPosition: '', playerImage: '' });
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ playerName: e.target.value });
  }

  positionChange = (e) => {
    e.preventDefault();
    this.setState({ playerPosition: e.target.value });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ playerImage: e.target.value });
  }

  render() {
    const { playerName, playerImage, playerPosition } = this.state;
    const { editMode } = this.props;
    return (
      <div>
      <form className='PlayerForm col-6 offset-3'>
        <div className="form-group">
          <label htmlFor="playerName">Player's Name:</label>
          <input
          type="text" className="form-control" id="playerName" placeholder="Enter name"
          value= {playerName}
          onChange={this.nameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="playerImageUrl">Player Image Url:</label>
          <input
          type="text" className="form-control" id="playerImageUrl"
          value={playerImage}
          onChange={this.imageChange} />
        </div>
        <div className="form-group">
          <label htmlFor="playerPosition">Player's Position:</label>
          <input
          type="text" className="form-control" id="playerPosition" placeholder="Enter position" value= {playerPosition}
          onChange={this.positionChange} />
        </div>
        {
          (editMode) ? (<button className="btn btn-warning" onClick={this.updatePlayerEvent}>Update Player</button>)
            : (<button className="btn btn-secondary" onClick={this.addPlayerEvent}>Save Player</button>)
        }
      </form>
    </div>
    );
  }
}

export default PlayerForm;
