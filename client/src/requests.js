import { v1 as uuid } from 'uuid';
import axios from 'axios';

const user = {
  userID: '117081039159565269574',
  username: 'John Doe',
  avatar:
    'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'
};

const nowPlaying = {
  id: uuid(),
  title: 'Falling',
  artists: ['Trevor Daniels'],
  albumArt:
    'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Trevor_Daniel_-_Falling.png/220px-Trevor_Daniel_-_Falling.png',
  likedBy: [11, 1231, 123]
};

const baseURL = 'https://acmoctave.azurewebsites.net';

const getQueue = () => {
  return new Promise(resolve => {
    axios({
      method: 'GET',
      url: `${baseURL}/api/leaderboard`,
      headers: {
        Authorization: `Bearer  ${localStorage.getItem('token')}`
      }
    }).then(res => resolve(res.data.data));
  });
};

const getUser = () => {
  return new Promise(resolve => {
    resolve(user);
  });
};

const getNowPlaying = () => {
  return new Promise(resolve => {
    // axios({
    //   method: 'GET',
    //   url: `${baseURL}/api/live`,
    //   headers: {
    //     Authorization: `Bearer  ${localStorage.getItem('token')}`
    //   }
    // }).then(res => console.log(res));
    resolve(nowPlaying);
  });
};

export { getQueue, getUser, getNowPlaying };
