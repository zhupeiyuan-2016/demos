## javascript

### 目录

- [现有一个Printf类,其原型对象上有许多以post开头的方法(如postMsg);另有一拦截函数chekc,只返回ture或false.请设计一个函数,该函数应批量改造原Page的postXXX方法,在保留其原有功能的同时,为每个postXXX方法增加拦截验证功能,当chekc返回true时继续执行原postXXX方法,返回false时不再执行原postXXX方法](#现有一个printf类其原型对象上有许多以post开头的方法如postmsg另有一拦截函数chekc只返回ture或false请设计一个函数该函数应批量改造原page的postxxx方法在保留其原有功能的同时为每个postxxx方法增加拦截验证功能当chekc返回true时继续执行原postxxx方法返回false时不再执行原postxxx方法)

### 内容

#### 现有一个Printf类,其原型对象上有许多以post开头的方法(如postMsg);另有一拦截函数chekc,只返回ture或false.请设计一个函数,该函数应批量改造原Printf的postXXX方法,在保留其原有功能的同时,为每个postXXX方法增加拦截验证功能,当check返回true时继续执行原postXXX方法,返回false时不再执行原postXXX方法

```javascript
function Printf(){
    constructor:Printf,
    this.postA = function(msg){
      console.log('A:'+msg)
    }

    this.postB = function(msg){
      console.log('B:'+msg)
    }

    this.postC =function(msg){
      console.log('C:'+msg)
    },

    this.check =function(){
      return Math.random() > 0.5;
    }
  }
  function checkfy(obj) {
  for (var index in obj) {
    if (index.indexOf('post') === 0 && typeof obj[index] === 'function') {
      (function (index) {
        var fn = obj[index];
        obj[index] = function () {
          if (obj.check()) {
            fn.apply(obj, arguments);
          }
        };
      }(index));
    }
  }
}
  const objA = new Printf();
  objA.postA('____AAA');
  objA.postB('____BBB');
  objA.postC('____CCC');
  console.log('---------拦截验证功能------------')
  const objB = new Printf();
  checkfy(objB)
  objB.postA('____AAA');
  objB.postB('____BBB');
  objB.postC('____CCC');
```

### 常见排序算法的时间复杂度,空间复杂度
