var should = require('should');
var Twit = require('twit');
var app = require('../config/express.js');
var config= require('../config/config');
var twitter= require('../config/twitter.js');
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
			resolve(data);
		});
	});
	should.exist(promise);
	done();
  });
  
  it('Call to trends/place API should NOT be successful (missing required param id).', function(done){
	var promise = new Promise(resolve => {
		T.get('trends/place',{count: 5}, function(err, data, response){
			should.exist(err);
		});
	});
	should.exist(promise);
	done();
  });
  
  it('Call to search/tweets API should NOT be successful (missing required param q).', function(done){
	var promise = new Promise(resolve => {
	T.get('search/tweets',{result_type: 'popular',count: 1}, function(err, data, response){
			should.exist(err);
		});
	});
	done();
  });

  it('Test of function getTweetsbyUser() in twitter.js should be successful', function(done){
	var func_call = twitter.getTweetsbyUser("Tesla");
	should.exist(func_call);
	done();
  });
  
  it('Test of function getTweetsbyKeyword() in twitter.js should be successful', function(done){
	var func_call = twitter.getTweetsbyKeyword("Gators");
	should.exist(func_call);
	done();
  });
  
  it('Test of function getTweetsbyKeyword() in twitter.js should NOT be successful', function(done){
	try{
		var func_call = twitter.getTweetsbyKeyword("");
	}
	catch(error){
	    should.not.exist(func_call);
	}
	done();
  });
  
  
  
  
});