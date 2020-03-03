import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as EmptyHeart } from '../../icons/EmptyHeart.svg';
import { ReactComponent as FilledHeart } from '../../icons/FilledHeart.svg';

class SongCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLiked: false
    };
  }

  componentDidMount() {
    const { songInfo } = this.props;
    if (songInfo.upvoted) {
      this.setState(() => ({ isLiked: true }));
    }
  }

  handleLike() {
    this.setState(state => ({ isLiked: !state.isLiked }));
  }

  render() {
    const { styles, songInfo, onClick } = this.props;
    const { isLiked } = this.state;

    const heart = isLiked ? <FilledHeart /> : <EmptyHeart />;

    return (
      <div
        className={`bg-faded px-12 py-6 shadow-lg flex justify-between items-center ${styles}`}
      >
        <div>
          <div className="text-white song-title text-2xl">{songInfo.title}</div>
          <div className="text-faded text-xl">{songInfo.artist.join(', ')}</div>
        </div>
        <div className="flex text-2xl text-contrast">
          <div>{songInfo.upvotes}</div>
          <div
            className="ml-4 cursor-pointer focus:outline-none"
            role="button"
            tabIndex={0}
            onClick={onClick}
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
  onClick: PropTypes.func
};

SongCard.defaultProps = {
  styles: '',
  songInfo: {},
  onClick: () => []
};
