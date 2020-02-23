import React from 'react';
import PropTypes from 'prop-types';

import auth from '../../auth';

const UserDropdown = props => {
  const { isOpen, history } = props;
  return (
    <>
      {isOpen ? (
        <div className="text-white bg-faded absolute right-0 mr-24 flex flex-col shadow-lg">
          <div className="px-12 py-4">
            <img
              src="https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
              alt="Avatar"
              className="h-32 rounded-full"
            />
          </div>
          <button
            className="bg-contrast text-xl font-bold text-center w-full uppercase py-2 cursor-pointer  hover:bg-green-700"
            type="button"
            onClick={() => {
              auth.logout(() => {
                history.push('/');
              });
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
  history: PropTypes.objectOf(PropTypes.any)
};

UserDropdown.defaultProps = {
  isOpen: false,
  history: {}
};