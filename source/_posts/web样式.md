---
title: web样式
date: 2026-06-15 19:56:04
categories:
  - 期末考试
tags:
  - 期末
index_img:
banner_img: /images/壁纸.jpg
---
## 学习通大题

使用 Vue 2 的 v-model 指令实现一个简单的用户注册信息收集表单，具体要求如下：
1. 用户名：使用文本框输入，实时显示用户输入的内容；
2. 性别：使用单选框（Radio）选择，选项为“男”和“女”；
3. 兴趣爱好：使用复选框（Checkbox）多选，选项包括“读书”、“音乐”、“运动”。

```vue
<template>
  <div>
    <h2>用户注册</h2>
    <!-- 用户名 -->
    <div>
      <label>用户名：</label>
      <input type="text" v-model="username" />
      <p>当前输入：{{ username }}</p>
    </div>
    <!-- 性别 -->
    <div>
      <label>性别：</label>
      <label>
        <input type="radio" value="男" v-model="gender" />
        男
      </label>
      <label>
        <input type="radio" value="女" v-model="gender" />
        女
      </label>
      <p>已选择：{{ gender }}</p>
    </div>
    <!-- 兴趣爱好 -->
    <div>
      <label>兴趣爱好：</label>
      <label>
        <input type="checkbox" value="读书" v-model="hobbies" />
        读书
      </label>
      <label>
        <input type="checkbox" value="音乐" v-model="hobbies" />
        音乐
      </label>
      <label>
        <input type="checkbox" value="运动" v-model="hobbies" />
        运动
      </label>
      <p>已选择：{{ hobbies }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      gender: '',
      hobbies: []
    }
  }
}
</script>

  

<style scoped>
div {
  margin: 10px 0;
}
</style>
```


题目：某水利设备管理系统包含两个页面：设备列表页 /device及设备详情页 /detail。

要求：使用 Vue Router 配置两个路由，在设备列表组件中点击按钮进入设备详情页，使用 Vuex 存储当前选择的设备名称，在设备详情组件中显示该设备名称。

Vuex store

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    deviceName: '' // 存储设备名称
  },
  mutations: {
    setDeviceName(state, name) {
      state.deviceName = name // 修改设备名称
    }
  }
})
```

路由配置

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Device from '@/views/Device.vue'
import Detail from '@/views/Detail.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/device', component: Device },
  { path: '/detail', component: Detail }
]
export default new VueRouter({ routes })
```

设备列表组件

```vue
<template>
  <div>
    <button @click="goDetail('水利水泵')">查看设备详情</button>
  </div>
</template>

<script>
export default {
  methods: {
    goDetail(name) {
      // 提交mutation存储设备名
      this.$store.commit('setDeviceName', name)
      // 跳转详情页
      this.$router.push('/detail')
    }
  }
}
</script>
```

设备详情组件

```vue
<template>
  <div>
    <h3>当前设备：{{ $store.state.deviceName }}</h3>
  </div>
</template>
```

## 一、必背知识点汇总

### 1. 基础与常用指令

Vue 2 最基础的写法是先创建 Vue 实例，再通过 `el` 指定挂载位置，通过 `data` 保存页面要使用的数据。Vue 2 具有数据响应式：`data` 中的数据变化后，页面中依赖这些数据的位置会自动更新。

```html
<div id="app">
  <p>{{ message }}</p>
</div>

<script>
var vm = new Vue({
  el: '#app',
  data: {
    message: '好好学习'
  }
})
</script>
```

基础选项和语法：

| 内容      | 作用                    |
| ------- | --------------------- |
| `el`    | 指定 Vue 实例挂载到哪个 DOM 容器 |
| `data`  | 保存页面需要使用的数据           |
| `{{ }}` | 插值表达式，把数据显示到模板中       |
| 数据响应式   | `data` 变化，页面自动更新      |

常见基础指令：

| 指令 | 作用 | 例子 |
| --- | --- | --- |
| `v-if` | 条件渲染，控制 DOM 是否创建 | `<p v-if="show">内容</p>` |
| `v-show` | 条件显示，通过 `display: none` 切换 | `<p v-show="show">内容</p>` |
| `v-for` | 列表循环渲染 | `<li v-for="item in list">` |
| `v-bind` / `:` | 动态绑定属性 | `<img :src="url">` |
| `v-on` / `@` | 事件绑定 | `<button @click="add">添加</button>` |
| `v-model` | 表单双向数据绑定 | `<input v-model="name">` |

自定义指令用于封装和 DOM 元素直接相关的可复用操作，例如自动聚焦、成绩高亮、设置颜色等。

| 类型   | 写法                | 适用范围              |
| ---- | ----------------- | ----------------- |
| 全局指令 | `Vue.directive()` | 所有 Vue 实例或组件都能用   |
| 局部指令 | `directives`      | 当前 Vue 实例或当前组件内使用 |

全局指令例子：

```js
Vue.directive('focus', {
  inserted: function(el) {
    el.focus()
  }
})
```

局部指令例子：

```js
new Vue({
  el: '#app',
  directives: {
    big: function(el, binding) {
      el.innerText = binding.value * 10
    }
  }
})
```

自定义指令常考点：

- 使用时写作 `v-指令名`，例如 `v-focus`。
- `el` 表示当前真实 DOM 元素。
- `binding.value` 表示指令绑定的值。
- `inserted` 适合做自动聚焦，因为元素已经插入页面。
- `update` 适合数据变化后重新修改 DOM 效果。

---

### 2. 渲染

渲染的核心：数据状态决定页面上显示什么、显示多少、以什么结构显示。

#### 条件渲染

