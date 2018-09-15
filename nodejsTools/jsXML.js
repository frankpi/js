var fs = require('fs');
// var xml2js = require('xml2js');
var xlsx = require('xlsx');

// var parser = new xml2js.Parser();
// var filePath = "./strings.xml";


// fs.readFile(filePath, function(err, data) {
//     parser.parseString(data, function (err, result) {
//         var strings = result.resources.string
//         for(var i=0;i< strings.length;i++ ){
//             console.log(strings[i].$.name)
//             console.log(strings[i]._)
//         }
//     });
// });
(function print(){
	for (var i = 100; i < 200; i++) {
		console.log('<item name="" id="'+i+'" />');
	}
})();