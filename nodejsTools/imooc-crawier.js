var http = require('http')
var url  = 'http://www.imooc.com/learn/348'
var c = require('cheerio')

function filterChapters(html){

}

http.get(url,function (res) {
	// body...
	var html = ''
	res.on('data',function(data){
		html += data
	})

	res.on('end',function(){
		// console.log(html)
		filterChapters(html)
	})
})