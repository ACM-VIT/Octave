import React from 'react';
import PropTypes from 'prop-types';

const SearchCard = props => {
  const { songInfo, queue, toggleDropdown } = props;

  return (
    <div
      className="p-4 bg-faded mb-1 hover:bg-transparent cursor-pointer focus:outline-none"
      onClick={toggleDropdown}
      role="button"
      tabIndex="0"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl text-white">{songInfo.name}</div>
          <div className="text-base text-faded">
            {songInfo.artist.join(', ')}
          </div>
        </div>
        <div
          className={
            queue.some(song => song.id === songInfo.id)
              ? 'text-contrast text-xl text-right'
              : 'text-contrast opacity-0 text-xl'
          }
        >
          Already in queue
        </div>
      </div>
    </div>
  );
};

export default SearchCard;

SearchCard.propTypes = {
  songInfo: PropTypes.objectOf(PropTypes.any),
  queue: PropTypes.arrayOf(PropTypes.any),
  toggleDropdown: PropTypes.func
};

SearchCard.defaultProps = {
  songInfo: {},
  queue: [],
  toggleDropdown: () => []
};