| 指令 | 作用 | 特点 | 适合场景 |
| --- | --- | --- | --- |
| `v-if` | 根据条件决定是否创建/销毁 DOM | 条件为假时 DOM 不存在 | 条件变化不频繁 |
| `v-else-if` | 多分支条件判断 | 必须紧跟 `v-if` 或上一个 `v-else-if` | 多条件分类 |
| `v-else` | 条件不成立时的兜底分支 | 必须紧跟 `v-if` 或 `v-else-if` | 二选一或兜底 |
| `v-show` | 根据条件显示/隐藏元素 | DOM 一直存在，只切换 `display` | 频繁显示隐藏 |
| `<template v-if>` | 同时控制一组元素 | `template` 本身不渲染成 DOM | 多个标签共用一个条件 |

常考区别：

- `v-if` 是“是否渲染真实 DOM”。
- `v-show` 是“元素一直在，只是 CSS 隐藏”。
- 少切换用 `v-if`，频繁切换用 `v-show`。
- `v-else`、`v-else-if` 中间不能插入无关元素。

#### 列表渲染

数组遍历：

```html
<li v-for="(item, index) in list" :key="item.id">
  {{ index }} - {{ item.name }}
</li>
```

对象遍历：

```html
<li v-for="(value, key, index) in user" :key="key">
  {{ index }} - {{ key }}: {{ value }}
</li>
```

重点：

- `key` 用来帮助 Vue 识别节点身份。
- `key` 应该尽量唯一、稳定，基础题中常见写法是使用 `id` 或 `index`。
- 列表会增删改或排序时，优先使用数据中的唯一 `id`，不推荐用数组下标当 `key`。
- Vue 2 中直接 `this.arr[0] = xxx`、`this.obj.newKey = xxx` 可能不能触发响应式更新。
- 推荐使用 `this.$set(this.arr, index, value)`、`Vue.set(obj, key, value)` 或 `splice()`。

Vue 2 能检测的数组变异方法：

```js
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

非变异方法如 `filter()`、`map()`、`slice()`、`concat()` 返回新数组，需要重新赋值：

```js
this.list = this.list.filter(item => item.done)
```

---

### 3. 过渡

Vue 过渡用于元素或组件进入、离开、切换时添加动画。
#### `<transition>`

`<transition>` 用于单个元素或组件：

```html
<transition name="fade">
  <p v-if="show">内容</p>
</transition>
```

`name="fade"` 时，Vue 自动匹配这些类名：

| 类名 | 阶段 | 含义 |
| --- | --- | --- |
| `.fade-enter` | 进入开始 | 进入前的初始状态 |
| `.fade-enter-active` | 进入过程 | 进入过渡生效状态，常写 `transition` |
| `.fade-enter-to` | 进入结束 | 进入结束状态 |
| `.fade-leave` | 离开开始 | 离开前状态 |
| `.fade-leave-active` | 离开过程 | 离开过渡生效状态，常写 `transition` |
| `.fade-leave-to` | 离开结束 | 离开结束状态 |

如果不写 `name`，默认前缀是 `v`，例如 `.v-enter`、`.v-leave-active`。

淡入淡出常用写法：

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
```

#### 多元素、多组件过渡

多个互斥元素切换时，要加 `key`：

```html
<transition name="fade" mode="out-in">
  <button v-if="isEdit" key="save">保存</button>
  <button v-else key="edit">编辑</button>
</transition>
```

`mode` 常考：

- `out-in`：旧元素先离开，新元素再进入。
- `in-out`：新元素先进入，旧元素再离开。

动态组件过渡：

```html
<transition name="fade" mode="out-in">
  <component :is="currentView"></component>
</transition>
```

#### `<transition-group>`

`<transition-group>` 用于列表过渡：

```html
<transition-group name="list" tag="ul">
  <li v-for="item in list" :key="item.id">{{ item.name }}</li>
</transition-group>
```

重点：

- 用于多个元素或列表。
- 每一项必须有唯一 `key`。
- `<transition>` 不额外渲染 DOM；`<transition-group>` 默认会渲染一个真实元素，可用 `tag` 指定。

---

### 4. 混入

混入 `mixins` 用于复用多个组件共同的选项。

```js
const logMixin = {
  data() {
    return {
      source: 'mixin'
    }
  },
  methods: {
    showSource() {
      console.log(this.source)
    }
  },
  created() {
    console.log('mixin created')
  }
}

export default {
  mixins: [logMixin],
  data() {
    return {
      title: '组件自己的数据'
    }
  }
}
```

合并规则常考：

- `data` 会合并，发生冲突时组件自身数据优先。
- `methods`、`components`、`directives` 等对象选项会合并，冲突时组件自身选项优先。
- 生命周期钩子会合并成数组，混入对象的钩子先执行，组件自身钩子后执行。
- 全局混入 `Vue.mixin({...})` 会影响之后创建的每个 Vue 实例和组件，实际项目中要谨慎使用。

---

### 5. 计算与监听属性

`computed` 和 `watch` 都和数据变化有关，但考试时要分清：`computed` 更像“算结果”，`watch` 更像“盯变化后做事”。

| 项目     | `computed`      | `watch`             |
| ------ | --------------- | ------------------- |
| 作用     | 根据已有数据计算新结果     | 监听某个数据变化后执行操作       |
| 是否有返回值 | 通常有返回值          | 通常没有返回值             |
| 是否缓存   | 有缓存，依赖不变就不重新算   | 数据变化就执行回调           |
| 适合场景   | 总价、总分、状态文字、筛选结果 | 查询接口、复杂逻辑、异步操作、提示校验 |

计算属性例子：

```js
computed: {
  totalPrice: function() {
    return this.price * this.count
  }
}
```

监听属性例子：

```js
watch: {
  keyword: function(newValue) {
    console.log('搜索关键字变化：' + newValue)
  }
}
```

记忆：

- 由数据推导结果，优先想到 `computed`。
- 数据变化后要发请求、弹提示、做复杂操作，优先想到 `watch`。

---

### 6. 事件与表单

`v-model` 用于表单控件的双向绑定：输入改变数据，数据改变视图。

