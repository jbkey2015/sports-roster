import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlayersByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allPlayers = result.data;
      const players = [];
      if (allPlayers != null) {
        Object.keys(allPlayers).forEach((fbId) => {
          const newPlayer = allPlayers[fbId];
          newPlayer.id = fbId;
          players.push(newPlayer);
        });
      }
      resolve(players);
    })
    .catch((error) => reject(error));
});

const deletePlayerById = (playerId) => axios.delete(`${baseUrl}/players/${playerId}.json`);

const addNewPlayer = (playerInfo) => axios.post(`${baseUrl}/players.json`, playerInfo);

const updatePlayer = (playerId, updatedInfo) => axios.put(`${baseUrl}/players/${playerId}.json`, updatedInfo);

export default {
  getPlayersByUid,
  deletePlayerById,
  addNewPlayer,
  updatePlayer,
};
