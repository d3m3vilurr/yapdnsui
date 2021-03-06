var request = require('request');
var db = require('./db.js');

// Handle servers description
exports.servers = function(req, res, callback) {
        if (req.server.url && req.server.password) {
                request(
                {
                        dataType: 'json',
                        method: 'GET',
                        url: req.server.url+"/servers",
                        headers: { "Authorization" : "Basic " + new Buffer("a:" + req.server.password).toString("base64") }
                },
                function (error, response, body) {
                        callback(error, response, body);
                });
        }
};

// Handle confuguration listing
exports.config = function(req, res, callback){
        if (req.server.url && req.server.password) {
                request(
                {
                        dataType: 'json',
                        method: 'GET',
                        url: req.server.url+"/servers/localhost/config",
                        headers: { "Authorization" : "Basic " + new Buffer("a:" + req.server.password).toString("base64") }
                },
                function (error, response, body) {
                        callback(error, response, body);
                });
        }
};

/* -------------------------------------------------------- */
/* ZONES / DOMAINS */
// Handle Zones listing
exports.zoneslist= function(req, res, callback){
        if (req.server.url && req.server.password) {
                request(
                {
                        dataType: 'json',
                        method: 'GET',
                        url: req.server.url+"/servers/localhost/zones",
                        headers: { "Authorization" : "Basic " + new Buffer("a:" + req.server.password).toString("base64") }
                },
                function (error, response, body) {
                        callback(error, response, body);
                });
        }
};

// Handle Zones delete
exports.zonesdelete = function(req, res, callback){
        if (req.server.url && req.server.password && req.params.zone_id) {
                request(
                {
                        dataType: 'json',
                        method: 'DELETE',
                        url: req.server.url+"/servers/localhost/zones/"+req.params.zone_id,
                        json: { "rrsets": [ { "name": req.params.zone_id, "changetype": "delete" , "changetype": "delete", "records": [] , "comments": [] } ] },
                        headers: { "Authorization" : "Basic " + new Buffer("a:" + req.server.password).toString("base64") }
                },
                function (error, response, body) {
                        callback(error, response, body);
                });
        }
};

// Handle Zones add
exports.zonesadd = function(req, res, callback){
        if (req.server.url && req.server.password && req.body.name) {
                request(
                {
                        dataType: 'json',
                        method: 'POST',
                        url: req.server.url+"/servers/localhost/zones",
                        json: { "kind": req.body.type, "name": req.body.name, "masters": [], "nameservers": [], "records": []},
                        headers: { "Authorization" : "Basic " + new Buffer("a:" + req.server.password).toString("base64") }
                },
                function (error, response, body) {
                        callback(error, response, body);
                });
        }
};

/* -------------------------------------------------------- */
/* RECORDS */

// Handle records listing
exports.recordslist = function(req, res, callback){
        if (req.server.url && req.server.password && req.params.zone_id) {
                request(
                {
                        dataType: 'json',
                        method: 'GET',
                        url: req.server.url+"/servers/localhost/zones/"+req.params.zone_id,
                        headers: { "Authorization" : "Basic " + new Buffer("a:" + req.server.password).toString("base64") }
                },
                function (error, response, body) {
                        callback(error, response, body);
                });
        }
};

// Handle records delete
exports.recordsdelete = function(req, res, record, callback){
        if (req.server.url && req.server.password && req.params.zone_id && record) {
                request(
                {
                        dataType: 'json',
                        method: 'PATCH',
                        url: req.server.url+"/servers/localhost/zones/"+req.params.zone_id,
                        json: { "rrsets": [ { "name": record.name, "type": record.type, "changetype": "delete", "records": [ ] } ] },
                        headers: { "Authorization" : "Basic " + new Buffer("a:" + req.server.password).toString("base64"),
				   "Content-Type": "application/json" }
                },
                function (error, response, body) {
                        callback(error, response, body);
                });
        }
};

// Handle records update/add
exports.recordsupdate = function(req, res, record, callback){
        if (req.server.url && req.server.password && req.params.zone_id && record) {
                request(
                {
                        dataType: 'json',
                        method: 'PATCH',
                        url: req.server.url+"/servers/localhost/zones/"+req.params.zone_id,
                        json: { "rrsets": [ { "name": record.name, "type": record.type, "changetype": "replace", "records": [ record ] } ] },
                        headers: { "Authorization" : "Basic " + new Buffer("a:" + req.server.password).toString("base64"), 
				   "Content-Type": "application/json" }
                },
                function (error, response, body) {
                        callback(error, response, body);
                });
        }
};

/* -------------------------------------------------------- */
/* STATISTICS */
exports.statistics = function(req, res, callback){
        if (req.server.url && req.server.password) {
	        request(
	        {
	                dataType: 'json',
	                method: 'GET',
	                url: req.server.url+"/servers/localhost/statistics",
                        headers: { "Authorization" : "Basic " + new Buffer("a:" + req.server.password).toString("base64") }
	        },
                function (error, response, body) {
			callback(error, response, body);
		});
	}
};
