'use strict';

const debounceP = require('debounce-promise');
const icon = require('./assets/youtube.png');
const search = debounceP(require('./youtube.js').search, 200);

const displayError = (display, hide, err) => {
  console.log(err);
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
      subtitle: item.type === 'video' ? item.description : item.url,
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
  let query = term.substring(2);
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
      .then((videos) => displayResult(display, hide, actions, videos))
      .catch((err) => displayError(display, hide, err));
  }
};

const fn = ({ term, display, hide, actions }) => {
  if (term.startsWith('yt')) {
    display({
      icon,
      id: 1,
      title: 'YouTube',
      subtitle: 'Write a term to search for!',
    });
    handleInput(term, display, hide, actions);
  }
};

module.exports = {
  fn
};
