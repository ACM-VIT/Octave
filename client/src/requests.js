import axios from 'axios';
import qs from 'querystring';

const baseURL = 'https://acmoctave.azurewebsites.net';

const getQueue = () => {
  return new Promise(resolve => {
    axios({
      method: 'GET',
      url: `${baseURL}/api/leaderboard`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => resolve(res.data.data));
  });
};

const getUser = () => {
  return new Promise(resolve => {
    axios({
      method: 'GET',
      url: `${baseURL}/api/profile`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => resolve(res.data));
  });
};

const getNowPlaying = () => {
  return new Promise(resolve => {
    axios({
      method: 'GET',
      url: `${baseURL}/api/live`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => resolve(res.data));
  });
};

const getSearch = songQuery => {
  return new Promise(resolve => {
    axios({
      method: 'POST',
      url: `${baseURL}/api/search`,
      data: qs.stringify({
        query: songQuery
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      // console.log(res);
      return resolve(res);
    });
  });
};

const requestSong = songID => {
  return new Promise(resolve => {
    axios({
      method: 'POST',
      url: `${baseURL}/api/request`,
      data: qs.stringify({
        id: songID
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => resolve(res));
  });
};

const upvoteTrack = songID => {
  return new Promise(resolve => {
    axios({
      method: 'POST',
      url: `${baseURL}/api/upvote`,
      data: qs.stringify({
        id: songID
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => resolve(res));
  });
};

export {
  getQueue,
  getUser,
  getNowPlaying,
  getSearch,
  requestSong,
  upvoteTrack
};
