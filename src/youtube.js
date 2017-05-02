const YouTube = require('simple-youtube-api');
const constants = require('./constants');

const api = new YouTube(constants.API_KEY);

const search = query =>
  api.search(query, 5, {
    type: 'video,channel',
  });

module.exports = {
  search,
};