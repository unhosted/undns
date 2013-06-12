function init_remotestorage(){
    remoteStorage.claimAccess({ "dns": 'rw' });
    remoteStorage.displayWidget();
}

function zone_to_object(zone_id){
    var zone = get_zone(zone_id);
    if(!zone){
	return;
    }
    var data = new Object;
    data["soa"] = inputs_to_object(zone);
    data["name"] = zone_name(zone);
    data["records"] = to_array(get_records_div(zone_id)
			     .getElementsByClassName("record_li"))
	.map(
	    function(record){
		return inputs_to_object(record);
	    }
	);
    return data;
}

function store_zone(zone_id){
    var data = zone_to_object(zone_id);
    console.log(data);
    notify("Storeing : "+zone_name(get_zone(zone_id)))
    remoteStorage.dns.store_zone(data);
}

function load_zone(name){
    console.log("loading zone : " + name)
    remoteStorage.dns.zone(name).then(
	function(data) {
	    var zone = get_zone_by_name(name);
	    object_to_input(zone,data["soa"]);
	    // delete old records for this zone_id here
	    var records_div = new_records_div(zone.dataset["zone_id"])
	    data["records"].forEach(
		function (record){
		    object_to_input(new_record(records_div), record);
		}
	    )
	}
    );
}

function load_all_zones(){
    remoteStorage.dns.ls_zones().then(
	function(list){ 
	    list.forEach(
		function(zone){
		    load_zone(zone);
	    });
	});
}

