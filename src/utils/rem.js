/**
 * @Author: fanguocai
 * @Date: 2019年11月12日19:47:58
 * @Desc: rem适配 1rem = 100px
 */
function setRem () {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth

  let htmlDom = document.getElementsByTagName('html')[0]

  htmlDom.style.fontSize = htmlWidth / 375 * 100 + 'px'
}

setRem()

window.onresize = function () {
  setRem()
}
