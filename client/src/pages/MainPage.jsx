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

    this.state = {};

    this.sendToSearchQueue = this.sendToSearchQueue.bind(this);
    this.reRenderQueue = this.reRenderQueue.bind(this);
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

  sendToSearchQueue(searchList) {
    this.setState({ searchList });
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
          <div className="mx-32 flex">
            <PlayingSection nowPlaying={nowPlaying} />
            <div className="w-7/12 flex flex-col">
              <QueueSection
                queue={queue}
                sendToSearchQueue={this.sendToSearchQueue}
                searchList={searchList}
                reRenderQueue={this.reRenderQueue}
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
