// npm install xlsx -save
var xl = require('xlsx');
//workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
var workbook = xl.readFile("/Users/ljp/nodejs/传送门骑士ID20180810.xls")
// 获取 Excel 中所有表名
const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
// 根据表名获取对应某张表
const ws = workbook.Sheets[sheetNames[0]];
//返回json数据
var dataa = xl.utils.sheet_to_json(ws);
// console.log(dataa);
var author;
var jsArray = new Array();
var index = 0;
var i = 0;
var row = dataa[0];
// console.log(row['游戏']);
while (row) {
    row = dataa[index + i];
    if (!row) {
        break;
    }
    // console.log(i);
    i++;
    // console.log(row);
    if (row['防具'] != undefined && i>900) {
        console.log('<item id="' + row['100'] + '" name="' + row['高级生命吸食者护腿'] + '" type="' + row['防具'] + '"/>');
    }
}