let n
初始化()
setInterval(()=>{
  makeLeave(getImage(n))
    .one('transitionend',(e)=>{
      makeEnter($(e.currentTarget))
    })
  makeCurrent(getImage(n+1))
  n += 1
},3000)











function getImage(n){
  return $(`.images > img:nth-child(${x(n)})`)
}
function x(n){
  if(n>6){
    n = n%6
    if(n===0){
      n=6
    }
  }
  return n
}
function 初始化(){
  n = 1
  $(`.images > img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
}
function makeCurrent($node){
  $node.removeClass('enter leave').addClass('current')
}
function makeLeave($node){
  return $node.removeClass('current enter').addClass('leave')
}
function makeEnter($node){
  $node.removeClass('leave current').addClass('enter')
}