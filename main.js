window.onload = init;
function init_remotestorage(){
    remoteStorage.claimAccess({ "dns-zones": 'rw' });
    remoteStorage.displayWidget();
}

var zones_div
var rules_div
var current_record_div
var zones_counter = 0;

function init(){
    init_remotestorage();
    zones_div = document.all.zones_crud
    rules_div = document.all.rules_crud
}


function create_zone(){
    var item = current_zone();
    var zone = document.all.zone_li_template.cloneNode(true);
    zone.id = "";
    zone.getElementsByTagName("form")[0].zone_id.value = zones_counter+=1; // get valid id or name from remote
    zone.onclick = function (e){
	var selected = zones_div.getElementsByClassName("zone_li selected")[0];
	if(selected){
	    selected.className = "zone_li";
	}
	zone.className = "zone_li selected"
    }
    zones_div.appendChild(zone);
}

function delete_zone(){
    var item = current_zone();
    var confirm = window.prompt("are you shure you want to delete this zone : "+inputs_to_object(item).name+"\ntype yes to confirm");
    if(confirm.toLowerCase().trim() == "yes"){
	item.remove();
    }
    //some stuff should happen in the rs here
}

function inputs_to_object(parent){
    var values = parent.getElementsByTagName("input");
    var ret = new Object;
    for(var i = 0; i< values.length; i++){
	ret[values[i].name] = values[i].value;
    }
    ret["name"] = zone.getElementsByClassName("zone name")[0].innerHTML;
    return ret;
}


//might not work well
function inspect_object(obj){
    var ret = "{"
    var keys = obj.keys
    if(keys){
	keys.forEach(function(key){
	    ret + ' "' + key + '" : "' + obj[key] +'",'
	});
	ret.substr(0,ret.length-1);
    }
    ret+="}"
    return ret;
}

function edit_zone(){
    var edit_button = document.getElementById("zones_edit");
    if (edit_button.innerHTML == "done?"){ //ugly
	stop_edit();
    }else{
	start_edit();
    }
}

function stop_edit(){
    document.getElementById("zones_edit").innerHTML = "Edit";
    show_zones();
    rules_div.getElementsByClassName("active")[0].className = "records_div"
}

function start_edit(){
    if(!current_zone())
	return;
    document.getElementById("zones_edit").innerHTML = "done?";
    hide_other_zones();
    var tmp = rules_div.getElementsByClassName("records_div active")[0]
    if(tmp) {
	tmp.className = "rules_div";
    }
    current_records_div = get_records_div(current_zone_id());
    current_records_div.className = "active";    
}


function get_records_div(zone_id){
    //just creating new ones for now
    var item = document.all.records_div_template.cloneNode(true);
    item.id = "";
    item.dataset["zone_id"] = zone_id;
    new_record(item);
    rules_div.appendChild(item);
    return item;
}

function new_record(parent){
    var item = document.getElementById("record_li_template").cloneNode(true);
    item.id = "";
    item.getElementsByClassName("remove_button")[0]
	.onclick = function(e){
	    item.remove();
	};
    parent.appendChild(item)
}