```html
<input v-model="name">
<p>{{ name }}</p>
```

常见控件绑定：

| 控件 | 绑定结果 |
| --- | --- |
| 文本框 | 字符串 |
| 单个复选框 | 布尔值 |
| 多个复选框 | 数组 |
| 单选按钮 | 选中的值 |
| 下拉框 | 选中的值 |

常用修饰符：

| 修饰符       | 作用              | 示例                                             |
| --------- | --------------- | ---------------------------------------------- |
| `.trim`   | 去掉首尾空格          | `<input v-model.trim="name">`                  |
| `.number` | 尽量转为数字          | `<input type="number" v-model.number="score">` |
| `.lazy`   | 失焦或 change 后再同步 | `<input v-model.lazy="msg">`                   |

事件绑定与事件修饰符：

| 写法 | 作用 |
| --- | --- |
| `@click="methodName"` | 点击时调用 `methods` 中的方法 |
| `v-on:click="methodName"` | `@click` 的完整写法 |
| `.stop` | 阻止事件冒泡 |
| `.prevent` | 阻止默认行为 |
| `@submit.prevent` | 表单提交时阻止页面刷新，常用于表单提交 |

示例：

```html
<form @submit.prevent="submitForm">
  <input v-model.trim="name">
  <button type="submit">提交</button>
</form>
```

`v-model` 与 `v-on` 分工：

- `v-model` 负责拿数据。
- `v-on` / `@` 负责做动作。

`computed` 与 `watch` 分工：

| 选项 | 适合做什么 | 例子 |
| --- | --- | --- |
| `computed` | 根据已有数据计算结果 | 总分、总价、等级 |
| `watch` | 监听数据变化后执行额外逻辑 | 提示、校验、异步请求 |

---

### 7. 插槽

插槽用于“父组件向子组件预留位置传内容”。

#### 默认插槽

子组件：

```html
<div class="card">
  <slot></slot>
</div>
```

父组件：

```html
<MyCard>这里会显示到 slot 位置</MyCard>
```

#### 后备内容

```html
<button>
  <slot>提交</slot>
</button>
```

父组件不传内容时显示“提交”，传了内容则显示父组件传入的内容。

#### 编译作用域

普通插槽内容在父组件作用域中编译：

```html
<Child>{{ message }}</Child>
```

这里的 `message` 默认找父组件的数据，不会直接找子组件的数据。

#### 具名插槽

子组件：

```html
<div>
  <slot name="title"></slot>
  <slot name="content"></slot>
</div>
```

父组件：

```html
<ArticleBox>
  <template v-slot:title>
    <h3>{{ title }}</h3>
  </template>
  <template v-slot:content>
    <p>{{ content }}</p>
  </template>
</ArticleBox>
```

#### 作用域插槽

子组件把自己的数据传给父组件决定怎么显示：

```html
<slot :student="student"></slot>
```

父组件接收：

```html
<Child>
  <template v-slot:default="slotProps">
    {{ slotProps.student.name }}
  </template>
</Child>
```

---

### 8. 组件

组件是可复用、可组合的页面模块。单文件组件通常由三部分组成：

```vue
<template>
  <div>结构</div>
</template>

<script>
export default {
  name: 'MyComponent'
}
</script>

<style scoped>
/* 样式 */
</style>
```

使用组件三步：

1. 定义组件：创建 `.vue` 文件。
2. 注册组件：在父组件中 `import` 并写入 `components`。
3. 使用组件：在模板中写组件标签。

父组件：

```vue
<template>
  <StudentCard name="张三" :age="20" />
</template>

<script>
import StudentCard from './components/StudentCard.vue'

export default {
  components: {
    StudentCard
  }
}
</script>
```

也可以记成这条主线：

```text
import 引入子组件 -> components 注册子组件 -> 模板中使用组件标签
```

例如：

```vue
<template>
  <RepairList />
</template>

<script>
import RepairList from './components/RepairList.vue'

export default {
  components: {
    RepairList
  }
}
</script>
```

`props` 重点：

```js
props: ['name', 'age']
```

或复杂写法：

```js
props: {
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 18
  }
}
```

常考：

- 父传子用 `props`。
- 子组件中不要直接修改 `props`。
- `age="20"` 传入字符串；`:age="20"` 传入数字。
- JS 中用小驼峰 `myTitle`，HTML 模板里推荐写短横线 `my-title`。

组件通信核心：

| 写法 | 方向 | 作用 |
| --- | --- | --- |
| `props` | 父组件 -> 子组件 | 父组件给子组件传数据 |
| `$emit` | 子组件 -> 父组件 | 子组件通知父组件发生了某件事 |
| `slot` | 父组件 -> 子组件内容区域 | 内容分发，把父组件内容放到子组件预留位置 |

`$emit` 例子：

```vue
<!-- 子组件 -->
<button @click="$emit('remove', id)">删除</button>

<!-- 父组件 -->
<ChildItem @remove="handleRemove" />
```

动态组件：

```html
<component :is="currentComponent"></component>
```

缓存组件状态：

```html
<keep-alive>
  <component :is="currentComponent"></component>
</keep-alive>
```

---

### 9. 路由 vue-router

Vue 2 项目通常使用 `vue-router@3`。

安装：

```bash
npm install vue-router@3
```

注册插件：

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

基本路由：

```js
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'

export default new VueRouter({
  routes: [
    { path: '/home', component: Home },
    { path: '/about', component: About }
  ]
})
```

入口文件注入：

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

页面导航与出口：

```html
<router-link to="/home" active-class="active">首页</router-link>
<router-link to="/about" active-class="active">关于</router-link>
<router-view></router-view>
```

嵌套路由：

```js
{
  path: '/user',
  component: User,
  children: [
    { path: 'profile', component: UserProfile },
    { path: 'posts', component: UserPosts }
  ]
}
```

