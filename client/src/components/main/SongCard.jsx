import React from 'react';
import PropTypes from 'prop-types';

import { upvoteTrack, requestSong } from '../../requests';

import { ReactComponent as EmptyHeart } from '../../icons/EmptyHeart.svg';
import { ReactComponent as FilledHeart } from '../../icons/FilledHeart.svg';

class SongCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLiked: false
    };

    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {
    const { songInfo } = this.props;
    if (songInfo.upvoted) {
      this.setState(() => ({ isLiked: true }));
    }
  }

  handleLike() {
    const { songInfo, reRenderQueue, addNew } = this.props;
    if (!addNew) {
      upvoteTrack(songInfo.id)
        .then(() => reRenderQueue(songInfo.id))
        .catch(err => {
          console.log(err);
        });
    } else {
      requestSong(songInfo.id)
        .then(() => reRenderQueue(null, songInfo.id))
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    const { styles, songInfo } = this.props;
    const { isLiked } = this.state;

    const heart = isLiked ? <FilledHeart /> : <EmptyHeart />;
    return (
      <div
        className={`bg-faded px-8 sm:px-12 py-4 shadow-lg flex justify-between items-center ${styles}`}
      >
        <div>
          <div className="text-white song-title text-xl sm:text-2xl">
            {songInfo.title || songInfo.name}
          </div>
          <div className="text-faded text-sm sm:text-xl">
            {songInfo.artist.join(', ')}
          </div>
        </div>
        <div className="flex text-xl sm:text-2xl text-contrast">
          <div>{songInfo.upvotes}</div>
          <div
            className="ml-4 cursor-pointer focus:outline-none"
            role="button"
            tabIndex={0}
            onClick={this.handleLike}
          >
            {heart}
          </div>
        </div>
      </div>
    );
  }
}

export default SongCard;

SongCard.propTypes = {
  styles: PropTypes.string,
  songInfo: PropTypes.objectOf(PropTypes.any),
  reRenderQueue: PropTypes.func,
  addNew: PropTypes.func
};

SongCard.defaultProps = {
  styles: '',
  songInfo: {},
  reRenderQueue: () => [],
  addNew: () => []
};
