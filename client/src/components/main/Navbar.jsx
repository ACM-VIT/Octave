import React from 'react';
import windowSize from 'react-window-size';
import PropTypes from 'prop-types';

import C2CLogo from '../C2CLogo';
import OctaveLogo from '../OctaveLogo';
import UserInfo from './UserInfo';
import UserDropdown from './UserDropdown';

class Navbar extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }

  dropdownOpen() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { history, username, avatar, windowWidth } = this.props;
    return (
      <div className="relative">
        <nav className="h-16 lg:h-20 bg-secondary text-white px-4 sm:px-32 flex items-center">
          <div className="hidden sm:flex justify-start w-1/3">
            <C2CLogo
              height={(() => {
                if (windowWidth > 1600) return '50';
                return '40';
              })()}
            />
          </div>
          <div className="block sm:flex justify-center items-center w-1/2 sm:w-1/3">
            <OctaveLogo
              height={(() => {
                if (windowWidth > 1600) return '30';
                return '25';
              })()}
              styles="my-auto"
            />
          </div>

          <div
            className="w-1/2 sm:w-1/3 focus:outline-none cursor-default"
            onClick={this.dropdownOpen.bind(this)}
            role="button"
            tabIndex={0}
          >
            <UserInfo username={username} isOpen={isOpen} />
          </div>
        </nav>
        <UserDropdown isOpen={isOpen} history={history} avatar={avatar} />
      </div>
    );
  }
}

export default windowSize(Navbar);

Navbar.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  username: PropTypes.string,
  avatar: PropTypes.string,
  windowWidth: PropTypes.number
};

Navbar.defaultProps = {
  history: {},
  username: '',
  avatar: '',
  windowWidth: 0
};
