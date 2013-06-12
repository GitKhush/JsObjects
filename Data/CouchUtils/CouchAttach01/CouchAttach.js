var couch = require('./Library/CouchCode')
var fs = require('fs');



function run() {
	var docName = process.argv[2];
	var fileName = process.argv[3];
	
   /* var dbName = fs.readFileSync("config.json", function(error) {
        if (error) {
            alert("Error");
        }
    }); */
   var dbName = "couchdocs01";
    
	fs.exists(fileName, function(exists) {
		if (exists) {
			var data = fs.readFileSync(fileName);
			
			couch.couchCode.createDatabase(dbName, function(error) {
				if (!error) {
					couch.couchCode.couchAttach(null, docName, data, dbName);
				} else {
				  couch.couchCode.reportError(error);			    
				}
			});
		} else {
			console.log('could not find: ' + fileName);
		}
	})
};

function explain() {
	console.log('\n\nPlease pass in the docName you want to use in');
	console.log('couchDb and the name of the document you want');
	console.log('send to couchDb\n');
	console.log('Example: ');
	console.log('  node CouchAttach.js index index.html');
};

if (process.argv.length === 4) {
	run();
} else {
	explain();
}