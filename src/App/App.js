import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import PlayerContainer from '../components/PlayerContainer/PlayerContainer';
import playerData from '../helpers/data/playerData';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
    players: [],
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const players = playerData.getPlayersByUid();
        this.setState({ players });
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  renderView = () => {
    const { authed } = this.state;

    if (!authed) {
      return (< Auth />);
    }
    return (< PlayerContainer />);
  }

  render() {
    const { authed } = this.state;
    return (
    <div className="App">
      <MyNavbar authed={authed} />
      {
     this.renderView()
      }
    </div>
    );
  }
}

export default App;
