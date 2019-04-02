//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://mattylight:mattylight12@ds113853.mlab.com:13853/mattdb', //place the URI of your mongo database here.
  },
  port: process.env.PORT || 8080
};

 module.exports = {
 consumer_key:'3rgUfi3CErVJfKcUfMumeEjWB',
 consumer_secret:'07mXz5SL1B3uPTN2BruFdiotjcOXhzfySyJ0i3YKGoFb6QiDpz',
 access_token:'1106685110680735746-KU1BVtUXIKGQwoEBfahB9U8KGototg',
 access_token_secret:'7gm24BjqRW9Hk9kVZyPfhcWynBBu32LKLqDb6ypkWbAiU'
};
