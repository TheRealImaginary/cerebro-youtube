module.exports = {
  name: 'YouTube',
  PREFIX: 'yt',
  API_KEY: 'AIzaSyC6i5izll3-aR_FAtox1E6SObrQuolQTwg',
  DEBOUNCE_TIME: 200, // ms
  CACHE_OPTIONS: {
    CACHE_TIME: 1800000, // ms 30mins
    promise: 'then',
  },
  YOUTUBE_URL: 'https://youtube.com',
  YOUTUBE_SEARCH_URL: 'https://youtube.com/results?search_query=',
  YOUTUBE_VIDEO_THUMBNAIL: id => `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
};