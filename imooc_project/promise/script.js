var ball1 = document.querySelector('.ball1')
var ball2 = document.querySelector('.ball2')
var ball3 = document.querySelector('.ball3')

function animate(ball, distance, cb) {
    // body...
    setTimeout(function() {
        var marginLeft = parseInt(ball.style.marginLeft, 10)
        if (marginLeft === distance) {
            cb && cb()
        } else {
            if (marginLeft < distance) {
                marginLeft++
            } else {
                marginLeft--
            }
            ball.style.marginLeft = marginLeft
            animate(ball, distance, cb)
        }
    }, 13)
}
// animate(ball1, 100, function() {
//     animate(ball2, 200, function() {})
// })