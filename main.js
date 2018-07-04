let sketchpad = document.getElementById('sketchpad')
let ctx = sketchpad.getContext('2d')
let lineWidth = 2
let lineColor = 'black'
let isEraser = false
let eraserColor = '#fafafa'
let eraserSize = 6

//功能函数
function autoSetSize(canvas) {
  function resize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
  resize()
  
  window.onresize = function () {
    resize()
  }
}

function drawLine(x1, y1, x2, y2, color, size) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineWidth = size * 2
  ctx.strokeStyle = color
  ctx.lineTo(x2, y2)
  ctx.closePath()
  ctx.stroke()
}

function drawCircle(x, y, radius, color) {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(x, y, radius, 0, Math.PI*2)
  ctx.fill()
}

function drawing(canvas) {
  let using = false
  let lastPoint = {oldX: undefined, oldY: undefined}
  if ('ontouchstart' in document) {
    canvas.ontouchstart = function (e) {
      let x1 = e.touches[0].clientX
      let y1 = e.touches[0].clientY
      if (isEraser) {
        drawCircle(x1, y1, eraserSize, eraserColor)
      } else {
        drawCircle(x1, y1, lineWidth, lineColor)
      }
      lastPoint.oldX = x1
      lastPoint.oldY = y1
    }
    canvas.ontouchmove = function (e) {
      let x2 = e.touches[0].clientX
      let y2 = e.touches[0].clientY
      if (isEraser) {
        drawLine(lastPoint.oldX, lastPoint.oldY, x2, y2, eraserColor, eraserSize)
        drawCircle(x2, y2, eraserSize, eraserColor)
      } else {
        drawLine(lastPoint.oldX, lastPoint.oldY, x2, y2, lineColor, lineWidth)
        drawCircle(x2, y2, lineWidth, lineColor)
      }
      lastPoint.oldX = x2
      lastPoint.oldY = y2
    }
  } else {
    canvas.onmousedown = function (e) {
      using = true
      let x1 = e.clientX
      let y1 = e.clientY
      if (isEraser) {
        drawCircle(x1, y1, eraserSize, eraserColor)
      } else {
        drawCircle(x1, y1, lineWidth, lineColor)
      }
      lastPoint.oldX = x1
      lastPoint.oldY = y1
    }
    canvas.onmousemove = function (e) {
      if (!using) {
        return
      }
      let x2 = e.clientX
      let y2 = e.clientY
      if (isEraser) {
        drawLine(lastPoint.oldX, lastPoint.oldY, x2, y2, eraserColor, eraserSize)
        drawCircle(x2, y2, eraserSize, eraserColor)
      } else {
        drawLine(lastPoint.oldX, lastPoint.oldY, x2, y2, lineColor, lineWidth)
        drawCircle(x2, y2, lineWidth, lineColor)
      }
      lastPoint.oldX = x2
      lastPoint.oldY = y2
    }
    canvas.onmouseup = function (e) {
      using = false
    }
  }
}

function changeClassName(el, className) {
  let childs = el.parentNode.children
  for (let i=0; i<childs.length; i++) {
    if (childs[i] === el) {
      childs[i].classList.add(className)
    } else {
      childs[i].classList.remove(className)
    }
  }
}


autoSetSize(sketchpad)
drawing(sketchpad)

let blackPen = document.querySelector('.blackPen')
let bluePen = document.querySelector('.bluePen')
let redPen = document.querySelector('.redPen')
let greenPen = document.querySelector('.greenPen')
let eraser = document.querySelector('.eraser')
blackPen.onclick = function (e) {
  changeClassName(blackPen, 'active')
  lineColor = 'black'
  isEraser = false
}
bluePen.onclick = function (e) {
  changeClassName(bluePen, 'active')
  lineColor = 'blue'
  isEraser = false
}
redPen.onclick = function (e) {
  changeClassName(redPen, 'active')
  lineColor = 'red'
  isEraser = false
}
greenPen.onclick = function (e) {
  changeClassName(greenPen, 'active')
  lineColor = 'green'
  isEraser = false
}
eraser.onclick = function (e) {
  changeClassName(eraser, 'active')
  isEraser = true
}