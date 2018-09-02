## javascript

### 目录

- [现有一个Printf类,其原型对象上有许多以post开头的方法(如postMsg);另有一拦截函数chekc,只返回ture或false.请设计一个函数,该函数应批量改造原Page的postXXX方法,在保留其原有功能的同时,为每个postXXX方法增加拦截验证功能,当chekc返回true时继续执行原postXXX方法,返回false时不再执行原postXXX方法](#现有一个printf类其原型对象上有许多以post开头的方法如postmsg另有一拦截函数chekc只返回ture或false请设计一个函数该函数应批量改造原page的postxxx方法在保留其原有功能的同时为每个postxxx方法增加拦截验证功能当chekc返回true时继续执行原postxxx方法返回false时不再执行原postxxx方法)
- [完成一个函数,接受数组作为参数,数组元素为整数或者数组,数组元素包含整数或数组,函数返回扁平化后的数组](#完成一个函数接受数组作为参数数组元素为整数或者数组数组元素包含整数或数组函数返回扁平化后的数组)
- [编写一个函数实现form的序列化(即将一个表单中的键值序列化为可提交的对象)](#编写一个函数实现form的序列化(即将一个表单中的键值序列化为可提交的对象))

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

### 完成一个函数,接受数组作为参数,数组元素为整数或者数组,数组元素包含整数或数组,函数返回扁平化后的数组

```javascript
  const list =  [1, [2, [ [3, 4], 5], 6]];
  function flat(list){
    let result = [];
    for(let i = 0 ;i <list.length;i++){
      let temp = list[i]
      if(typeof temp === 'number'){
         result.push(temp)
      }else{
        result = result.concat(flat(temp))
      }
    }
    return result;   
  }
  const result = flat(list);
  console.log(result)
```

### 编写一个函数实现form的序列化(即将一个表单中的键值序列化为可提交的对象)

```javascript
<form id="target">
    <select name="age">
        <option value="aaa">aaa</option>
        <option value="bbb" selected>bbb</option>
    </select>
    <select name="friends" multiple>
        <option value="qiu" selected>qiu</option>
        <option value="de">de</option>
        <option value="qing" selected>qing</option>
    </select>
    <input name="name" value="qiudeqing">
    <input type="password" name="password" value="11111">
    <input type="hidden" name="salery" value="3333">
    <textarea name="description">description</textarea>
    <input type="checkbox" name="hobby" checked value="football">Football
    <input type="checkbox" name="hobby" value="basketball">Basketball
    <input type="radio" name="sex" checked value="Female">Female
    <input type="radio" name="sex" value="Male">Male
</form>
  /**
 * 将一个表单元素序列化为可提交的对象
 *
 * @param {FormElement} form 需要序列化的表单元素
 * @return {Array} 表单序列化后的对象
 */
 function serializeForm(form) {
  if (!form || form.nodeName.toUpperCase() !== 'FORM') {
    return false;
  }
  let result = {};
  for(let i = 0 ; i < form.length ; i++){
    let field = form.elements[i];
    let fieldName = field.name;
    let fieldType = field.type;
    switch(fieldType){
      case 'text':
      case 'password':
      case 'hidden':
      case 'textarea':
        result[fieldName] = field.value;
        break;
      case 'radio':
      case 'checkbox':
        if (field.checked) {
          result[fieldName] = field.value;
        }
        break;
      case 'select-one':
      case 'select-multiple':
        for (var j = 0, jLen = field.options.length; j < jLen; ++j) {
          if (field.options[j].selected) {
            result[fieldName] = field.options[j].value || field.options[j].text;
          }
        }
        break;
      case 'file':
      case 'submit':
        break; // 是否处理？
      default:
        break;
    }
  }
  return result
  
}
```

