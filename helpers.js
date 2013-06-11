function current_zone(){
    return zones_div.getElementsByClassName("zone_li selected")[0];
}

function current_zone_id(){
    return current_zone().getElementsByTagName("form")[0].zone_id.value;
    //error handling neccesary here??
}

function hide_other_zones(){
    var zones = zones_div.getElementsByClassName("zone_li");
    for(var i = 0; i < zones.length; i++){
	var item = zones[i];
	if(!item.className.match(/selected/)){
	    item.style.display = "none"
	}
    }
}

function show_zones(){
    var zones = zones_div.getElementsByClassName("zone_li");
    for(var i = 0; i < zones.length; i++){
	var item = zones[i];
	item.style.display = "block"
	
    }
}

