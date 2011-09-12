var showElement = function(divId){
  $('div.right div.col5').hide();
  $(divId).toggle('slide', {'direction': 'up'});  

  switch (divId){
  	case '#twitter':
      if( ! $('.tweetList').length) {
  		  $('#tweetstream').tweetable({'hashtag' : 'luddles'});
      }
  	break;
  	case '#saturday':
  		showMap('teamsportMap');
      showMap('dinerMap');
  		showMap('meetMap');
  	break;
  }
  return false;
}

var showMap = function(mapId) {
    var myLatlng = getLatLng(mapId);
    var myOptions = {
      zoom: 15,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    var marker = new google.maps.Marker({
        position: myLatlng, 
        map: new google.maps.Map(document.getElementById(mapId), myOptions),
    });

};

var getLatLng = function(mapId){
	switch(mapId){
		case "teamsportMap":
			return new google.maps.LatLng(51.619069, -0.045154);
		break;
		case "dinerMap":
			return new google.maps.LatLng(51.543351, -0.1499);
		break;
    case "meetMap":
      return new google.maps.LatLng(51.56624, -0.11062);
    break;
	}
}


