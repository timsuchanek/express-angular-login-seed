module.exports = {
  development: {
    app: {
      name: 'express-angular-login-seed'
    },
    root: require('path').normalize(__dirname + '/..'),
    db: process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/express-angular-seed',
    BCRYPT_WORK_FACTOR: 10,
    SESSION_SECRET: 'kJYcwr3as9zb4v6X2WjKKzbc'
  }
};