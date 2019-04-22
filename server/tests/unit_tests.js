var should = require('should');
var Twit = require('twit');
var config= require('../config/config');
var T = new Twit(config);

before(function(done) {
  // Anything needed before unit tests
  // start, do here ...
  done();
})
	
describe('Saving to database', function() {

  this.timeout(10000);
  
  // $ mocha unit_tests.js

  it('Call to trends/place API should be successful', function(done){
	var promise = new Promise(resolve => {
		T.get('trends/place',1, function(err, data, response){
			resolve(data);
		});
	});
	should.exist(promise);
	done();
  });
	
  it('Call to search/tweets API should be successful', function(done){
	var promise = new Promise(resolve => {
	T.get('search/tweets',{q: 'Gators',result_type: 'popular',count: 1}, function(err, data, response){
			
		});
	});
	should.exist(promise);
	done();
  });
  
  
  
});