---
title: jsp
date: 2025-02-27 13:56:26
categories:
  - note
  - language
  - jsp
tags: [language]
banner_img: /images/壁纸.jpg
---

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%! int day = 3; %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>
<h3>IF...ELSE 实例</h3>
<p>
   今天的日期是: <%= (new java.util.Date()).toLocaleString()%>
</p>
<% if (day == 1 || day == 7) { %>
      <p>今天是周末</p>
<% } else { %>
      <p>今天不是周末</p>
<% } %>
</body> 
</html> 
```

- 脚本程序格式`<% 代码片段 %>`
- 变量声明`<%! int i = 0; %> `
- jsp表达式`<p>今天的日期是: <%= (new java.util.Date()).toLocaleString()%></p>`

while循环

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%! int fontSize; %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>
<h3>For 循环实例</h3>
<%for ( fontSize = 1; fontSize <= 3; fontSize++){ %>
   <font color="green" size="<%= fontSize %>">
    菜鸟教程
   </font><br />
<%}%>
</body> 
</html> 
```

switch case

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%! int day = 3; %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>
<h3>SWITCH...CASE 实例</h3>
<% 
switch(day) {
case 0:
   out.println("星期天");
   break;
case 1:
   out.println("星期一");
   break;
case 2:
   out.println("星期二");
   break;
case 3:
   out.println("星期三");
   break;
case 4:
   out.println("星期四");
   break;
case 5:
   out.println("星期五");
   break;
default:
   out.println("星期六");
}
%>
</body> 
</html> 
```

### jsp指令

```jsp
<%@ page ... %>
<%@ include ... %>
<%@ taglib ... %>
```

#### Page指令

`<%@ page attribute="value" %>`默认为`java`

#### include

`<%@ include file="文件相对 url 地址" %>`

#### taglib指令

`<%@ taglib uri="uri" prefix="prefixOfTag" %>`用户自定义标签集合

### jsp动作元素

#### `<jsp:include>`

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>

<h2>include 动作实例</h2>
<jsp:include page="date.jsp" flush="true" />

</body>
</html>
```

#### `<jsp:useBean>`

```jsp
<jsp:useBean id="name" class="package.class" />
```

#### `<jsp:setProperty>`

方法一

```jsp
<jsp:useBean id="myName" ... />
...
<jsp:setProperty name="myName" property="someProperty" .../>
```

方法二

```jsp
<jsp:useBean id="myName" ... >
...
   <jsp:setProperty name="myName" property="someProperty" .../>
</jsp:useBean>
```

例子

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>

<h2>Jsp 使用 JavaBean 实例</h2>
<jsp:useBean id="test" class="com.runoob.main.TestBean" />
 
<jsp:setProperty name="test" 
                    property="message" 
                    value="菜鸟教程..." />
 
<p>输出信息....</p>
 
<jsp:getProperty name="test" property="message" />

</body>
</html>
```

### jsp四个内置对象

#### request

```jsp
<%
	request.setAttribute("username","tom")
    request.getAttribute("username")
