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
      search:'',
      submitted: false
    };

    this.sendToSearchQueue = this.sendToSearchQueue.bind(this);
    this.reRenderQueue = this.reRenderQueue.bind(this);
  }
  searchSong(search){
    this.setState({submitted:false})
    this.setState({ search });
  }

  componentDidMount() {
    getQueue()
      .then(queue => {
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
  }

  sendToSearchQueue(searchList, submitted) {
    this.setState({ searchList, submitted });
  }

  reRenderQueue() {
    getQueue()
      .then(queue => {
        console.log('intitiating');
        this.setState({ queue });
        console.log('terminating');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { history } = this.props;
    const { user, nowPlaying, queue, searchList } = this.state;
    if (user && nowPlaying && queue)
      return (
        <div className="bg-primary h-full cursor-default overflow-auto">
          <Navbar
            history={history}
            username={user.username}
            avatar={user.avatar}
          />
          <div className="mx-4 sm:mx-32 flex flex-col md:flex-row">
            <PlayingSection nowPlaying={nowPlaying} />
            <div className="w-full md:w-7/12 flex flex-col">
              <QueueSection
                queue={queue}
                sendToSearchQueue={this.sendToSearchQueue}
                submitted={this.state.submitted}
                searchList={searchList}
                reRenderQueue={this.reRenderQueue}
                searchVal={this.state.search}
                searchSong={this.searchSong.bind(this)}
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
