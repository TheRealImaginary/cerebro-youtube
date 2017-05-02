const YouTube = require('simple-youtube-api');
const Constants = require('./constants');

const api = new YouTube(Constants.API_KEY);

const search = query =>
  api.search(query, 5, {
    type: 'video,channel',
  });

module.exports = {
  search,
};