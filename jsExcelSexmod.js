// npm install xlsx -save
var xl = require('xlsx');
//workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
var workbook = xl.readFile("/Users/ljp/Downloads/sexmod.xlsx")
// 获取 Excel 中所有表名
const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
// 根据表名获取对应某张表
const ws = workbook.Sheets[sheetNames[0]];
//返回json数据
var dataa = xl.utils.sheet_to_json(ws);
// console.log(dataa);
var jsArray0 = new Array();
var jsArray1 = new Array();
var jsArray2 = new Array();
var jsArray3 = new Array();
var jsArray4 = new Array();
var index = 0;
var i = 0;
var row = dataa[0];
// console.log(row['游戏']);
var dat;
while (row) {
    row = dataa[index + i];
    if (!row) {
        break;
    }
    i++;
    var language = "English";
    if (row['语言'] == "多国语言") {
        language = "Multilingual";
    } else if (row['语言'] == "繁体中文") {
        language = "Traditional Chinese"
    }
    var jsObj = {
        name:row["网站名"],
        url:row['网址'],
        language:language  
    }
    if (row['类型'] == "图片") {
        jsArray0.push(jsObj);
    } else if (row['类型'] == "视频") {
        jsArray1.push(jsObj);
    } else if (row['类型'] == "小说") {
        jsArray2.push(jsObj);
    } else if (row['类型'] == "下载站") {
        jsArray3.push(jsObj);
    } else {
        jsArray4.push(jsObj);
    }
}
dat = {
    "Picture": jsArray0.sort(sortNumber),
    "Video": jsArray1.sort(sortNumber),
    "Novel": jsArray2.sort(sortNumber),
    "Download station": jsArray3.sort(sortNumber),
    "Forum": jsArray4.sort(sortNumber)
}
var jsonStr2 = JSON.stringify(dat, null, 2);
console.log(jsonStr2);

function sortNumber(a,b){
    // console.log(a['name'][0]);
    // return a['name'][0] > b['name'][0];
     return a['name'][0].localeCompare(b['name'][0]);
}
