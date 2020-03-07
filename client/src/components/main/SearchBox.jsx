import React from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';

import { getSearch } from '../../requests';

class SearchBox extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    gsap.from('.search-box', { opacity: 0, duration: 1, y: 30 });
  }

  handleSubmit(e) {
    const { sendToSearchQueue, searchVal, emptyBox } = this.props;
    e.preventDefault();
    sendToSearchQueue(null, true);
    if (searchVal.length > 2)
      getSearch(searchVal)
        .then(songSearch => {
          sendToSearchQueue(songSearch.data, true);
        })
        .catch(err => console.log(err));
    else emptyBox();
  }

  render() {
    const { searchVal, searchSong } = this.props;

    return (
      <form
        className="search-box flex flex-row z-40"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          className="bg-faded px-8 py-0 text-base sm:text-xl text-white box-border w-9/12 sm:w-11/12 placeholder-white"
          placeholder="Add a Song to Queue"
          value={searchVal}
          onChange={e => searchSong(e.target.value)}
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
  searchVal: PropTypes.string,
  searchSong: PropTypes.func,
  emptyBox: PropTypes.func
};

SearchBox.defaultProps = {
  sendToSearchQueue: () => [],
  searchVal: '',
  searchSong: () => [],
  emptyBox: () => []
};
