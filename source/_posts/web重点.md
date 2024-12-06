---
title: web重点
date: 2024-12-26 17:56:04
categories:
  - 期末考试
tags: [期末]
index_img:
banner_img: /images/壁纸.jpg
---

格式：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Image Example</title>
    <style>
        .left-aligned {
            float: right;
        }
    </style>
</head>

<body>
    <div>
        <img src="D:/code/web/bg02.jpeg" alt="" class="left-aligned">
        sdakwjankdjw
    </div>
</body>

</html>
```
## html
- `<h1></h1>`
- `<p align="center">cwdpsky</p>`
- `<hr>`分割线

| 属性名 | 属性                    |
| ------ | ----------------------- |
| aliign | left right center(默认) |
| size   | 默认2px                 |
| color  | 可以直接颜色也可以RGB   |
| width  | 长度，默认100%          |

- `<br>`换行符
- `<b></b>`或`<strong></strong>`文本加粗
- `<u></u>`或``<ins></ins>`文本下划线
- `<i></i>`或``<em></em>`斜体 
- `<s></s>`或``<del></del>`文本增加删除线
- `<img src="" alt="">`
- `<video src=""></video>`
- `<a href=""></a>`超链接
- `<span></span>`行内标签，给一部分文字加特殊样式
- 无序列表

```html
<ul>
    <li></li>
    <li></li>
</ul>
```

- 有序列表


```html
<ol>
    <li></li>
    <li></li>
</ol>
```

- 定义列表

```html
<dl>
	<dt>HTML</dt>
	<dd>超文本标记语言，用于创建网页。</dd>
	<dt>CSS</dt>
	<dd>层叠样式表，用于控制网页的外观和布局。</dd>
	<dt>JavaScript</dt>
	<dd>一种编程语言，用于创建动态和交互式网页内容。</dd>
</dl>
```

- 表格

```html
		<table border="1">
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody id="personList">
                <!-- 动态生成的行将插入到这里 -->
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">表格脚部信息</td>
                </tr>
            </tfoot>
        </table>
```

- 表单

```html
<form method="POST" action="/submit-form">
        <label for="username">用户名:</label>
        <input type="text" id="username" name="username" placeholder="请输入用户名"><br><br>
    
        <label for="password">密码:</label>
        <input type="password" id="password" name="password" placeholder="请输入密码"><br><br>
    
        <label for="subscribe">订阅新闻:</label>
        <input type="checkbox" id="subscribe" name="subscribe" value="newsletter"> 订阅新闻<br><br>
    
        <label>性别:</label>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">男</label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">女</label><br><br>
    
        <label for="country">国家:</label>
        <select id="country" name="country">
            <option value="china">中国</option>
            <option value="usa">美国</option>
            <option value="uk">英国</option>
        </select><br><br>
    
        <label>兴趣爱好:</label><br>
        <input type="checkbox" id="hobby1" name="hobbies" value="reading">
        <label for="hobby1">阅读</label><br>
        <input type="checkbox" id="hobby2" name="hobbies" value="traveling">
        <label for="hobby2">旅行</label><br>
        <input type="checkbox" id="hobby3" name="hobbies" value="cooking">
        <label for="hobby3">烹饪</label><br>
        <input type="checkbox" id="hobby4" name="hobbies" value="sports">
        <label for="hobby4">运动</label><br><br>
    
        <button type="submit">提交</button>
    </form>
```



## css

### 导入css

- 行内式/内联样式：：样式写在标签里

- 内嵌式：写在`<head></head>`的`<style> </style>`里

- 外链式/链入式：`<link rel="stylesheet" href="css文件位置">`

### 选择器

- 标签选择器

```css
p{
	font-size: 10;
}
```

- 类选择器

```css
.left-aligned {
    float: left;
}
```

- id选择器

````css
#unique-element {
    font-size: 20px;
    color: red;
}
````

- 通配符选择器

```css
* {
	margin: auto; 
}
```

- 标签指定式选择器:标签里调用类选择器`left-aligned`

```css
p.left-aligned {
	font-size: 16px;
	color: blue;
	float: left;
}
```

- 后代选择器

```css
p strong{
    color: #000;
}
```

- 并集选择器

```css
h1,h2,h3{
    color: #000;
}
```

### 字

 `forn-size`设置字号，不写单位该属性无效

| 单位 | 说明 |
| ---- | ---- |
| em   | 倍率 |
| px   | 像素 |
| in   | 英寸 |
| cn   | 厘米 |
| mm   | 毫米 |
| ptt  | 点   |

`forn-family`设置字体

```css
p{
	font-family: "微软雅黑";
}
```

`letter-spacing: 10px;`字间距

`word-spacing: 10px;`词间距

`line-height: 10px;`行间距

`text-align: center;`文本内容水平对齐方式

`word-wrap: break-word;`文本自动换行

### 盒子`<div></div>`

内边距`padding`，边框`border`，外边距`margin`,边框四个方向可以单独设置样式:`border-top`,`border-bottom`,`left`,`right`

宽度综合设置`border-width: 10px 20px 30px 400px;`上右下左，其他样式同理，对于内外边距通常只调整宽度

盒子宽度为内部元素的宽度+内外边距+边框

> 无所谓，通常分布设置盒子宽度通过display: flex;盒内元素会自动调整

### 图像

`background-color: #000;`背景颜色

`background-image: url(bg02.jpeg);`背景图片

> - **`background-attachment: fixed;`**：背景图像固定在视口中，不随页面内容滚动。
> - **`background-attachment: scroll;`**（默认值）：背景图像随页面内容滚动。
> - **`background-attachment: local;`**：背景图像随元素内容滚动。

设置透明度

渐变

阴影