注意：

- 子路由 `path` 通常不加 `/`，如 `profile`。
- 父组件内部必须再写一个 `<router-view>`，子路由组件才有显示位置。
- `<router-link>` 是声明式导航。
- `<router-view>` 是路由组件显示出口。
- `routes` 是“路径 path -> 组件 component”的映射表。

路由代码题核心流程：

1. 写页面组件，例如 `Qiantang.vue`、`Nanxun.vue`，或题目中给出的页面组件。
2. 在 `router/index.js` 中配置 `path` 和 `component` 的对应关系。
3. 在 `App.vue` 中用 `<router-link>` 实现跳转，用 `<router-view>` 显示匹配到的路由组件。

---

### 10. Vuex 状态管理

Vuex 是 Vue 项目中的集中式状态管理方案，可以理解为“公共数据仓库”。当多个组件都需要使用同一份数据时，把数据放进 `store`，可以避免组件之间反复传值。

适合放入 Vuex 的内容：

- 用户信息。
- 权限信息。
- 全局配置。
- 多个组件都要读取或修改的公共状态。

Vuex 核心概念：

| Vuex 概念 | 作用 |
| --- | --- |
| `state` | 保存公共状态 |
| `mutations` | 同步修改 `state` |
| `actions` | 处理异步操作或复杂逻辑，再提交 mutation |
| `getters` | 类似 `computed`，对 `state` 做派生计算 |
| `commit` | 提交 mutation |
| `dispatch` | 分发 action |

核心逻辑图可以记成：

```text
组件 -> dispatch(action) -> commit(mutation) -> 修改 state -> 页面更新
```

简单理解：

- 组件要读公共数据：读 `state`。
- 组件要同步改数据：`commit` 一个 `mutation`。
- 组件要做异步或复杂逻辑：`dispatch` 一个 `action`，再由 action 去 `commit`。
- 需要根据 `state` 算新结果：写 `getters`。

---

## 二、模拟卷 A

### 一、选择题（共 10 分，每题 1 分）

1. 下列哪个指令会在条件为假时不创建或移除真实 DOM？  
   A. `v-show`  B. `v-if`  C. `v-bind`  D. `v-on`
   答案：B

2. 在 Vue 2 中，频繁切换显示隐藏时更适合使用：  
   A. `v-if`  B. `v-show`  C. `v-for`  D. `v-slot`
   答案：B

3. `v-for` 遍历列表时，`:key` 的主要作用是：  
   A. 设置样式  B. 阻止事件冒泡  C. 标识节点身份  D. 定义路由路径
   答案：C

4. `<transition name="fade">` 对应的进入过程类名是：  
   A. `.fade-active`  B. `.fade-enter-active`  C. `.v-enter-active`  D. `.fade-show`
   答案：B

5. Vue 2 中局部混入的选项写法是：  
   A. `mixin: obj`  B. `mixins: [obj]`  C. `use: obj`  D. `extends: [obj]`
   答案：B

6. `<input v-model.number="age">` 中 `.number` 的作用是：  
   A. 限制只能输入 1 位数字  B. 尽量把输入值转为数字  C. 自动取整  D. 自动加 1
   答案：B

7. 父组件向子组件传递数据通常使用：  
   A. `props`  B. `watch`  C. `computed`  D. `filters`
   答案：A

8. 普通插槽内容默认在哪个作用域中编译？  
   A. 子组件作用域  B. 父组件作用域  C. 全局作用域  D. 路由作用域
   答案：B

9. Vue Router 中用于显示当前路由匹配组件的是：  
   A. `<router-link>`  B. `<router-view>`  C. `<transition>`  D. `<component>`
   答案：B

10. Vue Router 3 中配置路由表的常见选项名是：  
    A. `paths`  B. `routers`  C. `routes`  D. `views`
   答案：C

### 二、判断题（共 10 分，每题 1 分）

1. `v-show` 条件为假时，元素会从 DOM 中删除。  
   答案：错

2. `v-else` 必须紧跟在 `v-if` 或 `v-else-if` 后面。  
   答案：对

3. Vue 2 中使用 `this.items.splice(index, 1, newValue)` 可以触发数组响应式更新。  
   答案：对

4. `<transition>` 会额外渲染一个真实 DOM 元素包裹内容。  
   答案：错

5. `transition-group` 中的列表项应该提供唯一 `key`。  
   答案：对

6. 混入中的生命周期钩子和组件自身生命周期钩子冲突时，只执行组件自身钩子。  
   答案：错

7. 多个复选框使用同一个 `v-model` 时，绑定结果通常是数组。  
   答案：对

8. 父组件传入插槽的内容可以直接访问子组件的 `data`。  
   答案：错

9. `<keep-alive>` 可以缓存动态组件状态。  
   答案：对

10. 嵌套路由的父组件中需要放置子级 `<router-view>`。
   答案：对

### 三、程序填空题（共 50 分，每题 10 分）

#### 1. 渲染

补全代码：当 `score >= 60` 时显示“及格”，否则显示“不及格”；列表中展示课程名称，并使用课程 id 作为 key。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>条件与列表渲染</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <p __(1)__="score >= 60">及格</p>
  <p __(2)__>不及格</p>
  <ul>
    <li __(3)__="course in courses" __(4)__="course.id">
      {{ course.name }}
    </li>
  </ul>
</div>

