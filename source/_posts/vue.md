---
title: vue
date: 2024-08-17
categories:
  - note
  - language
  - vue
tags: [language]
banner_img: /images/壁纸.jpg
---

## 基础内容

### 文本插值

```vue
<script>
// 这是 JavaScript 部分的注释
export default {
  data() {
    return {
      msg: 'Hello Vue!',
      hello: 'Hello World!',
      number: 100,
      flag: 1,
      rawhtml: '<span style="color:red">我是红色的</span>'
    }
  }
}
</script>

<template>
  <h3>文本插值</h3>
  <p>{{ msg }}</p>
  <p>{{ hello.split('').reverse().join('') }}</p>
  <p>{{ number+1 }}</p>
  <p>{{ flag ?'YES':'NO' }}</p>
  <p>{{ rawhtml }}</p>
  <p v-html="rawhtml"></p>
  <!--无效语句 -->
  <!-- <p>{{ var a = 1 }}</p> -->
  <!-- {{ if(ok){return 1} }} -->
</template>
```

### 属性绑定

```vue
<script>
// 这是 JavaScript 部分的注释
export default {
  data() {
    return {
      msg: "active",
      vid: "appID",
      isbuttondisabled: true,
      objectofattros: {
        dynamicclass: "appclass",
        dynamicid: "appID"
      }
    }
  }
}
</script>

<template>
  <h3>属性绑定</h3>
  <p v-bind:id="vid" v-bind:class="msg">绑定属性</p>
  <p :id="vid" :class="msg">绑定属性</p>
  <button :disabled="isbuttondisabled">button</button>
  <p v-bind="objectofattros">绑定对象</p>
  <!--无效语句 -->
  <!-- <p>{{ var a = 1 }}</p> -->
  <!-- {{ if(ok){return 1} }} -->
</template>

<style>
.active {
  color: red;
}
</style>
```

### 条件渲染

```vue
<script>
export default {
    data() {
        return {
            flag: true,
            type: 'B'
        }
    }
}
</script>

<template>
<h3>条件渲染</h3>
<div v-if="flag">你抓不住我</div>
<div v-else>我是山里灵活的狗</div>
<div v-show="flag">我是山里灵活的狗</div>
<!-- 频繁切换用show，少量切换有多种情况用if -->
<div v-if="type === 'A'">我是A</div>
<div v-else-if="type === 'B'">我是B</div>
<div v-else-if="type === 'C'">我是C</div>
<div v-else>我是D</div>
</template>
```

### 列表渲染

```vue
<script>
export default {
    data() {
        return {
            names: ['张三', '李四', '王五'],
            user: {
                name: '张三',
                age: 18
            },
            person: [{
                id:1,
                name: '张三',
                age: 70
            },
                {
                id:2,
                name: '李四',
                age: 80
            },
                {
                id:3,
                name: '王五',
                age: 9
            }]
        }
    }
}
</script>

<template>
<h3>列表渲染+通过key管理状态</h3>
<!-- 其中in可以用of代替 -->
<!-- <p v-for="a in names">{{ a }}</p> -->
<p v-for="(x,i) in names">{{ x }}:{{ i }}</p>
<p v-for="(x,i) in names" :key="i">{{ x }}</p>
<!-- 此处key使用了v-bind来绑定 -->
<p v-for="(value,k,index) in user">{{ value }}-{{ k }}-{{ index }}</p>
<div v-for="item of person" :key="item.id">
    <p>{{ item.name }}-{{ item.age }}</p>
</div>
</template>
```

### 事件处理

```vue
<template>
    <h3>内联事件处理器</h3>
    <button v-on:click="count1++">add</button>
    <!-- v-on:click="count++" 等价于 @click="count++" -->
    <p>{{ count1 }}</p>

    <h3>方法事件处理器</h3>
    <button @click="add">add</button>
    <p>{{ count2 }}</p>
</template>

<script>


export default {
    data() {
        return {
            count1: 0,
            count2: 0
        }
    },
    methods: {
        add() {
            console.log('add')
            // 这个是控制台输出的
            this.count2++
        }
    }
}
</script>
```

### 事件传参

