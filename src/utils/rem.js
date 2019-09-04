(function (doc, win, undefine) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (clientWidth === undefined) return
    if (clientWidth >= 750) {
      clientWidth = 750
    }
    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
  }
  if (doc.addEventListener === undefined) {
    return
  }
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
