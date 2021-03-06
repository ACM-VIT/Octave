import React from 'react';
import PropTypes from 'prop-types';

import { getQueue, getUser, getNowPlaying } from '../requests';

import Navbar from '../components/main/Navbar';
import PlayingSection from '../components/main/PlayingSection';
import QueueSection from '../components/main/QueueSection';
import LoadingAnimation from '../components/LoadingAnimation';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      submitted: false
    };

    this.emptySearch = this.emptySearch.bind(this);
    this.sendToSearchQueue = this.sendToSearchQueue.bind(this);
    this.reRenderQueue = this.reRenderQueue.bind(this);
    this.searchSong = this.searchSong.bind(this);
    this.addToQueue = this.addToQueue.bind(this);
  }

  componentDidMount() {
    getQueue()
      .then(queue => {
        // console.log(queue);
        this.setState({ queue });
      })
      .catch(err => {
        console.log(err);
      });

    getUser()
      .then(user => {
        this.setState({ user });
      })
      .catch(err => console.log(err));

    getNowPlaying()
      .then(nowPlaying => {
        this.setState({ nowPlaying });
      })
      .catch(err => console.log(err));

    setInterval(() => {
      getNowPlaying()
        .then(nowPlaying => {
          this.setState({ nowPlaying });
        })
        .catch(err => console.log(err));
      getQueue()
        .then(queue => {
          this.setState({ queue });
        })
        .catch(err => {
          console.log(err);
        });
    }, 10000);
  }

  searchSong(search) {
    this.setState({ submitted: false });
    this.setState({ search });
  }

  sendToSearchQueue(searchList, submitted) {
    // console.log(searchList);
    this.setState({ searchList, submitted });
  }

  reRenderQueue() {
    getQueue()
      .then(queue => {
        this.setState({ queue });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addToQueue(songInfo) {
    const { queue } = this.state;

    const song = {
      artist: songInfo.artist,
      id: songInfo.id,
      media: songInfo.media,
      title: songInfo.name,
      upvoted: true,
      upvotes: 1
    };

    queue.push(song);
    this.setState({ queue });
  }

  emptySearch() {
    this.setState({ search: '' });
  }

  render() {
    const { history } = this.props;
    const {
      user,
      nowPlaying,
      queue,
      searchList,
      submitted,
      search
    } = this.state;

    if (user && nowPlaying && queue)
      return (
        <div className="bg-primary h-full cursor-default overflow-auto">
          <Navbar
            history={history}
            username={user.name}
            avatar={user.picture}
          />
          <div className="mx-4 sm:mx-32 flex flex-col md:flex-row">
            <PlayingSection nowPlaying={nowPlaying} />
            <div className="w-full md:w-7/12 flex flex-col">
              <QueueSection
                queue={queue}
                sendToSearchQueue={this.sendToSearchQueue}
                submitted={submitted}
                searchList={searchList}
                reRenderQueue={this.reRenderQueue}
                searchVal={search}
                searchSong={this.searchSong}
                addToQueue={this.addToQueue}
              />
            </div>
          </div>
        </div>
      );
    return <LoadingAnimation />;
  }
}

export default MainPage;

MainPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.any)
};

MainPage.defaultProps = {
  history: {}
};
