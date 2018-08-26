var chess = document.getElementById('chess');
var context = chess.getContext('2d');
//所有获胜的种类
var wins = [];
//赢法的统计数组；
var myWin = [];
var computerWin = [];
var over;
var chessBoard = []
for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
        wins[i][j] = [];
        // for (var k = 0; k < 5; k++) {
        // 	wins[i][j][k] = false;
        // }
    }
}
var count = 0;
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}
for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}
console.log(count);
context.strokeStyle = "#BFBFBF";
var logo = new Image();
var me = true;
logo.onload = function() {
    // body...
    drawChessBackground();
    // onceStep(0, 1, true);
    // onceStep(1, 1, false);
}
var drawChessBackground = function() {
    for (var i = 0; i < 15; i++) {
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
        context.moveTo(15, i * 30 + 15);
        context.lineTo(435, i * 30 + 15);
        context.stroke();
    }
}
var onceStep = function(i, j, me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i * 30, 15 + j * 30 - 2, 13, 15 + i * 30, 15 + j * 30 - 2, 0);
    if (me) {
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    } else {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();
}
var computerAI = function() {
    var mySocre = [];
    var computerScore = [];
    var max = 0;
    var u = 0;
    var v = 0;
    for (var i = 0; i < 15; i++) {
        mySocre[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < 15; j++) {
            mySocre[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (myWin[k] == 1) {
                            mySocre[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            mySocre[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            mySocre[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            mySocre[i][j] += 10000;
                        }
                        if (computerWin[k] == 1) {
                            computerScore[i][j] += 220;
                        } else if (computerWin[k] == 2) {
                            computerScore[i][j] += 420;
                        } else if (computerWin[k] == 3) {
                            computerScore[i][j] += 2200;
                        } else if (computerWin[k] == 4) {
                            computerScore[i][j] += 12000;
                        }
                    }
                }
                if (mySocre[i][j] > max) {
                    max = mySocre[i][j];
                    u = i;
                    v = j;
                } else if (mySocre[i][j] == max) {
                    if (computerScore[i][j] > computerScore[u]) {
                        u = i;
                        v = j;
                    }
                }
                if (computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                } else if (computerScore[i][j] == max) {
                    if (mySocre[i][j] > mySocre[u]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    onceStep(u, v, false);
    chessBoard[u][v] = 2;
    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            computerWin[k]++;
            myWin[k] = 6;
            if (computerWin[k] == 5) {
                window.alert("机器赢了！");
                over = true;
            }
        }
    }
    // if (!over) {
    //     me = !me;
    // }
}
chess.onclick = function(e) {
    if (over) {
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if (chessBoard[i][j] == 0) {
        onceStep(i, j, true);
        // if (me) {
        chessBoard[i][j] = 1;
        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                myWin[k]++;
                computerWin[k] = 6;
                if (myWin[k] == 5) {
                    window.alert("你赢了！");
                    over = true;
                }
            }
        }
        // } else {
        // chessBoard[i][j] = 2;
        // }
        if (!over) {
            // me = !me;
            computerAI();
        }
    }
}
logo.onload();