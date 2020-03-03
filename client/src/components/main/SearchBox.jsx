import React from 'react';
import PropTypes from 'prop-types';

import { getSearch } from '../../requests';

class SearchBox extends React.Component {
  constructor() {
    super();

    this.state = {
      title: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    const { sendToSearchQueue, toggleDropdown } = this.props;
    const { title } = this.state;
    e.preventDefault();
    getSearch(title)
      .then(songSearch => {
        sendToSearchQueue(songSearch.data);
        toggleDropdown(true);
      })
      .then(() => {
        this.setState({ title: '' });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { title } = this.state;
    return (
      <form className="flex flex-row z-50" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="bg-faded px-8 py-0 text-xl text-white box-border w-11/12 placeholder-white"
          placeholder="Add a Song to Queue"
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          className="h-full w-1/12 cursor-pointer text-5xl leading-none hover:bg-green-700 bg-contrast"
          value="+"
        />
      </form>
    );
  }
}

export default SearchBox;

SearchBox.propTypes = {
  sendToSearchQueue: PropTypes.func,
  toggleDropdown: PropTypes.func
};

SearchBox.defaultProps = {
  sendToSearchQueue: () => [],
  toggleDropdown: () => []
};
