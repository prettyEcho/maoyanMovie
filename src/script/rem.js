(function (doc, win) {
  let resizeRem = () => {
    let html = doc.documentElement
    let htmlW = html.getBoundingClientRect().width
    html.style.fontSize = htmlW / 15 + 'px'
  }
  win.addEventListener('resize', resizeRem, false) // 当窗口调整大小时确定rem值
  doc.addEventListener('DOMContentLoaded', resizeRem, false) // 当DOM树构建完成时时确定rem值
})(document, window)
