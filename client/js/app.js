/* Might be a good idea to put twitter API interface code in its own module*/
var twitter = angular.module('Twitter');

/* register the application and inject all the necessary dependencies */
/* pretty much the entire project depends on the interface */
var app = angular.module('directoryApp', ['Twitter']);
