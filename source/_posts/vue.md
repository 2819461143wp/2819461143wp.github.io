---
title: vue
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
