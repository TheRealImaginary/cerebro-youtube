'use strict';

const { memoize } = require('cerebro-tools');
const debounceP = require('debounce-promise');
const Constants = require('./constants');
const icon = require('./assets/youtube.png');
const search = debounceP(memoize(require('./youtube').search, Constants.CACHE_OPTIONS), Constants.DEBOUNCE_TIME);

const displayError = (display, hide) => {
  hide(2);
  display({
    icon,
    title: 'Error',
    subtitle: 'An Error Occured! Please try again later!',
  });
};

const displayResult = (display, hide, actions, videos) => {
  hide(2);
  const results = videos.map((item) => {
    return {
      icon,
      title: item.title,
      subtitle: item.description ? item.description : item.url,
      clipboard: item.url,
      onSelect() {
        actions.open(item.url);
        actions.hideWindow();
      },
    }
  });
  display(results);
};

const handleInput = (term, display, hide, actions) => {
  let query = term.substring(Constants.PREFIX.length);
  if (!query || query.trim().length === 0) {
    return;
  } else {
    hide(1);
    display({
      icon,
      id: 2,
      title: 'Searching...',
      subtitle: 'Patience is key!',
    });

    search(query)
      .then(videos => displayResult(display, hide, actions, videos))
      .catch(() => displayError(display, hide));
  }
};

const fn = ({ term, display, hide, actions }) => {
  if (term.startsWith(Constants.PREFIX)) {
    display({
      icon,
      id: 1,
      title: 'YouTube',
      subtitle: 'Write a term to search for!',
      clipboard: 'https://youtube.com',
    });
    handleInput(term, display, hide, actions);
  }
};

module.exports = {
  name: Constants.name,
  keyword: Constants.PREFIX,
  icon,
  fn,
};