<script type="text/javascript">
var vm = new Vue({
  el: "#app",
  data: {
    score: __(5)__,
    courses: [
      { id: 1, name: "Vue基础" },
      { id: 2, name: "组件" }
    ]
  }
});
</script>
</body>
</html>
```


参考答案：`v-if`，`v-else`，`v-for`，`:key`，`72`

#### 2. 过渡

补全多元素过渡代码。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>多元素过渡示例</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <style type="text/css">
    .fade-enter-active, __(4)__ {
      transition: opacity 4s;
    }
    __(5)__, .fade-leave-to {
      opacity: 0;
    }
  </style>
</head>
<body>
<div id="app">
  <button v-on:click="show = !show">切换</button>
  <__(1)__ name="fade">
    <p v-if="show" __(2)__="1">好好学习</p>
    <p v-if="show" key="2">天天向上</p>
  </transition-group>
</div>

<script type="text/javascript">
var vm = new Vue({
  el: "#app",
  data: {
    show: __(3)__
  }
});
</script>
</body>
</html>
```

参考答案：`transition-group`，`key`，`true`，`.fade-leave-active`，`.fade-enter`

#### 3. 混入

补全代码，使普通页面中的全局组件使用 `commonMixin`，并在点击按钮时调用混入中的方法。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>混入示例</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <my-button></my-button>
</div>

<script type="text/javascript">
var commonMixin = {
  methods: {
    showMsg: function() {
      alert("公共方法");
    }
  }
};

Vue.component("my-button", {
  __(1)__: [commonMixin],
  template: '<button v-on:click="__(2)__">提示</button>'
});

var vm = new __(3)__({
  __(4)__: "__(5)__"
});
</script>
</body>
</html>
```

参考答案：`mixins`，`showMsg`，`Vue`，`el`，`#app`

#### 4. 表单

补全代码：姓名去空格，成绩转数字，点击后显示提交结果。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>表单绑定示例</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <input type="text" v-model.__(1)__="name">
  <input type="number" v-model.__(2)__="score">
  <button __(3)__="submit">提交</button>
  <p v-if="submitted">{{ name }}：{{ score }}</p>
</div>

<script type="text/javascript">
var vm = new Vue({
  el: "#app",
  data: {
    name: "",
    score: "",
    submitted: __(4)__
  },
  methods: {
    submit: function() {
      this.submitted = __(5)__;
    }
  }
});
</script>
</body>
</html>
```

参考答案：`trim`，`number`，`v-on:click`，`false`，`true`

#### 5. 插槽

补全具名插槽代码。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>具名插槽示例</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <article-box>
    <template __(1)__:title>
      <h3>{{ title }}</h3>
    </template>
    <template __(2)__:content>
      <p>{{ content }}</p>
    </template>
  </article-box>
</div>

<script type="text/javascript">
Vue.component("article-box", {
  template: `
<div>
  <slot __(3)__="title"></slot>
  <slot __(4)__="content"></slot>
</div>`
});

var vm = new Vue({
  el: "__(5)__",
  data: {
    title: "毕业学校",
    content: "专业：计算机应用"
  }
});
</script>
</body>
</html>
```

参考答案：`v-slot`，`v-slot`，`name`，`name`，`#app`
### 四、代码题（共 30 分，每题 15 分）

#### 1. 组件题

编写一个 `StudentCard.vue` 组件，要求：

- 接收 `name`、`major`、`age` 三个 props。
- `name` 必填，类型为字符串。
- `age` 类型为数字，默认值为 18。
- 页面显示学生姓名、专业和年龄。

再写出父组件中引入、注册并使用该组件的代码，要求给学生传入姓名“张三”、专业“软件工程”、年龄 20。

参考答案：

组件题核心：

```vue
<!-- StudentCard.vue -->
<template>
  <div>
    <h3>学生姓名：{{ name }}</h3>
    <p>专业：{{ major }}</p>
    <p>年龄：{{ age }}</p>
  </div>
</template>

<script>
export default {
  name: 'StudentCard',
  props: {
    name: {
      type: String,
      required: true
    },
    major: String,
    age: {
      type: Number,
      default: 18
    }
  }
}
</script>
```

```vue
<!-- App.vue -->
<template>
  <StudentCard name="张三" major="软件工程" :age="20" />
</template>

<script>
import StudentCard from './components/StudentCard.vue'

export default {
  components: {
    StudentCard
  }
}
</script>
```

#### 2. 路由题

在 Vue 2 项目中配置基础路由，要求：

- 安装并使用 `vue-router@3` 的语法。
- 有两个页面组件：`Home.vue` 和 `About.vue`。
- `/home` 显示 `Home`，`/about` 显示 `About`。
- 在 `App.vue` 中使用 `<router-link>` 导航，并用 `<router-view>` 显示组件。
- 在 `main.js` 中把路由器注入 Vue 根实例。

参考答案：

路由题核心：

```js
// router/index.js
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'

export default new VueRouter({
  routes: [
    { path: '/home', component: Home },
    { path: '/about', component: About }
  ]
})
```

```vue
<!-- App.vue -->
<template>
  <div>
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-view></router-view>
  </div>
</template>
```

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

---

## 三、模拟卷 B

### 一、选择题（共 10 分，每题 1 分）

1. 下列关于 `<template v-if>` 的说法正确的是：  
   A. 会渲染成真实 DOM  B. 只能包裹一个元素  C. 可作为逻辑容器控制一组元素  D. 只能用于路由
   答案：C

2. Vue 2 中给对象新增响应式属性推荐使用：  
   A. `obj.key = value`  B. `Vue.set(obj, key, value)`  C. `obj.push(value)`  D. `delete obj.key`
   答案：B

3. `<transition>` 不写 `name` 时，默认过渡类名前缀是：  
   A. `fade`  B. `vue`  C. `v`  D. `transition`
   答案：C

4. `<transition mode="out-in">` 表示：  
   A. 新元素先进，旧元素后出  B. 旧元素先出，新元素后进  C. 同时进入离开  D. 禁止动画
   答案：B

5. 混入对象和组件对象都有同名 `methods` 时，优先使用：  
   A. 混入方法  B. 组件自身方法  C. 两个都不执行  D. 随机执行
   答案：B

6. 总评成绩由平时分和期末分推导得到，最适合写在：  
   A. `computed`  B. `watch`  C. `components`  D. `props`
   答案：A

