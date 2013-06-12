
function to_array(x) {
    return Array.prototype.slice.call(x);
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


function inputs_to_object(parent){
    var values = parent.getElementsByTagName("input");
    var ret = new Object;
    var len = values.length;
    for(var i = 0; i< len; i++){
	ret[values[i].name] = values[i].value;
    }
    return ret;
}

function object_to_input(parent, data){
    var values = parent.getElementsByTagName("input");
    var len =  values.length;
    for(var i = 0; i < len; i++){
	values[i].value = data[values[i].name];
    }
    return parent;
    
}

function notify(text, type){
    var t = document.getElementById("msg");
    t.innerHTML = text;
    if(type) {
	t.parent.className = "messages "+type;
    } else {
	t.parent.className = "messages";
    }
}
