
function create_zone(name){
    var zone = document.all.zone_li_template.cloneNode(true);
    zone.id = "";
    zone.dataset["zone_id"] = zones_counter+=1; // get valid id or name from remote
    zone.onclick = function (e){
	var selected = zones_div.getElementsByClassName("zone_li selected")[0];
	if(selected){
	    selected.className = "zone_li";
	}
	zone.className = "zone_li selected"
    }
    if(!name){
	name = zones_counter.toString();
    }
    zone.getElementsByClassName("zone name")[0].innerHTML = name;
    zones_div.appendChild(zone);
    return zone;
}

function zone_name(item){
    return item.getElementsByClassName("zone name")[0].innerHTML;
}

function delete_zone(item){
    var confirm = window.prompt("are you shure you want to delete this zone : "+zone_name(item)+"\ntype yes to confirm");
    if(confirm.toLowerCase().trim() == "yes"){
	item.remove();
	return true;
    }
    return false;
}

function current_zone(){
    return zones_div.getElementsByClassName("zone_li selected")[0];
}

function get_zone(zone_id){
    var zones = zones_div.getElementsByClassName("zone_li");
    var len = zones.length;
    for(var i = 0; i < len; i++){
	if( zones[i].dataset["zone_id"] == zone_id){
	    return zones[i];
	}   
    }
    return undefined
}

function get_zone_by_name(name){
    var zones = zones_div.getElementsByClassName("zone_li");
    var len = zones.length;
    for(var i = 0; i < len; i++){
	if( zone_name(zones[i]) == name){
	    return zones[i];
	}   
    }
    return create_zone(name);

}

function current_zone_id(){
    return current_zone().dataset.zone_id;
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

