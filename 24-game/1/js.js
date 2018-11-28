const questionEle = document.getElementsByClassName('question');
//游戏初始化
function init(){
  const num = 20;
  let question = [1];
  while(question.length !=9){
    let temp = question[question.length-1];
    question.push(++temp)
  }
  for(let i = 0 ; i < num ; i++){
    let a = GetRandomNum(0,8);
    let b = GetRandomNum(0,8);
    let temp = question[a];
    question[a] = question[b];
    question[b] = temp;
  }

  questionShow(questionEle,question.slice(0,4))
}
// 获取某个范围的随机数
function GetRandomNum(Min, Max) {
  let Range = Max - Min;
  let Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}
function questionShow(ele,arr){
  let eleEle = ele[0].querySelectorAll('.number')
  if(arr.length != 4&&eleEle.length !=4){
    return false
  }
  arr.forEach(function(value,index){
    console.log(index)
    eleEle[index].innerHTML = value;
  })
}
