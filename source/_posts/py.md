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

- `''`和`""`的使用完全相同，`"""`可以指定一个多行的字符串，不支持单字符类型，单个字符也视为字符串

- `\`转义符，使用`r`可以让反斜杠不发生转义

- 默认输出会自动换行，不需要换行在变量的末尾加上`end=""`,`print( x, end=" " )`

- `Nubmber`包含`int`、`float`、`complex`(复数)其中`int`包含`bool`（`True`、`False`）

- 删除`del`,`del var1[,var2[,var3[....,varN]]]`

- 切片时包含前索引不包含后索引
  ![切片索引](../images/py/切片索引.png)

导入：
- 将整个模块(somemodle)导入，格式为： `import somemodule`
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
del list[1]
list[0]='www'
len([1,2,3])#3
print([1,2,3]+[4,5,6])# [1, 2, 3, 4, 5, 6]
[1,2,3]*2 # [1, 2, 3, 1, 2, 3]
3 in [1,2,3] # True
print(list)
list.extend([1,2,3])#['www', 1, 2, 3]
list.count('Google') # 0
list.insert(2,'he')#['www', 1, 'he', 2, 3]
list.index('he')#2找出第一个匹配项
list.remove('he')#['www', 1, 2, 3]移除第一个匹配项
list.pop(1)#['www', 2, 3]移除指定位置的元素，默认为最后一个
list.sort()#['www', 2, 3]排序,默认升序,降序list.sort(reverse=True)
list.reverse()#[3, 2, 'www']反转
```

**tuple元组**：

&nbsp;&nbsp;&nbsp;&nbsp;定义时使用小括号且元组内的元素不可修改，访问元组内的元素与列表相同,删除只能删除整个元组

> 如果你想创建只有一个元素的元组，需要注意在元素后面添加一个逗号，以区分它是一个元组而不是一个普通的值，这是因为在没有逗号的情况下，Python会将括号解释为数学运算中的括号，而不是元组的表示。

```python
tup1 = ('Google', 'Runoob', 1997, 2000)
type(tup1)# <class 'tuple'>
tup2 = (1, 2, 3, 4, 5 )
tup3 = tup1+tup2
list = list(tup3)# ['Google', 'Runoob', 1997, 2000, 1, 2, 3, 4, 5]
```

**dictionary字典**：
&nbsp;&nbsp;&nbsp;&nbsp;表示映射关系的键（`key`）值（`value`）对，`key`必须唯一，键不可变，因此可以使用数字，字符串，元组而不能使用列表

```python
tinydict = {'name': 'runoob', 'likes': 123, 'url': 'www.runoob.com'}
len(tinydict)#3
type(tinydict)#<class 'dict'>
tinydict['name']#runoob
tinydict['age']=7# 添加一个新的键值对
str(tinydict)#"{'name': 'runoob', 'likes': 123, 'url': 'www.runoob.com', 'age': 7}"
del tinydict['name']# 删除键是'name'的条目
del tinydict# 删除字典
tinydict.clear()# 清空字典
```

**set集合**：

&nbsp;&nbsp;&nbsp;&nbsp;是一种无需、可变的数据类型，用于存储唯一的元素，创建格式`parame = {value01,value02,...}`或者`set(value)`

```python
set1 = {1, 2, 3, 4}            # 直接使用大括号创建集合
set2 = set([3, 4, 5, 6])      # 使用 set() 函数从列表创建集合
3 in set1 # True
set3 = set1 & set2 # 交集
set4 = set1 | set2 # 并集
set5 = set1 - set2 # 差集
set6 = set1 ^ set2 # 对称差集,,即只在一个集合中,不同时在两个集合中
set1.add(5) # 添加元素
tuple=(6, 7)
set1.add(tuple) # 添加元素
set1.update([6, 7]) # 添加多个元素
print(set1)
set1.remove(7) # 删除元素,不存在会报错
set1.discard(8) # 删除元素,不存在不会报错
set1.pop() # 随机删除一个元素
```

### 面向对象

```python
class Employee:
   '所有员工的基类'
   empCount = 0#成员变量
    
 
   def __init__(self, name, salary):#构造函数
      self.name = name
      self.salary = salary
      Employee.empCount += 1
   
   def displayCount(self):#self表示实例，当前实例的地址，可替换
     print "Total Employee %d" % Employee.empCount
 
   def displayEmployee(self):
      print "Name : ", self.name,  ", Salary: ", self.salary
```