```vue
<template>
    <h3>事件传参</h3>
    <button @click="addcount">add</button>
    <p>count1 is :{{ count1 }}</p>
    <button @click="add('hello')">add</button>
    <p>count2 is :{{ count2 }}</p>
    <p @click="getname(name,$event)" v-for="(name,i) of names" :key="index">{{ name }}</p>
</template>

<script>


export default {
    data() {
        return {
            count1: 0,
            count2: 0,
            names:['张三','李四','王五']
        }
    },
    methods: {
        addcount(e) {
            //js中的事件对象event
            this.count1++;
            e.target.innerHTML = 'add' + this.count1;
            console.log(e.target);
        },
        add(msg) {
            console.log(msg);
            this.count2++;
        },
        getname(name,e){
            console.log(name);
            console.log(e);
        }
    }
}
</script>
```

### 事件修饰

```vue
<template>
    <h3>事件修饰符</h3>
    <a @click="clickblog" href="https://2819461143wp.github.io/">blog</a>
    <div @click="clickdiv">
        <p @click.stop="clickp">测试冒泡</p>
        <!-- 只会执行p的事件 -->
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        clickblog(e) {
            e.preventDefault();
            //阻止默认事件
            console.log('click blog');
        },
        clickdiv() {
            console.log('click div');
        },
        clickp(e) {
            //e.stopPropagation();
            console.log('click p');
        }
    }
}
</script>
```

## setup

&nbsp;&nbsp;&nbsp;&nbsp;`<script setup></script>`等效于`setup(){}`,且在setup中不能使用this，在渲染过程中，setup先于vue2的`data(){}`、`method(){}`等，因此在这个内部可以调用setup的内容，反之不行。

使用原则：

- 需要一个基本类型的响应式数据，必须用ref、
- 需要一个响应式对象，层级不深，使用ref，reactive都可
- 需要一个响应式对象，层级较深（如表单），推荐使用reactive

### ref创建

- 基本类型的响应式数据

  ```vue
  <template>
      <div class="person">
          <h1>姓名：{{ name }}</h1>  <!-- 自动帮你.value了 -->
          <h1>年龄：{{ age }}</h1>
          <button @click="changename">修改名字</button>
          <button @click="changeage">修改年龄</button>
          <button @click="showTel">查看联系方式</button>
      </div>
  </template>
  
  <script>//配置组件名字,大多情况下组件名字于文件名相等
  export default {
      name: 'person1',
  }
  </script>
  
  <script setup>//等效于setup(){}
  import {ref} from 'vue'
  let a = 666
  let name = ref('John Doe')
  let age = ref(30)
  let templete = '123456'
  function changeage() {
      age.value++//ref中需要.vaula来使用属性
  }
  function changename() {
      name.value = 'zhangsan'
  }
  function showTel() {
      alert(templete)
  }
  </script>
  
  <style>
  .person{
      background-color: skyblue;
      box-shadow: 0 0 10px;
      border-radius: 10px;
      padding:20px;
  }
  button{
      margin: 0 10px;
  }
  </style>
  ```

- 基本类型的响应式数据

  ```vue
  <template>
      <div>
          <h2>一辆{{ car.band }}车，价值{{ car.price }}</h2>
          <button @click="changeprice">修改汽车价格</button>
          <br>
          <h2>游戏列表：</h2>
          <ul>
              <li v-for="g in games" :key="g.id">{{ g.name }}</li>
          </ul>
          <button @click="changegame">修改游戏名字</button>
          <hr>
          <h2>测试：{{ obj.a.b.c }}</h2>
          <button @click="chagec">修改值</button>
      </div>
  </template>
  
  <script setup name="person3">
  import { ref } from 'vue';
  //使用ref，对象在value属性中，先点value再访问属性
  let car =ref({
      band: '奔驰',
      price: 1000
  })
  let games = ref([
      { id: '1', name: '王者荣耀' },
      { id: '2', name: '英雄联盟' },
      { id: '3', name: '绝地求生' }
  ])
  
  let obj = ref({
      a: {
          b: {
              c: 1
          }
      }
  })
  
  function changeprice(){
      car.value.price += 100
  }
  function changegame(){
      games.value[0].name = '王者荣耀2'
  }
  function chagec(){
      obj.value.a.b.c += 1
  }
  </script>
  
  <style>
  </style>
  ```
  
  

###  reactive创建

&nbsp;&nbsp;&nbsp;&nbsp;只能定义对象类型的响应式数据

