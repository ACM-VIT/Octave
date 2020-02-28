import React from 'react';
import PropTypes from 'prop-types';

const UserDropdown = props => {
  const { isOpen, history, avatar } = props;
  return (
    <>
      {isOpen ? (
        <div className="text-white bg-faded absolute right-0 mr-32 flex flex-col shadow-lg z-10">
          <div className="px-10 lg:px-12 py-4">
            <img
              src={avatar}
              alt="Avatar"
              className="h-24 lg:h-32 rounded-full"
            />
          </div>
          <button
            className="bg-contrast text-lg lg:text-xl font-bold text-center w-full uppercase py-2 cursor-pointer hover:bg-green-700"
            type="button"
            onClick={() => {
              history.push('/');
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserDropdown;

UserDropdown.propTypes = {
  isOpen: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.any),
  avatar: PropTypes.string
};

UserDropdown.defaultProps = {
  isOpen: false,
  history: {},
  avatar: ''
};
