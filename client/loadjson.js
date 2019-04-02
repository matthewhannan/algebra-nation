function loadjson() { 
	console.log("clicked")
	var mydata = data;
	//console.log(mydata[0])

	var co = document.getElementById("countryId");
	var ci = document.getElementById("cityId");
	var country = co.options[co.selectedIndex].value;
	var city = ci.options[ci.selectedIndex].value;
	console.log(country)
	console.log(city)
//	boolean exists = false;
	//var woeid;
	
	for(var x = 0; x < data.length; x++){
		if(data[x].name == city && data[x].country == country){
			console.log("FOUND WOEID")
			console.log(data[x].woeid)
			return data[x].woeid;
			//woeid = data[x].woeid;
			//exists = true;
		}
	}
	
//	if(!exists){console.log("WOEID NOT FOUND")}
//	else{
		//return woeid;
//	}
}