var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'web-server'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/web-server-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'web-server'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/web-server-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'web-server'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/web-server-production'
  }
};

module.exports = config[env];
