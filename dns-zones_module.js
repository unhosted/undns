remoteStorage.defineModule("dns", function(privateClient, publicClient){
    privateClient.declareType("zonefile", {
	"type" : "object",
	"properties" : {
	    "name" : {
		"type" : "string"
	    },
	    "soa" : {
		"type" : "object",
		"properties" : {
		    "mname" : {
			"type" : "string",
			"description" : "The <domain-name> of the name server that was the original or primary source of data for this zone."
		    },
		    "rname" : {
			"type" : "string",
			"description" : "A <domain-name> which specifies the mailbox of the person responsible for this zone."

		    },
		    "serial" : {
			"type" : "integer",
			"description" : "The unsigned 32 bit version number of the original copy of the zone.  Zone transfers preserve this value.  This value wraps and should be compared using sequence space arithmetic."

		    },
		    "refresh" : {
			"type" : "integer",
			"description" : "A 32 bit time interval before the zone should be refreshed."
		    },
		    "retry" : {
			"type" : "integer",
			"description" : "A 32 bit time interval that should elapse before a failed refresh should be retried."
		    },
		    "expire" : {
			"type" : "integer",
			"description" : "A 32 bit time value that specifies the upper limit on the time interval that can elapse before the zone is no longer authoritative."
		    }
		}
	    },
	    "records" : {
		"type" : "array",
		"items" : {
		    "type" : "object",
		    "properties" : {
			"name" : {
			    "type" : "string"
			},
			"type" : {
			    "type" : "string",
			    "enum" : ["A","NS","CNAME","PTR"] //get complete list https://en.wikipedia.org/wiki/List_of_DNS_record_types
			},
			"value" : {
			    "type" : "string",
			},		    
			"ttl" : {
			    "type" : "integer"
			}
		    }
		}
	    } 
	}
    });
    var path = "zonefiles/"
    return {
	"exports" : {
	    "store_zone" : function(data) {
		return privateClient
		    .storeObject("zonefile"
				 ,path+data["name"]
				 , data )
	    } ,
	    "zone" : function(name) {
		return privateClient.getObject(path+name);
	    },
	    "ls_zones" : function() {
		return privateClient.getListing(path);
	    },
	    "delete_zone": function(name) {
		return privateClient.remove(path+name);
	    }
	}
  	
    }

});

