var sketchpad = document.getElementById('sketchpad')

function autoSetCanvasSize(canvas) {
  function setSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
  
  setSize()

  window.onresize = function () {
    setSize()
  }
}
autoSetCanvasSize(sketchpad)