var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(multer({
    dest: '/tmp/'
}).array('image'));
app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})
app.post('/file_upload', function(req, res) {
    console.log(req.files[0]); // 上传的文件信息
    var des_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function(err, data) {
        fs.writeFile(des_file, data, function(err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
    res.end(parXlsx(req.files[0].originalname));
})
var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

function parXlsx(filename) {
    // npm install xlsx -save
    var xl = require('xlsx');
    //workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
    var workbook = xl.readFile(filename);
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
        console.log(row);
        i++;
        if (row["github账号"]) {
            author = row['github账号'];
        };
        // if (row['游戏'] == "Pokemon Quest") {
        //     continue;
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
    return jsonStr2;
}