import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';
import SongCard from './SongCard';
import SearchBox from './SearchBox';
import SearchCard from './SearchCard';
import EmptySearchCard from './EmptySearchCard';

class QueueSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(() => ({ isOpen: false }));
  }

  upOrDown(id) {
    // alert(id);
    const { queue } = this.props;

    queue.forEach(song => {
      if (song.id === id) {
        // Handle likes
      }
    });
  }

  render() {
    let { queue } = this.props;
    const { songSearch } = this.props;
    const { isOpen } = this.state;

    queue = queue.sort((a, b) => parseFloat(b.upVotes) - parseFloat(a.upVotes));

    return (
      <section className="mt-5 pl-10">
        <div className="flex justify-between">
          <SectionHeader>Queue</SectionHeader>
          <div className="flex flex-col w-2/3 mb-5 py-2 items-stretch relative">
            <SearchBox />
            <div className={isOpen ? '' : 'hidden'}>
              <div className="bg-lighter-primary absolute w-full border-solid border-4 border-lighter-primary">
                {songSearch.length > 0 ? (
                  songSearch.map(songInfo => (
                    <SearchCard
                      songInfo={songInfo}
                      key={songInfo.id}
                      queue={queue}
                      handleClick={this.handleClick}
                    />
                  ))
                ) : (
                  <EmptySearchCard handleClick={this.handleClick} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-y-scroll h-screen-80 bg-secondary">
          {queue.map(songInfo => (
            <SongCard
              styles="mb-1"
              songInfo={songInfo}
              onClick={() => {
                this.upOrDown.bind(this)(songInfo.id);
              }}
              key={songInfo.id}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default QueueSection;

QueueSection.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.any),
  songSearch: PropTypes.arrayOf(PropTypes.any)
};

QueueSection.defaultProps = {
  queue: [],
  songSearch: []
};
