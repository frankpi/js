// npm install xlsx -save


    var xl = require('xlsx');
    //workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
    var workbook = xl.readFile("/Users/ljp/nodejs/海外mod2.xlsx")
    // 获取 Excel 中所有表名
    const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
    // 根据表名获取对应某张表
    const ws = workbook.Sheets[sheetNames[2]];
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
        console.log(i);
        i++;
        console.log(row);
        // console.log(row['github账号']);
        if (row['github账号'] != undefined) {
            author = row['github账号']
        }
        if (author.indexOf('-')) {
            author = author.substring(0,author.indexOf('-'));

        }
        // if (row['游戏'] == "Pokemon Quest") {
        //     // continue;
        // }
        var vc = row['Modzvc'] ? row['Modzvc'] : 1;
        var changelog0 = {
            versionCode: vc,
            versionName: "1.0." + vc,
            whatsNew: "support game version (*)"
        };
        var jsObj = {
            modz: "https://github.com/" + author + "/modz/raw/master/" + row['mod包名'] + "/" + row['mod包名'] + ".modz",
            readme: "https://github.com/" + author + "/modz/raw/master/" + row['mod包名'] + "/README.md",
            desc: row['mod介绍'],
            name: row['mod名字'],
            pkgName: row['mod包名'],
            versionCode: vc,
            versionName: "1.0." + vc,
            target: row['游戏包名'],
            support: "*",
            gameName: row['游戏'],
            iconUrl: "",
            changelog: [changelog0],
            screenshotUrl: ["https://github.com/" + author + "/modz/raw/master/" + row['mod包名'] + "/screenshot/modz.jpg"],
            videoUrl: [""],
            gameDownloadUrl: ["http://play.google.com/store/apps/details?id=" + row['游戏包名']]
        };
        jsArray.push(jsObj);
    }
    var jsonStr2 = JSON.stringify(jsArray, null, 2);
    console.log(jsonStr2);
