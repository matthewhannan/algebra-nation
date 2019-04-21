//require('dotenv').config()
var Twit = require('twit');
var config= require('./config');
var T=new Twit(config);
var K =new Twit(config);

function getTwitterDataByWoeID(woeid) {
	console.log('Our woeid', woeid);

	var id = {
	  id: woeid
	};

	var ret = undefined;

	try{
		console.log('PRE_CALL');
		return new Promise(resolve => {
			T.get('trends/place',id, function(err, data, response){
				console.log('Result got!');
				ret = data;
				resolve(ret);
			});
		});
		console.log("POST SHITE");
	}
	catch(e){
		console.log("ERROR I GUESS");
	}
	return ret;
}

exports.getTwitterDataByWoeID = getTwitterDataByWoeID;

////////////////////Second API CALL ///////////////////////////////////////////////////////////////////////
function getTweetsbyKeyword(keyword){
	console.log('Our Word', keyword);

	var keyword = {
		q:'hola',
		result_type : 'popular',
		count: 5
	};

	var returnType = undefined;

	try{
		console.log('PRE_SECOND API CALL ');
		return new Promise(resolve => {
			K.get('search/tweets',keyword, function(err, data, response){
				console.log('Result got!');
				console.log(data.statuses);
				returnType = data;

				var sortable = data.slice(0);
			  sortable.sort(function(a,b){
			  return(a.retweet_count-b.retweet_count);
			  });
			  for(var i =0;i<data.length;i++){
			    //console.log(data);
			    console.log(sortable[i].text);
			    //console.log(tweets[i].retweet_count)
			    console.log(sortable[i].retweet_count);
			  }
				resolve(returnType);
			});
		});
	}
	catch(e){
		console.log("ERROR I GUESS");
	}
	return sortable;

}

exports.getTweetsbyKeyword = getTweetsbyKeyword;



/*
var params = {
   q:'Trump',
   count: 5
};

T.get('trends/place',myparams)
  .catch(function (err) {
    console.log('caught error', err.stack)
  })
  .then(function (result) {
    //console.log('data', result.data);
})

T.get('search/tweets',params,gotData);
//T.get('search/tweets', { q: 'UF', count: 5 }, function(err, data, response);
function gotData(err,data,response){
  var tweets=data.statuses;

  var sortable = tweets.slice(0);
  sortable.sort(function(a,b){
  return(a.retweet_count-b.retweet_count);
  });
  for(var i =0;i<tweets.length;i++){
    //console.log(data);
    console.log(sortable[i].text);
    //console.log(tweets[i].retweet_count)
    console.log(sortable[i].retweet_count);
  }


}*/