%>
```

对象类型为jakarta,servlet,http,HttpServletRequest

获取前端提交数据

用request对象存取数据

#### response

动态改变contentType属性值

设置相应表头

response重定向

`response.sendRedirect("login.jsp")`

#### session

session对象指的是客户端和服务端的一次会话，在同一个web服务里只有一个session

#### application

pageContext

### jsp的四个作用域

页面域

请求域

会话域

应用域

### 在jsp中使用JavaBean

先通过page指令导入创建的bean类

`<% @ paage import = "com.bean.*" %>`

#### userBean 动作标记

`< jsp:useBean id = "bean的名字" class = "创建bean的类" scope = "bean的有效范围"/>`

例：`< jsp:useBean id = "rectangle" class = "com.bean.Rectangle" scope = "page"/>`

使用的话就是

```jsp
< p >矩形的长是： <% = rectangle.getLength() %>
```

#### getProperty动作标记

```jsp
< jsp:useBean id = "pig" class = "com.bean.NewRectangle" scope = "page" />
<% pig.setLength(30); %>
< p >矩形的长是：< jsp:getProperty property = "length" name = "pig" />
```

#### setProperty动作标记

```jsp
< jsp:useBean id = "smallCar" class = "com.bean.Car" scope = "page" />
< jsp:setProperty property = "tradeMark" name = "smallCar" value = "宝马X6" />
```

通过HTTP表单的参数设置bean的属性值（表单参数与属性自动匹配）

```html
< form action = "showCar.jsp" method = "post">
</form>
```

### Servlet的生命周期

1. 初始化Servlet对象:`init()`
2. service()方法响应请求:`service()`
3. Servlet对象死亡:`destroy()`

### doGet()和doPost()方法

#### 重定向与转发

转发（forward）是指在服务器端将请求转发到另一个资源（Servlet、JSP等）进行处理，然后将处理结果返回给客户端。在转发过程中，客户端浏览器并不知道页面的真实路径，整个过程对客户端来说是透明的。转发是通过RequestDispatcher对象实现的。

重定向（redirect）是指在服务器端返回一个特殊的响应给客户端，告诉客户端去请求另一个URL。客户端浏览器会收到这个响应后，会再次发送一个新的请求到这个新的URL。在重定向过程中，客户端浏览器会改变URL，因此客户端可以看到新的URL。重定向是通过发送特殊的HTTP响应码（如302）和Location头来实现的。

区别：

- 位置：转发是在服务器内部进行的，对客户端来说是透明的；重定向是通过客户端浏览器重新发送请求到新的URL实现的。
- URL变化：转发不会改变浏览器的URL；重定向会改变浏览器的URL。
- 数据共享：转发可以在跳转的过程中共享request域中的数据；重定向不能直接在跳转的过程中共享数据，需要通过URL参数或者session来传递数据。

重定向是客户端行为，转发是服务器行为

> 重定向：页面跳转；`response.sendRedirect(url或jsp文件)`
>
> 转发：请求转发到新的url，nginx；`request.getRequestDispatcher(url或jsp页面)`

### MVC

model:javaBean类

View:前端页面/jsp页面

Controller：处理逻辑：springboot里的@Controller注解/Servlet对象

### 过滤器Filter

在web.xml中部署过滤器，在`< web-app ></ web-app >`中添加

```xml
<filter>
    <filter-name>LogFilter</filter-name>
    <filter-class>com.runoob.test.LogFilter</filter-class>
    <init-param>
        <param-name>Site</param-name>
        <param-value>菜鸟教程</param-value>
    </init-param>
    </filter>
