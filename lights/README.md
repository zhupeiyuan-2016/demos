## 效果描述：
**三个状态用红（stop），绿（pass），黄（wait）表示要**
**求用JavaScript让三个状态轮流切换**
**每个状态的停留时间是2s**

------------
**[demo](https://github.com/zhupeiyuan-2016/demos/tree/master/lights)代码**

------------
![put.gif](http://ouvyoji2r.bkt.clouddn.com/2018/03/1023982071.gif)
-----------
## 思考
  JavaScript的动画实现，最原始也最简单的无非就是用setTimeout或setInterval实现。
 我们再思考，在期望于JavaScript代码上尽可能得减少对样式的修改，让他就负责他应该负责的逻辑处理，那么我们在写css颜色的时候也应该思考一下，然后做好给JavaScript使用的API。
### HTML结构和CSS
```javascript
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>三色循环</title>
	<style type="text/css">
		#traffic > li{
			display: block;
		}
		#traffic span{
			display: inline-block;
			width: 50px;
			height: 50px;
			background-color: gray;
			margin: 5px;
			border-radius: 50%;// 画圆
		}
		// 把状态交给父级元素管理
		#traffic.stop li:nth-child(1) span{
			background-color: red;
		}
		#traffic.pass li:nth-child(2) span{
			background-color: green;
		}
		#traffic.wait li:nth-child(3) span{
			background-color: blue;
		}
	</style>
</head>
<body>
<ul class="wait" id="traffic">
	<li><span></span></li>
	<li><span></span></li>
	<li><span></span></li>
</ul>
</body>
</html>
```
## JavaScript
### 版本一
```javascript
var traffic = doucument.getElementById('traffic');
(function resete (){
	traffic.ClassName = 'stop';
	setTimeout(function(){
		traffic.ClassName = 'pass';
		setTimeout(funciont(){
				   traffic.ClassName = 'wait';
				   setTimeout(resete,2000);
			},2000);
	},2000);
})();
```
问题思考：过程耦合，如果顺序改变了呢？stop，pass，wait是耦合的，pass要知道上一个是stop，wait要知道上一个是pass，且再最后出现了回调，差评！如果再增加其他状态呢？那岂不是异常臃肿？
### 版本二
```javascript
var traffic = document.getElementById('traffic');
var statelist = ['stop','pass','wait'];
var flag = 0;
setInterval(function(){
	traffic.ClassName = statelist[flag];
	flag = (flag + 1) % statelist.length;
},2000);

```
问题思考：封装性很差，statelist和flag两个数据暴露在外面
### 版本三
```javascript
var traffic = document.getElementById('traffic');
function start(el,statelist){
	var flag = 0;
	setInterval(funciont(){
		el.ClassName = statelist[flag];
		flag = (flag + 1) % statelist.length;
	},2000)
}
start(traffic,['stop','pass','wait']);

```
问题思考：可复用性很差，只能实现这个效果，如果状态时长要不等呢？于是我们需要过程抽象
### 版本四




