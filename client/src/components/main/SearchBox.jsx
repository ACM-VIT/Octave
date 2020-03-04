import React from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';

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

  componentDidMount() {
    gsap.from('.search-box', { opacity: 0, duration: 1, y: 30 });
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    const { sendToSearchQueue, toggleDropdown } = this.props;
    const { title } = this.state;
    e.preventDefault();
    sendToSearchQueue(null, true);
    getSearch(this.props.searchVal)
      .then(songSearch => {
        sendToSearchQueue(songSearch.data,true);
        // toggleDropdown(true);
      })
      .then(() => {
        this.setState({ title: '' });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { title } = this.state;
    return (
      <form
        className="search-box flex flex-row z-40"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          className="bg-faded px-8 py-0 text-base sm:text-xl text-white box-border w-9/12 sm:w-11/12 placeholder-white"
          placeholder="Add a Song to Queue"
          value={this.props.searchVal}
          onChange={(e)=>this.props.searchSong(e.target.value)}
        />
        <input
          type="submit"
          className="h-full w-3/12 sm:w-1/12 cursor-pointer text-5xl leading-none hover:bg-green-700 bg-contrast"
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
