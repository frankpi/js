var Excel = require('exceljs');
var start_time = new Date();
var workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: './streamed-workbook.xlsx'
});
var worksheet = workbook.addWorksheet('Sheet');
worksheet.columns = [{
    header: 'id',
    key: 'id'
}, {
    header: 'name',
    key: 'name'
}, {
    header: 'desc',
    key: 'desc'
}, {
    header: 'LevelUpDesc',
    key: 'LevelUpDesc'
}];
var data = [{
    id: 100,
    name: 'abc',
    desc: '123456789'
}];
var readline = require('readline');
var fs = require('fs');
var rl = readline.createInterface({
    input: fs.createReadStream("yyzy.json"),
    output: process.stdout,
    terminal: false
});
var tmp = {};
rl.on('line', function(line) {
    // if (line.search("id") != -1) {
    // 	tmp.id = line.substring(3,line.length).trim();
    // } else if (line.search("name") != -1) {
    // 	tmp.name= line.substring(5,line.length).trim();
    // } else if (line.search("desc") != -1) {
    // 	tmp.desc = line.substring(5,line.length).trim();
    // } else if (line.search("LevelUpDesc") != -1) {
    // 	tmp.LevelUpDesc = line.substring(12,line.length).trim();
    // 	console.log(JSON.stringify(tmp)+',');
    // 	tmp = {}; 
    // }
    if (line.search(":") != -1) {
    	var a = line.split(":");
    	line = "\""+a[0].trim()+"\":"+a[1].trim();
    }
    console.log(line);
    // console.log(JSON.stringify(tmp)+''+line);
    // you won't see the last line here, as 
    // there is no \n any more
});


// var data = fs.readFileSync('./yyzhIDS.json', 'utf8');
// console.log(data);

// var length = data.length;
// // 当前进度
// var current_num = 0;
// var time_monit = 400;
// var temp_time = Date.now();
// console.log('开始添加数据');
// // 开始添加数据
// for(let i in data) {
//   worksheet.addRow(data[i]).commit();
//   current_num = i;
//   if(Date.now() - temp_time > time_monit) {
//     temp_time = Date.now();
//     console.log((current_num / length * 100).toFixed(2) + '%');
//   }
// }
// console.log('添加数据完毕：', (Date.now() - start_time));
// workbook.commit();
// var end_time = new Date();
// var duration = end_time - start_time;
// console.log('用时：' + duration);
// console.log("程序执行完毕");