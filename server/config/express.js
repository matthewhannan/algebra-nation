var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config');
    //listingsRouter = require('../routes/listings.server.routes');

var twitterapi = require('../config/twitter.js');

module.exports.init = function() {
  //connect to database
  //mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());


  /**TODO
  Serve static files */
  app.use('/', express.static('client'));


  /**TODO
  Use the listings router for requests to the api */
  //app.use('/api/listings', listingsRouter);

  //app.use('/api/twitter', listingsRouter);

  app.get('/api/twitter/trends', async function express_stuff(req, res)
  {
	var twitterData = undefined;

	console.log("found EXPRESS");
	try{
		console.log("PRE AWAIT");
		twitterData = await (twitterapi.getTwitterDataByWoeID(req.query.id));
		console.log("POST AWAIT");
	}
	catch(e){
		console.log("EXPRESS CATCH");
		console.log(e);
	}
	console.log("express after API call");
    console.log(twitterData);

	res.send(JSON.stringify(twitterData));
  });

  app.get('/api/twitter/keyword', async function express_stuff_2(req, res) {
    var twitterData = undefined;

    console.log("found EXPRESS");
    try {
      console.log("PRE AWAIT");
      twitterData = await twitterapi.getTweetsbyKeyword(req.query.keyword);
      console.log("POST AWAIT");

    }
    catch (e) {
      console.log("EXPRESS CATCH");
      console.log(e);
    }

    console.log("Express after api call");
    console.log(twitterData);

    res.send(JSON.stringify(twitterData));

  });

  /**TODO
  Go to homepage for all routes not specified */
  app.all('/*', function (req, res, next) {
    res.sendFile(path.resolve('client/index.html'));
  });

  return app;
};
