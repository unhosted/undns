window.onload = init;

var zones_div
var rules_div
var current_record_div
var zones_counter = 0;


function init(){
    init_remotestorage();
    zones_div = document.all.zones_crud
    rules_div = document.all.rules_crud
    load_all_zones();

}

