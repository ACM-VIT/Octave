import React from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';

class PlayingCard extends React.Component {
  componentDidMount() {
    gsap.from('.playing-card', { opacity: 0, duration: 1, y: 30 });
  }

  render() {
    const { nowPlaying } = this.props;
    if (nowPlaying.message !== 'Playback Paused')
      return (
        <div className="playing-card bg-secondary shadow-lg">
          <img
            src={nowPlaying.media}
            alt="Album Art"
            className="w-full px-10 py-5"
          />
          <div className="mx-10 pb-5">
            <div className="text-white text-xl sm:text-4xl song-title">
              {nowPlaying.name}
            </div>
            <div className="text-white text-sm sm:text-xl text-faded">
              {nowPlaying.artist.join(', ')}
            </div>
          </div>
        </div>
      );
    return (
      <div className="playing-card bg-secondary shadow-lg py-4">
        <div id="circuleExtern">
          <div id="circuleMedium">
            <div id="circuleCenter" />
          </div>
        </div>
        <div className="mx-10 pb-5 mt-4">
          <div className="text-white text-xl sm:text-4xl song-title text-center">
            Playback Paused
          </div>
        </div>
      </div>
    );
  }
}

export default PlayingCard;

PlayingCard.propTypes = {
  nowPlaying: PropTypes.objectOf(PropTypes.any)
};

PlayingCard.defaultProps = {
  nowPlaying: {}
};