```

基于注解的方式部署`@WebFilter`



1. 简述过滤器的运行原理。

- 拦截请求：当客户端发送HTTP请求时，过滤器可以拦截这些请求。过滤器可以在请求到达Servlet之前对请求进行处理，比如校验、修改、记录日志等。
- 过滤器链：如果存在多个过滤器，它们会形成一个过滤器链。每个过滤器都有机会对请求进行处理，然后将请求传递给下一个过滤器，或者直接传递给Servlet进行处理。
- 处理请求：当请求通过所有过滤器后，最终会到达Servlet，由Servlet来处理请求并生成响应。
- 拦截响应：在Servlet生成响应后，响应会经过过滤器链中的过滤器。过滤器可以在响应发送到客户端之前对响应进行处理，比如压缩、加密、添加响应头等。
- 过滤器链执行顺序：过滤器的执行顺序由它们在web.xml中的配置顺序决定。先配置的过滤器先执行，后配置的过滤器后执行。

2. Filter 接口中有哪些方法？它们分别具有什么功能？

void init(FilterConfig filterConfig)

该方法在过滤器被初始化时调用，用于进行一些初始化操作。
参数filterConfig包含了过滤器的配置信息，可以通过该参数获取初始化参数、Servlet上下文等信息。
void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)

该方法用于实际拦截请求和响应，对它们进行处理，并将请求传递给下一个过滤器或目标Servlet。
参数request表示客户端的请求，参数response表示要返回给客户端的响应，参数chain表示过滤器链，通过调用chain.doFilter(request, response)可以将请求传递给下一个过滤器或目标Servlet。
void destroy()

该方法在过滤器被销毁时调用，用于进行一些清理操作。
在该方法中可以释放资源、关闭连接等清理工作。
3. 过滤器可以实现哪些常用功能？

- 日志记录：记录请求和响应的信息，用于分析和监控应用程序的运行情况。
- 权限验证：对请求进行身份验证和权限检查，以确保用户有权访问特定的资源或执行特定的操作。
- 数据压缩：对响应数据进行压缩，以减少传输数据量，提高网站性能。
- 字符编码转换：在请求和响应中进行字符编码的转换，确保数据的正确传输和显示。
- 请求过滤：对请求进行过滤和处理，比如防止恶意请求、拦截特定的请求等。
- 响应处理：对响应进行处理，比如添加响应头、重定向等。
- 性能监控：监控请求的处理时间、资源消耗等性能指标，用于性能优化和故障排查。
- 安全防护：实施安全策略，比如防止跨站脚本攻击（XSS）、防止跨站请求伪造（CSRF）等。
- 缓存控制：控制缓存策略，比如设置缓存过期时间、强制刷新缓存等。
- 请求转发和重定向：根据特定条件对请求进行转发或重定向到其他资源。

4. 简述监听器的分类。

> ServletContext 监听器：用于监听Web应用程序的生命周期事件，比如Web应用程序的启动和关闭。常用的监听器接口是ServletContextListener，它包括contextInitialized和contextDestroyed方法，分别在Web应用程序启动和关闭时被调用。
>
> HttpSession 监听器：用于监听HTTP会话（Session）的生命周期事件，比如会话的创建、销毁、属性的添加和移除。常用的监听器接口是HttpSessionListener和HttpSessionAttributeListener，分别用于监听会话的创建和销毁，以及会话属性的变化。
>
> ServletRequest 监听器：用于监听HTTP请求的生命周期事件，比如请求的到达、离开、属性的添加和移除。常用的监听器接口是ServletRequestListener和ServletRequestAttributeListener，分别用于监听请求的到达和离开，以及请求属性的变化。
>
> 监听器的上下文初始化和销毁：用于监听Web应用程序的上下文初始化和销毁事件。常用的监听器接口是ServletContextListener，通过实现contextInitialized和contextDestroyed方法来监听上下文的初始化和销毁。

5. 哪种监听器不需要部署？

> 在JavaEE中，ServletContext监听器不需要显式部署。当Web应用程序启动时，容器会自动检测并调用实现了ServletContextListener接口的监听器，无需在web.xml文件中进行特殊配置。这使得ServletContext监听器成为一种非常便捷的方式来执行应用程序初始化和清理逻辑。
> 

### 文件上传下载

### 文件上传表单设置

<form action="upload" method="post" enctype="multipart/form-data">
    <input type="file" name="headImage"><br>
    <input type="submit" value="上传">
</form>

### @MultipartConfig注解

### 文件下载设置报头

```jsp
response.setHeader("Content-Type", "application/x-msdownload");
response.setHeader("Content-Disposition", "attachment; filename=" + filename);
```

### JDBC完成的事情

1. 与指定的数据库建立连接
2. 向已连接的数据库发送SQL命令
3. 处理SQL命令返回的结果

```jsp
<%@ page language = "java" contentType = "text/html; charset=UTF-8" pageEncoding = "UTF-8" %>
<%@ page import = "java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset = "UTF-8">
<title>访问 MySQL 数据库</title>
</head>
<body>
<%
    Connection con = null;
    Statement st = null;
    ResultSet rs = null;
    //加载驱动
    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    }
    try {
        //建立连接
        con = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?useUnicode = true&characterEncoding = UTF-8&allowMultiQueries = true&serverTimezone = GMT % 288","root","root");
        st = con.createStatement();
        //发送查询 SQL 语句,返回结果集
        rs = st.executeQuery("select * from goods");
        while(rs.next()){
            out.print(rs.getString("id") + "&nbsp;&nbsp;");
            out.print(rs.getString("gname") + "&nbsp;&nbsp;");
            out.print(rs.getString("gprice") + "&nbsp;&nbsp;");
            out.print("<br>");
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }finally{
        rs.close();
        st.close();
        con.close();
    }
%>
</body>
</html>
```



### PreparedStatement

将SQL语句传送给数据库进行预编译。后续执行相同语句不需要重新编译

### Ajax

异步js和xml`Asynchronous JavaScript and XML`

一种创建交互式网页应用的网页开发技术，不刷新页面向服务器发起请求
