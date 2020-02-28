import React from 'react';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';

import { getQueue, getUser, getNowPlaying } from '../requests';

import Navbar from '../components/main/Navbar';
import PlayingSection from '../components/main/PlayingSection';
import QueueSection from '../components/main/QueueSection';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {
      songSearch: [
        {
          id: 1,
          title: 'Closer (feat. Halsey)',
          artists: ['The Chainsmokers', 'Halsey'],
          albumArt:
            'https://i.scdn.co/image/ab67616d0000b273495ce6da9aeb159e94eaa453'
        },
        {
          id: uuid(),
          title: 'Closer',
          artists: ['Mickey Singh', 'Dilpreet Dhillon'],
          albumArt:
            'https://i.scdn.co/image/ab67616d0000b2733e6b572922169a736610f5c1'
        }
      ]
    };
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

  render() {
    const { history } = this.props;
    const { user, nowPlaying, queue, songSearch } = this.state;
    if (user && nowPlaying)
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
              {/* <NextUpSection nextUp={nextUp} /> */}
              <QueueSection queue={queue} user={user} songSearch={songSearch} />
            </div>
          </div>
        </div>
      );

    return <div />;
  }
}

export default MainPage;

MainPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.any)
};

MainPage.defaultProps = {
  history: {}
};