7. 下列哪个写法可以把数字 20 传给子组件？  
   A. `age="20"`  B. `:age="20"`  C. `age:20`  D. `v-age="20"`
   答案：B

8. 子组件中定义后备内容的写法是：  
   A. `<slot>默认内容</slot>`  B. `<slot default>`  C. `<template slot>`  D. `<router-view>`
   答案：A

9. Vue Router 中声明式导航组件是：  
   A. `<router-view>`  B. `<router-link>`  C. `<keep-alive>`  D. `<slot>`
   答案：B

10. 嵌套路由中子路由 `children` 的 `path` 推荐写法是：  
    A. `'/profile'`  B. `'profile'`  C. `'#/profile'`  D. `'http://profile'`
   答案：B

### 二、判断题（共 10 分，每题 1 分）

1. `v-if` 的初始渲染成本通常低于 `v-show`。  
   答案：对

2. `v-for` 可以遍历数组，也可以遍历对象。  
   答案：对

3. `filter()` 会直接修改原数组，因此不需要重新赋值。  
   答案：错

4. `.fade-leave-to` 常用于定义离开结束状态。  
   答案：对

5. `<transition-group>` 常用于列表增删动画。  
   答案：对

6. 全局混入只影响当前一个组件。  
   答案：错

7. `.lazy` 会改变 `v-model` 的同步时机。  
   答案：对

8. 具名插槽需要子组件用 `<slot name="xxx">` 定义插槽名。  
   答案：对

9. 子组件可以通过 `props` 接收父组件传来的数据。  
   答案：对

10. `Vue.use(VueRouter)` 的作用是注册路由插件。
   答案：对

### 三、程序填空题（共 50 分，每题 10 分）

#### 1. 渲染

补全代码：根据 `type` 显示不同文案。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>多分支渲染</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <p __(1)__="type === 'A'">优秀</p>
  <p __(2)__="type === 'B'">良好</p>
  <p __(3)__>其他</p>
</div>

<script type="text/javascript">
var vm = new Vue({
  el: "__(4)__",
  data: {
    type: "__(5)__"
  }
});
</script>
</body>
</html>
```

参考答案：`v-if`，`v-else-if`，`v-else`，`#app`，`B`

#### 2. 过渡

补全多组件过渡。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>动态组件过渡</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <style type="text/css">
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  </style>
</head>
<body>
<div id="app">
  <button v-on:click="currentView = 'home-box'">首页</button>
  <button v-on:click="currentView = 'about-box'">关于</button>
  <__(1)__ name="fade" __(2)__="out-in">
    <component __(3)__="currentView"></component>
  </transition>
</div>

<script type="text/javascript">
var vm = new Vue({
  el: "__(5)__",
  data: {
    currentView: "__(4)__"
  },
  components: {
    "home-box": { template: "<p>首页内容</p>" },
    "about-box": { template: "<p>关于内容</p>" }
  }
});
</script>
</body>
</html>
```

参考答案：`transition`，`mode`，`:is`，`home-box`，`#app`

#### 3. 混入

补全代码并说明执行顺序：组件和混入都有 `created`。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>生命周期混入</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <demo-box></demo-box>
</div>

<script type="text/javascript">
var mixinA = {
  __(1)__: function() {
    console.log("mixin created");
  }
};

Vue.component("demo-box", {
  __(2)__: [mixinA],
  template: "<p>混入生命周期测试</p>",
  __(3)__: function() {
    console.log("component created");
  }
});

var vm = new Vue({
  el: "#app"
});
</script>
</body>
</html>
```

执行顺序：先输出 __(4)__，再输出 __(5)__。

参考答案：`created`，`mixins`，`created`，`mixin created`，`component created`

#### 4. 表单

补全多选框绑定，要求选中的爱好保存到数组 `hobbies`。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>复选框绑定</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <label><input type="checkbox" value="篮球" __(1)__="hobbies">篮球</label>
  <label><input type="checkbox" value="阅读" __(2)__="hobbies">阅读</label>
  <p v-if="__(3)__">已选择：{{ hobbies }}</p>
</div>

<script type="text/javascript">
var vm = new Vue({
  el: "__(5)__",
  data: {
    hobbies: __(4)__
  }
});
</script>
</body>
</html>
```

参考答案：`v-model`，`v-model`，`hobbies.length > 0`，`[]`，`#app`

#### 5. 插槽

补全作用域插槽。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>作用域插槽</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <student-box>
    <template __(1)__="slotProps">
      学生姓名：{{ __(2)__.student.name }}
    </template>
  </student-box>
</div>

<script type="text/javascript">
Vue.component("student-box", {
  data: function() {
    return {
      student: { name: "李四" }
    };
  },
  template: '<div><slot __(3)__="student"></slot></div>'
});

var vm = new Vue({
  __(4)__: "__(5)__"
});
</script>
</body>
</html>
```

参考答案：`v-slot:default`，`slotProps`，`:student` 或 `v-bind:student`，`el`，`#app`
### 四、代码题（共 30 分，每题 15 分）

#### 1. 组件题

编写一个 `ProductItem.vue` 组件，要求：

- 接收 `title`、`price`、`count` 三个 props。
- `title` 必填，字符串类型。
- `price` 数字类型，默认值为 0。
- 模板中显示商品名、单价、数量和小计。
- 小计用 `computed` 计算：`price * count`。

再写父组件注册并使用该组件的代码，传入“键盘”、单价 199、数量 2。

参考答案：

```vue
<!-- ProductItem.vue -->
<template>
  <div>
    <h3>{{ title }}</h3>
    <p>单价：{{ price }}</p>
    <p>数量：{{ count }}</p>
    <p>小计：{{ total }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 1
    }
  },
  computed: {
    total() {
      return this.price * this.count
    }
  }
}
</script>
```

