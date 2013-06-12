function gui_create_zone(){
    create_zone();
}

function gui_delete_zone(){
    var item = current_zone();
    if(item && delete_zone(item)){	
	var name = zone_name(item);
	remoteStorage.dns.delete_zone(name);
    }
    get_records_div(item.dataset.zone_id).remove();
}

function gui_edit_zone(){
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
    store_zone(current_zone_id());
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
    current_records_div.className += " active";    
}
