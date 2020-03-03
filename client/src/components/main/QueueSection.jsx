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
      isOpen: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.sendToSearchQueue = this.sendToSearchQueue.bind(this);
  }

  toggleDropdown() {
    this.setState(state => ({ isOpen: !state.isOpen }));
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

  sendToSearchQueue(songList) {
    const { sendToSearchQueue } = this.props;
    sendToSearchQueue(songList);
  }

  render() {
    let { queue } = this.props;
    const { isOpen } = this.state;
    const { searchList, reRenderQueue } = this.props;

    queue = queue.sort((a, b) => parseFloat(b.upVotes) - parseFloat(a.upVotes));

    return (
      <section className="mt-5 pl-10">
        <div className="flex justify-between">
          <SectionHeader>Queue</SectionHeader>
          <div className="flex flex-col w-2/3 mb-5 py-2 items-stretch relative">
            <SearchBox
              sendToSearchQueue={this.sendToSearchQueue}
              toggleDropdown={this.toggleDropdown}
            />
            <div className={isOpen ? '' : 'hidden'}>
              <div className="bg-lighter-primary absolute w-full border-solid border-4 border-lighter-primary">
                {searchList.length > 0 ? (
                  searchList.map(songInfo => (
                    <SearchCard
                      songInfo={songInfo}
                      key={songInfo.id}
                      queue={queue}
                      toggleDropdown={this.toggleDropdown}
                      sendToSearchQueue={this.sendToSearchQueue}
                      reRenderQueue={reRenderQueue}
                    />
                  ))
                ) : (
                  <EmptySearchCard toggleDropdown={this.toggleDropdown} />
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
  sendToSearchQueue: PropTypes.func,
  searchList: PropTypes.arrayOf(PropTypes.any),
  reRenderQueue: PropTypes.func
};

QueueSection.defaultProps = {
  queue: [],
  sendToSearchQueue: () => [],
  searchList: [],
  reRenderQueue: () => []
};
