'use strict';

import Preview from './Preview/preview';
import React from 'react';

const { memoize } = require('cerebro-tools');
const debounceP = require('debounce-promise');
const Constants = require('./constants');
const icon = require('./assets/youtube.png');
const channelIcon = require('./assets/channel.png');
const search = debounceP(memoize(require('./youtube').search, Constants.CACHE_OPTIONS), Constants.DEBOUNCE_TIME);

const displayError = (display, hide) => {
  hide(2);
  display({
    icon,
    title: 'Error',
    subtitle: 'An Error Occured! Please try again later!',
  });
};

const displayResult = (display, hide, actions, query, videos) => {
  hide(2);
  const searchUrl = `${Constants.YOUTUBE_SEARCH_URL}${query}`;
  let results = [{
    icon,
    title: 'More Results',
    subtitle: 'Open more results in browser',
    clipboard: searchUrl,
    onSelect() {
      actions.open(searchUrl);
      actions.hideWindow();
    },
  }];
  results = results.concat(videos.map((item) => {
    const isVideo = !!item.description;
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
  }));
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

    search(query, 10)
      .then(videos => displayResult(display, hide, actions, query, videos))
      .catch(() => displayError(display, hide));
  }
};

const fn = ({ term, display, hide, actions }) => {
  if (term.trim().startsWith(Constants.PREFIX)) {
    display({
      icon,
      id: 1,
      title: 'YouTube',
      subtitle: 'Write a term to search for!',
      clipboard: Constants.YOUTUBE_URL,
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
