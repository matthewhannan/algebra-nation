/* Dependencies */
var listings = require('../controllers/listings.server.controller.js'), 
    express = require('express'), 
    router = express.Router();

  var twitterapi = require('../config/twitter.js');

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */

function test (req, res)
{
  console.log('Hi there!');
}

router.route('/')
  //.get(listings.list)
  .get(test)
  //.post(listings.create);


/*
  The ':' specifies a URL parameter. 
 */
/*
router.route('/:listingId')
  .get(listings.read)
  .put(listings.update)
  .delete(listings.delete);
*/

router.route('/api/twitter/:woeid')
   .get(twitterapi.getTrendsByWoeID);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle 
  requests with a parameter.

  Say we make an example request to '/listings/566372f4d11de3498e2941c9'

  The request handler will first find the specific listing using this 'listingsById' 
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database, 
  and bind this listing to the request object.

  It will then pass control to the routing function specified above, where it will either 
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */
//router.param('listingId', listings.listingByID);

//router.param();

module.exports = router;