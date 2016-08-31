var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'app'
    },
    port: process.env.PORT || 8080,
    ChannelId: process.env.ChannelId || '',
    ChannelSecret: process.env.ChannelSecret || '',
    ChannelMID: process.env.MID || '',
  },

  production: {
    root: rootPath,
    app: {
      name: 'app'
    },
    port: process.env.PORT || 8080,
    ChannelId: process.env.ChannelId || '',
    ChannelSecret: process.env.ChannelSecret || '',
    ChannelMID: process.env.MID || ''
    
  }
};

module.exports = config[env];
