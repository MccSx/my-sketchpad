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
let changePenSize = document.querySelector('.changePenSize')
let changeEraserSize = document.querySelector('.changeEraserSize')
let smallPen = document.querySelector('.changePenSize>.small')
let normalPen = document.querySelector('.changePenSize>.normal')
let largePen = document.querySelector('.changePenSize>.large')
let smallEraser = document.querySelector('.changeEraserSize>.small')
let normalEraser = document.querySelector('.changeEraserSize>.normal')
let largeEraser = document.querySelector('.changeEraserSize>.large')
blackPen.onclick = function (e) {
  changeClassName(blackPen, 'active')
  lineColor = 'black'
  isEraser = false
  changePenSize.classList.add('active')
  changeEraserSize.classList.remove('active')
}
bluePen.onclick = function (e) {
  changeClassName(bluePen, 'active')
  lineColor = 'blue'
  isEraser = false
  changePenSize.classList.add('active')
  changeEraserSize.classList.remove('active')
}
redPen.onclick = function (e) {
  changeClassName(redPen, 'active')
  lineColor = 'red'
  isEraser = false
  changePenSize.classList.add('active')
  changeEraserSize.classList.remove('active')
}
greenPen.onclick = function (e) {
  changeClassName(greenPen, 'active')
  lineColor = 'green'
  isEraser = false
  changePenSize.classList.add('active')
  changeEraserSize.classList.remove('active')
}
eraser.onclick = function (e) {
  changeClassName(eraser, 'active')
  isEraser = true
  changePenSize.classList.remove('active')
  changeEraserSize.classList.add('active')
}
smallPen.onclick = function (e) {
  changeClassName(smallPen, 'active')
  lineWidth = 2
}
normalPen.onclick = function (e) {
  changeClassName(normalPen, 'active')
  lineWidth = 4
}
largePen.onclick = function (e) {
  changeClassName(largePen, 'active')
  lineWidth = 6
}
smallEraser.onclick = function (e) {
  changeClassName(smallEraser, 'active')
  eraserSize = 6
}
normalEraser.onclick = function (e) {
  changeClassName(normalEraser, 'active')
  eraserSize = 12
}
largeEraser.onclick = function (e) {
  changeClassName(largeEraser, 'active')
  eraserSize = 18
}