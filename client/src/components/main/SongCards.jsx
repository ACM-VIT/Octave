import React from 'react';
import PropTypes from 'prop-types';

import SongCard from './SongCard';

const QueueCards = props => {
  const { reRenderQueue, queue, upOrDown } = props;

  const addToQueue = songInfo => {
    alert('Hi');
    const song = {
      artist: songInfo.artist,
      id: songInfo.id,
      media: songInfo.media,
      title: songInfo.title,
      upvoted: songInfo.upvoted,
      upvotes: songInfo.upvotes
    };

    queue.push(song);
  };

  if (queue.length === 0)
    return (
      <div className="bg-faded px-8 sm:px-12 py-4 shadow-lg mb-1 text-white song-title text-xl sm:text-2xl">
        Song not found in queue
      </div>
    );

  return queue.map(songInfo => (
    <SongCard
      styles="mb-1"
      songInfo={songInfo}
      key={songInfo.id}
      reRenderQueue={reRenderQueue}
      upOrDown={upOrDown}
      addToQUeue={addToQueue}
    />
  ));
};

const SearchCards = props => {
  const { searchList, reRenderQueue, queue, show, submitted, upOrDown } = props;
  if (!show) return <div />;
  if (!submitted) {
    return (
      <div className="bg-secondary px-8 sm:px-12 py-4 shadow-lg text-faded text-sm sm:text-xl ">
        Hit enter to search
      </div>
    );
  }
  if (submitted && searchList === null) {
    return (
      <div className="bg-secondary px-8 sm:px-12 py-4 shadow-lg text-faded text-sm sm:text-xl ">
        Searching...
      </div>
    );
  }
  if (submitted && searchList.length === 0) {
    return (
      <div className="bg-secondary px-8 sm:px-12 py-4 shadow-lg text-faded text-sm sm:text-xl song-title">
        Song not found
      </div>
    );
  }
  return (
    <div>
      <div className="bg-secondary px-8 sm:px-12 py-4 shadow-lg text-faded text-sm sm:text-xl song-title">
        New Songs:
      </div>
      {searchList.map(songInfo => {
        if (
          queue.some(song => song.id === songInfo.id && songInfo.upvotes !== 0)
        )
          return <div key={songInfo.id} />;
        return (
          <SongCard
            addNew
            styles="mb-1"
            songInfo={songInfo}
            key={songInfo.id}
            reRenderQueue={reRenderQueue}
            upOrDown={upOrDown}
          />
        );
      })}
    </div>
  );
};

export { QueueCards, SearchCards };

SearchCards.propTypes = {
  searchList: PropTypes.arrayOf(PropTypes.any),
  reRenderQueue: PropTypes.func,
  queue: PropTypes.arrayOf(PropTypes.any),
  show: PropTypes.bool,
  submitted: PropTypes.bool,
  upOrDown: PropTypes.func
};

SearchCards.defaultProps = {
  searchList: [],
  reRenderQueue: () => [],
  queue: [],
  show: 0,
  submitted: 0,
  upOrDown: () => []
};
