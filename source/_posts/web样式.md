---
title: web样式
date: 2024-12-06 19:56:04
categories:
  - 期末考试
tags: [期末]
index_img:
banner_img: /images/壁纸.jpg
---

格式：

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .color {
            color: purple;
            text-decoration: underline;
        }
        .color:hover {
            color: red;
        }
    </style>
</head>
<body>
    <a href="https://2819461143wp.github.io" class="color">点击变色</a>
    <video src="">你是啥</video>
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
- `<audio src=""></audio>`音频
- `<a href="" targer=" "></a>`  `_self`原窗口打开，`_blank`新窗口打开
- `<span></span>`行内标签，给一部分文字加特殊样式
- 无序列表

```html
<ul>
    <li>1</li>
    <li>2</li>
</ul>
```

> - 1
> - 2

- 有序列表


```html
<ol>
    <li>3</li>
    <li>4</li>
</ol>
```

> 1. 3
> 2. 4

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

### 背景

`background-color: #000;`背景颜色

`background-image: url(bg02.jpeg);`背景图片

> - **`background-attachment: fixed;`**：背景图像固定在视口中，不随页面内容滚动。
> - **`background-attachment: scroll;`**（默认值）：背景图像随页面内容滚动。
> - **`background-attachment: local;`**：背景图像随元素内容滚动。

### 超链接

`<a href="" targer=" "></a>`，其中`_self`原窗口打开，`_blank`新窗口打开，默认为原窗口

可以定义图像链接或者视频链接，只需要在a标签里写图像或者视频即可

#### 锚点链接

`href="#one"`，然后在跳转的地方定义`id="one"`，类似于latex中的文献引用。

### 2D变形

2D变形指的是在二维平面上对元素进行变换，包括以下几种类型：

- **translate**：平移，移动元素到新的位置，不改变其尺寸和旋转状态。
  
  ```css
  transform: translate(x, y);

其中`x`和`y`是平移的距离。

- **rotate**：旋转，围绕元素的中心点旋转一定的角度。

  ```css
  transform: rotate(angle);

`angle`是旋转的角度，正值表示顺时针旋转，负值表示逆时针旋转。

- **scale**：缩放，改变元素的尺寸。

  ```css
  transform: scale(x, y);

`x`和`y`分别表示水平和垂直方向的缩放比例。

- **skew**：倾斜，使元素沿着x轴或y轴倾斜一定的角度。

    ```css
    transform: skew(x-angle, y-angle);
    ```

`x-angle`和`y-angle`分别是沿x轴和y轴的倾斜角度。

- **matrix**：矩阵，通过一个包含六个值的矩阵来执行复杂的2D变换。

    ```css
    transform: matrix(a, b, c, d, e, f);
    ```

其中`a`到`f`是矩阵的值，可以组合平移、旋转、缩放和倾斜的效果。

### 3D变形

3D变形允许元素在三维空间中进行变换，提供了更多的视觉效果和交互性。包括以下几种类型：

- **translate3d**：在三维空间中平移元素。

    ```css
    transform: translate3d(x, y, z);
    ```

`x`、`y`和`z`分别是沿x轴、y轴和z轴的平移距离。

- **rotate3d**：围绕由三个值定义的轴旋转元素。

    ```css
    transform: rotate3d(x, y, z, angle);
    ```

`x`、`y`和`z`定义旋转轴的方向，`angle`是旋转的角度。

- **scale3d**：在三维空间中缩放元素。

    ```css
    transform: scale3d(x, y, z);
    ```

`x`、`y`和`z`分别是沿x轴、y轴和z轴的缩放比例。

- **perspective**：为3D变形设置透视点，影响3D空间中元素的透视效果。

    ```css
    transform: perspective(depth);
    ```

`depth`是透视点距离屏幕的距离。

- **matrix3d**：通过一个包含16个值的4x4矩阵来执行复杂的3D变换。

    ```css
    transform: matrix3d(m1,  m2,  m3,  m4,  m5,  m6,  m7,  m8,  m9,  m10, m11, m12, m13, m14, m15, m16);
    ```

`m1`到`m16`是矩阵的值，可以组合平移、旋转、缩放和倾斜的效果。
