
var xl =require('xlsx');
//workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
var workbook =  xl.readFile("/Users/ljp/Downloads/海外mod.xlsx")
// 获取 Excel 中所有表名
const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
// 根据表名获取对应某张表
const ws = workbook.Sheets[sheetNames[0]];

//返回json数据
var dataa =xl.utils.sheet_to_json(ws);

// console.log(dataa);

var jsArray = new Array();
var index = 15;
for (var i = 0; i < 5; i++) {
	var row = dataa[index+i];
	console.log(row);
	author = "Christinalily"
	var changelog0 = {
		versionCode : 1,
		versionName : "1.0.1",
		whatsNew : "support game version (*)"
	};
	var jsObj = {
		modz : "https://github.com/"+author+"/modz/raw/master/"+row['mod包名']+"/"+row['mod包名']+".modz",
		readme : "https://github.com/"+author+"/modz/raw/master/"+row['mod包名']+"/README.md",
		desc : row['mod介绍'],
		name: row['mod名字'],
		pkgName : row[11],
		versionCode : 1,
		versionName : "1.0.1",
		target : row['游戏包名'],
		support : "*",
		gameName : row['游戏'],
		iconUrl : "",
		changelog : [changelog0],
		screenshotUrl : ["https://github.com/"+author+"/modz/raw/master/"+row['mod包名']+"/screenshot/modz.jpg"],
		videoUrl : [""],
		gameDownloadUrl : ["http://play.google.com/store/apps/details?id"+row['游戏包名']]
	};
	jsArray[i] = jsObj;
}

var jsonStr2 = JSON.stringify(jsArray);
console.log(jsonStr2);