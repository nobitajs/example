const config = {
  temp: {
    path: './views'
  },
  listen: {
    port: 6001,
    callback() {
      console.log('http://localhost:6001');
    }
  },

  middlewares: [ 'notfound' ],
};

module.exports = config;