> 当修改整个对象时可以理解为重新分配一个新对象，会使其响应式失效
>
> 也不可在修改整个对象外包一个reactive，因为setup是第一个执行的，运行期vue实例以及拿到了car的引用，再修改car，改的是setup中定义car引用而不是vue组件实例中的car引用。

```vue
<template>
    <div>
        <h2>一辆{{ car.band }}车，价值{{ car.price }}</h2>
        <button @click="changeprice">修改汽车价格</button>
        <br>
        <h2>游戏列表：</h2>
        <ul>
            <li v-for="g in games" :key="g.id">{{ g.name }}</li>
        </ul>
        <button @click="changegame">修改游戏名字</button>
        <hr>
        <h2>测试：{{ obj.a.b.c }}</h2>
        <button @click="chagec">修改值</button>
    </div>
</template>

<script setup name="person2">
import { reactive } from 'vue';

let car =reactive({
    band: '奔驰',
    price: 1000
})
let games = reactive([
    { id: '1', name: '王者荣耀' },
    { id: '2', name: '英雄联盟' },
    { id: '3', name: '绝地求生' }
])

let obj = reactive({
    a: {
        b: {
            c: 1
        }
    }
})
//×
// function changecar(){
//     car= reactive({
//         band: '宝马',
//         price: 2000
//     })
// }
//可以使用深拷贝
//Object.assign(car,{brand:'宝马',price:1})

function changeprice(){
    car.price += 100
}
function changegame(){
    games[0].name = '王者荣耀2'
}
function chagec(){
    obj.a.b.c += 1
}
</script>

<style>
</style>
```

###  toRefs

不新建变量，解构原有的响应式对象，并将之绑定

```vue
<template>
    <div>
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="changename">修改名字</button>
        <button @click="changeage">修改年龄</button>
        <h2>车的品牌：{{ brand }}</h2>
        <h2>车的价格：{{ price }}</h2>
        <button @click="changebrand">修改品牌</button>
        <button @click="changeprice">修改价格</button>
    </div>
</template>

<script setup name="person4">
import { reactive, ref ,toRefs} from 'vue';

let person =reactive({
    name:'zhangsan',
    age:18
})
let car = ref(
    {
        brand:'BMW',
        price:1000000
    }
)
let {name,age}=toRefs(person)//没有新建变量，将属性解构出来形成一个新的对象{name,age}，值还是来自于原来的位置,改分离的原来也会变
let {brand,price}=toRefs(car.value)
function changename(){
    name.value='lisi'
}
function changeage(){
    age.value+=10
}
function changebrand(){
    brand.value='Benz'
}
function changeprice(){
    price.value+=100000
}
</script>

<style>
</style>
```

### computed计算属性

```vue
<template>
    <!-- template中不用.value -->
    <div>
        <!-- v-model双向绑定,既会从页面流向数据，也会从数据流向页面 -->
        姓：<input type="text" v-model="firstName"><br>
        名：<input type="text" v-model="lastName"><br>
        全名：<span>{{ fullName}}</span><br>
        全名：<span>{{ fullName1()}}</span><br>
        全名：<span>{{ fullName2}}</span><br>
        <button @click="changefullname2"></button>
    </div>
</template>

<script setup>
import { ref ,computed} from 'vue';
let firstName = ref('zhang');
let lastName = ref('san');
//计算属性，只有内部的变量变化时，才会重新运行计算，否则会直接返回上次的计算结果
//这里无法直接修改fullName，它是被确定的
let fullName = computed(() => {
    return firstName.value.slice(0,1).toUpperCase()+firstName.value.slice(1) +'-'+ lastName.value;
});
//方法,每次都会重新计算
function fullName1() {
    console.log('fullName1');
    return firstName.value.slice(0,1).toUpperCase()+firstName.value.slice(1) +'-'+ lastName.value;
}
//可以直接修改fullName2
let fullName2 = computed({
    get(){
        return firstName.value.slice(0,1).toUpperCase()+firstName.value.slice(1) +'-'+ lastName.value;
    },
    set(val){
        const [str1, str2] = val.split('-');
        firstName.value = str1;
        lastName.value = str2;
    }
})

function changefullname2(){
    fullName2.value = 'li-si';
}
</script>

<style>
</style>
```

### watch监视

监视四种数据：ref定义的数据，reactive定义的数据，函数返回一个值（`getter`函数），一个包含上述内容的数组
