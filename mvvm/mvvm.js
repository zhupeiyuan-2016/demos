

function Mvvm(options = {}) {
    //把所有属性挂在在options
    this.$options = options;
    let data = this._data = this.$options.data;
    //数据劫持
    observe(data);
    for (let key in data) {
        Object.defineProperty(this, key,{
            configurable: true,
            get() {
                return this._data[key];
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        });
    };
    new Compile(options.el, this);
}

function Observe(data) {
    //给对象都增加上get，set
    for (const key in data) {
        let dep = new Dep();
        let val = data[key];
        observe(val);//递归，实现深度的数据劫持;
        Object.defineProperty(data, key, {
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target); // 将watcher添加到订阅事件中 [watcher]
                return val;
            },
            set() {
                if (val == newVal) {
                    return;
                }
                val = newVal;
                observe(newVal);
                dep.notify();
            }
        })
    }
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    return new Observe(data);
};
function Compile(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    };
    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            let reg = /\{\{(.*?)\}\}/g; // 正则匹配{{}}
            if (node.nodeType === 3 && reg.test(txt)) {
                function replaceTxt(){
                    node.textContent = txt.replace(reg,(metched,placeholder) => {
                        console.log(placeholder);
                        new Watcher(vm, placeholder,replaceTxt);
                        return placeholder.split('.').reduce((val, key) => {
                            return val[key];
                        },vm)
                    })
                }
                replaceTxt();
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach(key => {
                    val = val[key];
                });
                node.textContent = txt.replace(reg, val).trim();
                new Watcher(vm, RegExp.$1, newVal => {
                    node.textContent = txt.replace(reg, newVal).trim();
                });
                if (node.childNodes && node.childNodes.length) {
                    replace(node);
                };
                replace(fragment);
                vm.$el.appendChild(fragment);
            }
        })
    }
    replace(fragment);
    vm.$el.appendChild(fragment);
}

// 发布订阅模式 订阅和发布 如[fn1, fn2, fn3]

function Dep() {
    // 一个数组(存放函数的事件池)
    this.subs = [];
  };
  Dep.prototype = {
    addSub(sub) {
      this.subs.push(sub);
    },
    notify() {
      // 绑定的方法，都有一个update方法
      this.subs.forEach(sub => sub.update());
    }
  };
  function Watcher(vm, exp, fn) {
    this.fn = fn;
    this.vm = vm;
    this.exp = exp;
    // 添加一个事件
    // 这里我们先定义一个属性
    Dep.target = this;
    let arr = exp.split('.');
    let val = vm;
    arr.forEach(key => { // 取值
        val = val[key]; // 获取到this.a.b，默认就会调用get方法
    });
    Dep.target = null;
}
  // 监听函数
  // 通过Watcher这个类创建的实例，都拥有update方法
Watcher.prototype.update = function() {
    this.fn();
  };
Watcher.prototype.update = function(){
    var arr = this.exp.split('.');
    let val = this.vm;
    arr.forEach(key => {
        val = val[key];
    });
    this.fn(val)
}

// let mvvm = new Mvvm({
//     el: '#app',
//     data: {
//         a: {
//             b: '朱培源'
//         },
//         c: 2
//     }
// });

