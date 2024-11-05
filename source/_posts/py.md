---
title: Python
date: 2024-10-28 10:56:26
categories:
  - note
  - language
  - Python
tags: [language]
banner_img: /images/壁纸.jpg
---

## 基础语法

### 基础

- 整除`//` 幂`**`

- `''`和`""`的使用完全相同，``"""`可以指定一个多行的字符串，不支持单字符类型，单个字符也视为字符串

- `\`转义符，使用`r`可以让反斜杠不发生转义

- 默认输出会自动换行，不需要换行在变量的末尾加上`end=""`,`print( x, end=" " )`

- `Nubmber`包含`int`、`float`、`complex`(复数)其中`int`包含`bool`（`True`、`False`）

- 删除`del`,`del var1[,var2[,var3[....,varN]]]`

- 切片时包含前索引不包含后索引
  ![切片索引](../images/py/切片索引.png)

导入：
- 将整个模块(somemodule)导入，格式为： `import somemodule`
- 从某个模块中导入某个函数,格式为：`from somemodule import somefunction`
- 从某个模块中导入多个函数,格式为： `from somemodule import firstfunc, secondfunc, thirdfunc`
- 将某个模块中的全部函数导入，格式为：`from somemodule import *`

运算优先级：

| **                       | 幂                   |
| ------------------------ | -------------------- |
| ~ + -                    | 取反  一元加减号     |
| \* / % //                | 乘，除，取模和取整除 |
| \+ -                     | 加法减法             |
| \>> <<                   | 右移，左移运算符     |
| &                        | 位 运算符符          |
| ^ \|                     | 位运算符             |
| <=   <   >   >=          | 比较运算符           |
| == !=                    | 等于运算符           |
| = %= /= //= -= += *= **= | 赋值运算符           |

**list列表**：列表内的元素可以修改

```python
list = []
list.append('Google')
list.append('Runoob')
del list1[1]
print list
```

**tuple元组**：

&nbsp;&nbsp;&nbsp;&nbsp;定义时使用小括号且元组内的元素不可修改，如果你想创建只有一个元素的元组，需要注意在元素后面添加一个逗号，以区分它是一个元组而不是一个普通的值，这是因为在没有逗号的情况下，Python会将括号解释为数学运算中的括号，而不是元组的表示。

**set集合**：

&nbsp;&nbsp;&nbsp;&nbsp;是一种无需、可变的数据类型，用于存储唯一的元素，创建格式`parame = {value01,value02,...}`或者`set(value)`

**dictionary字典**：
&nbsp;&nbsp;&nbsp;&nbsp;表示映射关系的键`key`值`value`对，`key`必须唯一


### 面向对象

```python
class Employee:
   '所有员工的基类'
   empCount = 0#成员变量
 
   def __init__(self, name, salary):#构造函数
      self.name = name
      self.salary = salary
      Employee.empCount += 1
   
   def displayCount(self):#self表示实例，当前对象的地址，可替换
     print "Total Employee %d" % Employee.empCount
 
   def displayEmployee(self):
      print "Name : ", self.name,  ", Salary: ", self.salary
```

