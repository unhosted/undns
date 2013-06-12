
function get_records_div(zone_id){
    console.log("creating records div for "+zone_id)
    var item;
    var items = rules_div.getElementsByClassName("records_div");
    var len = items.length;
    for(var i = 0; i < len; i++){
	if(items[i].dataset["zone_id"] == zone_id){
	    item = items[i];
	    break;
	}
    }
    if(!item){
	return new_records_div(zone_id);
    }
    return item;
}


function new_records_div(zone_id){    
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
    window.setTimeout(function(){item.getElementsByTagName("input")[0].focus();},0);
    return item;
}
