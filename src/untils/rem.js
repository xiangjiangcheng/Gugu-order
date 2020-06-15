/**
 * @Author: fanguocai
 * @Date: 2020年6月15日
 * @Desc: rem适配 1rem = 100px
 */
function setRem () {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth

  let htmlDom = document.getElementsByTagName('html')[0]

  htmlDom.style.fontSize = htmlWidth / 750 * 100 + 'px'
}

setRem()

window.onresize = function () {
  setRem()
}