```vue
<template>
  <ProductItem title="键盘" :price="199" :count="2" />
</template>

<script>
import ProductItem from './components/ProductItem.vue'

export default {
  components: {
    ProductItem
  }
}
</script>
```

#### 2. 路由题

配置嵌套路由：

- 父路由 `/user` 显示 `User.vue`。
- 子路由 `/user/profile` 显示 `UserProfile.vue`。
- 子路由 `/user/posts` 显示 `UserPosts.vue`。
- `User.vue` 中写两个子路由链接和一个子路由出口。

参考答案：

嵌套路由核心：

```js
// router/index.js
import VueRouter from 'vue-router'
import User from '../pages/User.vue'
import UserProfile from '../pages/UserProfile.vue'
import UserPosts from '../pages/UserPosts.vue'

export default new VueRouter({
  routes: [
    {
      path: '/user',
      component: User,
      children: [
        { path: 'profile', component: UserProfile },
        { path: 'posts', component: UserPosts }
      ]
    }
  ]
})
```

```vue
<!-- User.vue -->
<template>
  <div>
    <h2>用户中心</h2>
    <router-link to="/user/profile">个人资料</router-link>
    <router-link to="/user/posts">文章列表</router-link>
    <router-view></router-view>
  </div>
</template>
```

---

## 四、模拟卷 C

### 一、选择题（共 10 分，每题 1 分）

1. 下列哪个数组方法不是变异方法？  
   A. `push()`  B. `splice()`  C. `reverse()`  D. `filter()`
   答案：D

2. `v-for="(value, key, index) in obj"` 中 `key` 表示：  
   A. 对象属性名  B. 对象属性值  C. 数组长度  D. DOM 节点
   答案：A

3. 在列表过渡中应该使用：  
   A. `<transition-group>`  B. `<router-view>`  C. `<slot>`  D. `<keep-alive>`
   答案：A

4. `enter-active-class` 常用于：  
   A. 指定进入过程类名  B. 指定路由路径  C. 指定组件名称  D. 指定插槽名称
   答案：A

5. 关于混入说法错误的是：  
   A. 可复用公共选项  B. 组件自身选项优先级通常更高  C. 生命周期钩子会合并  D. 全局混入不会影响任何组件
   答案：D

6. 当期末分低于 60 时显示提醒，更适合使用：  
   A. `computed`  B. `watch`  C. `props`  D. `components`
   答案：B

7. 在父组件模板中给子组件传递 `myTitle`，推荐属性写法是：  
   A. `my-title`  B. `my_title`  C. `MYTITLE`  D. `my.title`
   答案：A

8. 子组件希望父组件能访问子组件内部数据并自定义渲染，应使用：  
   A. 默认插槽  B. 作用域插槽  C. 路由出口  D. 混入
   答案：B

9. Vue Router 中当前链接匹配时可通过哪个属性自定义激活类名？  
   A. `class-name`  B. `active-class`  C. `router-class`  D. `link-active`
   答案：B

10. `new Vue({ router })` 中 `router` 的作用是：  
    A. 注入路由器，让应用具备路由能力  B. 定义组件样式  C. 定义插槽  D. 执行动画
   答案：A

### 二、判断题（共 10 分，每题 1 分）

1. `v-if` 和 `v-show` 都可以控制元素显示隐藏，但实现方式不同。  
   答案：对

2. `v-else-if` 前面可以不写 `v-if`。  
   答案：错

3. Vue 2 中直接通过数组下标修改元素一定能触发视图更新。  
   答案：错

4. `<transition name="slide">` 对应的类名前缀是 `slide`。  
   答案：对

5. `<transition-group>` 的每个子节点都应该有唯一 `key`。  
   答案：对

6. 混入只适合复用公共逻辑，不适合随意堆放无关代码。  
   答案：对

7. 单个复选框用 `v-model` 绑定时，结果通常是布尔值。  
   答案：对

8. 具名插槽只能有一个。  
   答案：错

9. 子路由组件显示在父组件内部的 `<router-view>` 中。  
   答案：对

10. `<router-link to="/home">` 通常会触发整页刷新。
   答案：错

### 三、程序填空题（共 50 分，每题 10 分）

#### 1. 渲染

补全代码：点击按钮删除第二项，并保持响应式更新。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>数组更新检测</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <ul>
    <li __(1)__="item in list" __(2)__="item.id">{{ item.name }}</li>
  </ul>
  <button v-on:click="removeSecond">删除第二项</button>
  <button v-on:click="replaceFirst">替换第一项</button>
</div>

<script type="text/javascript">
var vm = new Vue({
  el: "__(5)__",
  data: {
    list: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "Vue" }
    ]
  },
  methods: {
    removeSecond: function() {
      this.list.__(3)__(1, 1);
    },
    replaceFirst: function() {
      this.__(4)__(this.list, 0, { id: 99, name: "新课程" });
    }
  }
});
</script>
</body>
</html>
```

参考答案：`v-for`，`:key`，`splice`，`$set`，`#app`

#### 2. 过渡

补全列表过渡代码。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>列表过渡</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <style type="text/css">
    .list-enter-active, .list-leave-active {
      transition: opacity .5s;
    }
    .list-enter, .list-leave-to {
      opacity: 0;
    }
  </style>
</head>
<body>
<div id="app">
  <button v-on:click="addItem">添加课程</button>
  <__(1)__ name="list" __(2)__="ul">
    <li v-for="item in items" __(3)__="item.id">
      {{ item.name }}
    </li>
  </transition-group>
</div>

<script type="text/javascript">
var vm = new Vue({
  el: "__(5)__",
  data: {
    nextId: 3,
    items: [
      { id: 1, name: "渲染" },
      { id: 2, name: "表单" }
    ]
  },
  methods: {
    addItem: function() {
      this.items.__(4)__({ id: this.nextId, name: "过渡" + this.nextId });
      this.nextId++;
    }
  }
});
</script>
</body>
</html>
```

参考答案：`transition-group`，`tag`，`:key`，`push`，`#app`

