const YouTube = require('simple-youtube-api');
const Constants = require('./constants');

const api = new YouTube(Constants.API_KEY);

const search = (query, limit = 10) => {
  return api.search(query, limit, {
    type: 'video,channel',
  });
}

module.exports = {
  search,
};