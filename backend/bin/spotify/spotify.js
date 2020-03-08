require('dotenv').config();

// load tokenStorage database model
const TokenStorage = require('./../database/tokens.schema');

// load logger for easy operation
const logger = require('./../logger/logger');

function Spotify() {
  // store information about environment
  this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  this.clientId = process.env.SPOTIFY_CLIENT_ID;
  this.redirectUri = process.env.SPOTIFY_REDIRECT;
}

// function to return login url
Spotify.prototype.getOAuthUrl = function() {
  const scopes =
    'ugc-image-upload,user-read-playback-state,user-modify-playback-state,user-read-currently-playing,streaming,app-remote-control,user-read-email,user-read-private,playlist-read-collaborative,playlist-modify-public,playlist-read-private,playlist-modify-private,user-library-modify,user-library-read,user-top-read,user-read-recently-played,user-follow-read,user-follow-modify';
  return `https://accounts.spotify.com/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=${scopes}`;
};

// function to save access token
Spotify.prototype.saveAccessToken = function(code) {
  this.setTokenCreationTime();
  this.access_token = code;
};

Spotify.prototype.getAccessToken = function() {
  return this.access_token;
};

// function to interact with refresh tokens
Spotify.prototype.saveRefreshToken = function(code) {
  this.refresh_token = code;
};

Spotify.prototype.getRefreshToken = function() {
  return this.refresh_token;
};

// save time of creation
Spotify.prototype.setTokenCreationTime = function() {
  this.tokenCreationTime = Math.floor(new Date().getTime() / 1000);
};

Spotify.prototype.getTokenCreationTime = function() {
  return this.tokenCreationTime;
};

// function to return config to pass to request to search for track
Spotify.prototype.searchTrack = function(q) {
  return {
    method: 'GET',
    uri: `https://api.spotify.com/v1/search?type=track&limit=${process.env.TRACK_RETURN_LIMIT}&q=${q}`,
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  };
};

// function to get data about particular track
Spotify.prototype.getTrackFromId = function(id) {
  return {
    method: 'GET',
    uri: `https://api.spotify.com/v1/tracks/${id}`,
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  };
};

Spotify.prototype.processTracks = function(data) {
  data = JSON.parse(data);
  //   return data;

  let processedData = [];
  data.tracks.items.forEach((q) => {
    // append all artist names
    let artists = [];
    q.artists.forEach((v) => {
      artists.push(v.name);
    });

    // check if album art exists
    let image = null;
    if (q.album.images) {
      image = q.album.images;
    }

    if(q.explicit != true){
      processedData.push({
        id: q.id,
        name: q.name,
        artist: artists,
        explicit: q.explicit,
        popularity: q.popularity,
        media: image,
        url: q.external_urls.spotify,
        length: q.duration_ms,
      });
    }
    
  });
  return processedData;
  //   return data;
};

Spotify.prototype.processTrack = (q) => {
  q = JSON.parse(q);
  // append all artist names
  const artists = [];
  q.artists.forEach((v) => {
    artists.push(v.name);
  });

  // check if album art exists
  let image = null;
  if (q.album.images) {
    image = q.album.images;
  }

  const processedData = {
    id: q.id,
    name: q.name,
    artist: artists,
    explicit: q.explicit,
    popularity: q.popularity,
    media: image,
    url: q.external_urls.spotify,
    length: q.duration_ms,
  };

  return processedData;
};

// function to automatically seed spotify with tokens when object created
Spotify.prototype.seed = function() {
  // search in the database for tokens
  TokenStorage.findOne({}, (err, tokens) => {
    if (err) {
      // general runtime error
      logger.error(`Error Seeding Object :: ${err}`);
    } else if (tokens == null) {
      // when no tokens in db, tigger creation of new
      logger.info(`Error Seeding Object :: Bin Empty`);
    } else {
      // on successful fetch, seed the object with data
      this.saveAccessToken(tokens.access_token);
      this.saveRefreshToken(tokens.refresh_token);
      logger.info(`Success Seeding Object`);
    }
  });
};

// automation functions
// config to return current player status
Spotify.prototype.getCurrentPlayerConfig = function() {
  return {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/me/player',
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  };
};

// function to add song to playlist
Spotify.prototype.addSongToPlaylist = function(songId) {
  const uri = `spotify:track:${songId}`;
  return {
    method: 'POST',
    uri: `https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST}/tracks`,
    headers: {
      Authorization: `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uris: [uri] }),
  };
};

// function to filter the
Spotify.prototype.filterSongsToShowLiveStatus = (data) => {
  logger.info('filtering data');

  const artists = [];
  data.item.artists.forEach((v) => {
    artists.push(v.name);
  });

  const processedData = {
    name: data.item.name,
    artist: artists,
    media: data.item.album.images[0].url,
    playbackTotal: data.duration_ms,
    playbackDone: data.progress_ms,
  };

  return processedData;
};

// function to filter what data to send to leaderboard
Spotify.prototype.filterSongsToShowLeaderboard = (data, uniqueUserId) => {
  const returnData = [];
  let media;
  data.forEach((x) => {
    // only show side dimension and urls
    media = [];
    x.media.forEach((y) => {
      media.push({
        sideDimension: y.height,
        url: y.url,
      });
    });

    let upvoted = false;
    if(x.upvoters.includes(uniqueUserId)){
      upvoted = true;
    }

    returnData.push({
      id: x.id,
      title: x.title,
      upvotes: x.upvotes,
      upvoted: upvoted,
      artist: x.artists,
      media,
    });
  });

  return returnData;
};

module.exports = new Spotify();
