//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://mattylight:mattylight12@ds113853.mlab.com:13853/mattdb', //place the URI of your mongo database here.
  },
  port: process.env.PORT || 8080
};