#### 3. 混入

补全混入中的数据函数。注意组件的 `data` 必须是函数返回对象。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>混入 data 示例</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <loading-box></loading-box>
</div>

<script type="text/javascript">
var formMixin = {
  data: function() {
    return {
      loading: __(1)__
    };
  },
  methods: {
    changeLoading: function() {
      this.loading = !this.loading;
    }
  }
};

Vue.component("loading-box", {
  __(2)__: [formMixin],
  template: '<button v-on:click="__(3)__">loading：{{ loading }}</button>'
});

var vm = new Vue({
  __(4)__: "__(5)__"
});
</script>
</body>
</html>
```

参考答案：`false`，`mixins`，`changeLoading`，`el`，`#app`

#### 4. 表单

补全计算属性：总评 = 平时分 40% + 期末分 60%。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>成绩计算</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <input type="number" v-model.__(1)__="usualScore">
  <input type="number" v-model.__(2)__="finalScore">
  <p>总评成绩：{{ totalScore }}</p>
</div>

<script type="text/javascript">
var vm = new Vue({
  el: "__(5)__",
  data: {
    usualScore: 80,
    finalScore: 90
  },
  computed: {
    totalScore: function() {
      return this.__(3)__ * 0.4 + this.__(4)__ * 0.6;
    }
  }
});
</script>
</body>
</html>
```

参考答案：`number`，`number`，`usualScore`，`finalScore`，`#app`

#### 5. 插槽

补全后备内容代码。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>后备内容</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
<div id="app">
  <my-button></my-button>
  <my-button>注册</my-button>
</div>

<script type="text/javascript">
Vue.component("my-button", {
  template: '<button><__(1)__>提交</__(2)__></button>'
});

var vm = new Vue({
  __(3)__: "__(4)__"
});
</script>
</body>
</html>
```

第一个按钮显示：__(5)__。

参考答案：`slot`，`slot`，`el`，`#app`，`提交`
### 四、代码题（共 30 分，每题 15 分）

#### 1. 组件题

编写一个 `TabPanel.vue` 组件，要求：

- 接收 `title` prop，字符串类型且必填。
- 使用默认插槽显示面板内容。
- 当父组件不传插槽内容时，显示后备内容“暂无内容”。

再写父组件使用两次 `TabPanel` 的代码：第一次传入内容“课程介绍”，第二次不传内容。

参考答案：

```vue
<!-- TabPanel.vue -->
<template>
  <div>
    <h3>{{ title }}</h3>
    <div>
      <slot>暂无内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabPanel',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
```

```vue
<!-- App.vue 组件使用示例 -->
<template>
  <div>
    <TabPanel title="课程一">
      课程介绍
    </TabPanel>
    <TabPanel title="课程二" />
  </div>
</template>

<script>
import TabPanel from './components/TabPanel.vue'

export default {
  components: {
    TabPanel
  }
}
</script>
```

#### 2. 路由题

配置一个课程系统路由：

- `/course/list` 显示 `CourseList.vue`。
- `/course/detail` 显示 `CourseDetail.vue`。
- 这两个路由作为 `/course` 的子路由。
- `/course` 的父组件为 `Course.vue`，其中要有子路由导航和子路由出口。
- 根组件 `App.vue` 中要能进入 `/course`。

参考答案：

课程嵌套路由核心：

```js
// router/index.js
import VueRouter from 'vue-router'
import Course from '../pages/Course.vue'
import CourseList from '../pages/CourseList.vue'
import CourseDetail from '../pages/CourseDetail.vue'

export default new VueRouter({
  routes: [
    {
      path: '/course',
      component: Course,
      children: [
        { path: 'list', component: CourseList },
        { path: 'detail', component: CourseDetail }
      ]
    }
  ]
})
```

```vue
<!-- Course.vue -->
<template>
  <div>
    <h2>课程中心</h2>
    <router-link to="/course/list">课程列表</router-link>
    <router-link to="/course/detail">课程详情</router-link>
    <router-view></router-view>
  </div>
</template>
```

```vue
<!-- App.vue -->
<template>
  <div>
    <router-link to="/course">课程中心</router-link>
    <router-view></router-view>
  </div>
</template>
```

---

## 五、临考速记

1. 基础：`el` 指定挂载位置，`data` 保存数据，`{{ }}` 显示数据；`data` 变化页面自动更新。
2. 渲染：`v-if` 控 DOM，`v-show` 控 display；`v-for` 必记 `:key`。
3. 响应式：数组替换用 `$set` 或 `splice`；对象新增用 `Vue.set`。
4. 自定义指令：全局用 `Vue.directive()`，局部用 `directives`；`inserted` 常用于自动聚焦。
5. 计算与监听：`computed` 算结果，`watch` 盯变化后执行操作。
6. 事件与表单：`v-model` 拿数据，`@click` 做动作；`.stop`、`.prevent`、`.number` 常考，表单提交常用 `@submit.prevent`。
7. 过渡：`<transition>` 单个，`<transition-group>` 列表；`name="fade"` 对应 `fade-enter-active` 等类名。
8. 混入：`mixins: []`；数据和方法合并，冲突组件优先；生命周期混入先执行。
9. 插槽：普通插槽看父作用域；子组件想传数据给父组件渲染，用作用域插槽。
10. 组件：定义、注册、使用；父传子用 `props`，子传父用 `$emit`，内容分发用 `slot`。
11. 路由：`Vue.use(VueRouter)`，`routes` 配路径和组件，`router-link` 跳转，`router-view` 显示；嵌套路由子路径不加 `/`。
12. Vuex：`state` 存公共状态，`mutations` 同步修改，`actions` 处理异步，`getters` 派生计算；`commit` 提交 mutation，`dispatch` 分发 action。
