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

### 数据结构

#### list列表

列表内的元素可以修改

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
print(list) #['www']
list.extend([1,2,3])#['www', 1, 2, 3]
list.count('Google') # 0
list.insert(2,'he')#['www', 1, 'he', 2, 3]
list.index('he')#2找出第一个匹配项
list.remove('he')#['www', 1, 2, 3]移除第一个匹配项
list.pop(1)#['www', 2, 3]移除指定位置的元素，默认为最后一个
list.sort()#['www', 2, 3]排序,默认升序,降序list.sort(reverse=True)
list.reverse()#[3, 2, 'www']反转
```

#### tuple元组

&nbsp;&nbsp;&nbsp;&nbsp;定义时使用小括号且元组内的元素不可修改，访问元组内的元素与列表相同,删除只能删除整个元组

> 如果你想创建只有一个元素的元组，**需要注意在元素后面添加一个逗号**，以区分它是一个元组而不是一个普通的值，这是因为在没有逗号的情况下，Python会将括号解释为数学运算中的括号，而不是元组的表示。

```python
tup1 = ('Google', 'Runoob', 1997, 2000)
type(tup1)# <class 'tuple'>
tup2 = (1, 2, 3, 4, 5 )
tup3 = tup1+tup2
list = list(tup3)# ['Google', 'Runoob', 1997, 2000, 1, 2, 3, 4, 5]
```

#### dictionary字典（map）

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

#### set集合

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

### 函数

#### 动态参数

使用关键词 `*args` 接收任意数量的位置参数，存储为元组（tuple）。

```python
def func(*args):
    print(args) # 元组类型 (22,)   (22,33,99,) ()

# 只能按照位置传参
func(22)
func(22,33)
func(22,33,99)
func()
```

使用关键词 `**kwargs` 接收任意数量的关键字参数，存储为字典（dict）

```python
def func(**kwargs):
    print(kwargs) # 字典类型 {"n1":"猪悟能"}    {"n1":"猪悟能","age":"18","email":"xxxx"}  {}
    
# 只能按关键字传参
func(n1="猪悟能")
func(n1="猪悟能",age=18)
func(n1="猪悟能",age=18,email="xx@live.com")
```

**tips:**

```python
# 1. ** 必须放在 * 的后面
def func1(*args, **kwargs):
    print(args, **kwargs)


# 2. 参数和动态参数混合时，动态参数只能放在最后。
def func2(a1, a2, a3, *args, **kwargs):
    print(a1, a2, a3, args, **kwargs)


# 3. 默认值参数和动态参数可以同时存在
def func3(a1, a2, a3, a4=10, *args, a5=20, **kwargs):
    print(a1, a2, a3, a4, a5, args, kwargs)


func3(11, 22, 33, 44, 55, 66, 77, a5=10, a10=123)
```

#### return

当在函数中`未写返回值` 或 `return` 或 `return None` ，执行函数获取的返回值都是`None`

`return`后面的值如果有逗号，则默认会将返回值转换成元组再返回。

```python
def func():
    return 1,2,3

value = func()
print(value) # (1,2,3)
```

#### 传参
在 Python 中，函数参数的传递方式本质上是 **传递对象的引用（内存地址）**

1. **不可变对象**（int, str, tuple 等）：
    - 函数内修改参数 **不会影响外部变量**
    - 因为修改时会创建新对象
2. **可变对象**（list, dict, set 等）：
    - 函数内 **原地修改**（如 `append`/`update`）会影响外部变量
    - 函数内 **重新赋值**（如 `= []`）不会影响外部变量
3. **本质**：参数传递的是内存地址的副本，但操作方式决定了是否共享内存

### 函数式编程

#### map函数

```python
>>> def f(x):
...     return x * x
...
>>> r = map(f, [1, 2, 3, 4, 5, 6, 7, 8, 9])
>>> list(r)
[1, 4, 9, 16, 25, 36, 49, 64, 81]
```

#### reduce函数

```python
>>> from functools import reduce
>>> def add(x, y):
...     return x + y
...
>>> reduce(add, [1, 3, 5, 7, 9])
25
```

#### 过滤序列filter

```python
def is_odd(n):
    return n % 2 == 1

list(filter(is_odd, [1, 2, 4, 5, 6, 9, 10, 15]))
#删除偶数
```

#### 列表生成式

```python
>>> list(range(1, 11))
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 海象运算符

`py==3.8`后引入的新的赋值表达式运算符，可以在表达式中进行赋值操作，符号为`:=`

```python
# 传统写法
line = input("Enter a line: ")
while line != "quit":
    print(f"You entered: {line}")
    line = input("Enter a line: ")
    
# 使用海象运算符
while (line := input("Enter a line: ")) != "quit":
    print(f"You entered: {line}")
    
# 传统写法
results = []
for x in range(10):
    y = x * x
    if y > 10:
        results.append(y)
        
# 使用海象运算符
results = [y for x in range(10) if (y := x * x) > 10]
```

## 面向对象

```python
class Employee:
    '所有员工的基类'
    empCount = 0  # 成员变量/这个类的值
    name = ""
    salary = 0

    def __init__(self, name, salary):  # 构造函数
        self.name = name#改变的是对象的值
        self.salary = salary
        Employee.empCount += 1#改变的是类的值

    def displayCount(self):  # self表示类的实例，当前实例的地址
        print("Total Employee %d" % Employee.empCount)

    def displayEmployee(self):
        print("Name : ", self.name, ", Salary: ", self.salary)

    def updateEmployee(self, name, salary):
        self.name = name
        self.salary = salary

    def __del__(self): # 在调用时、对象停止引用（程序停止）时调用
        class_name = self.__class__.__name__
        print(class_name, "销毁")
        self.displayEmployee()


john = Employee("John", 1000)
mike = Employee("Mike", 1500)
john.displayEmployee()
john.displayCount()
john.updateEmployee("Alex", 2000)
john.displayEmployee()
```

#### 继承

```py
class people:
    #定义基本属性
    name = ''
    age = 0
    #定义私有属性,私有属性在类外部无法直接进行访问
    __weight = 0
    #定义构造方法
    def __init__(self,n,a,w):
        self.name = n
        self.age = a
        self.__weight = w
    def speak(self):
        print("%s 说: 我 %d 岁。" %(self.name,self.age))
 
#单继承示例
class student(people):
    grade = ''
    def __init__(self,n,a,w,g):
        #调用父类的构函
        people.__init__(self,n,a,w)
        self.grade = g
    #覆写父类的方法
    def speak(self):
        print("%s 说: 我 %d 岁了，我在读 %d 年级"%(self.name,self.age,self.grade))
 
#另一个类，多继承之前的准备
class speaker():
    topic = ''
    name = ''
    def __init__(self,n,t):
        self.name = n
        self.topic = t
    def speak(self):
        print("我叫 %s，我是一个演说家，我演讲的主题是 %s"%(self.name,self.topic))
 
#多继承
class sample(speaker,student):
    a =''
    def __init__(self,n,a,w,g,t):
        student.__init__(self,n,a,w,g)
        speaker.__init__(self,n,t)

    def speak(self):
        print("%s 说: 我 %d 岁了，我在读 %d 年级，我演讲的主题是 %s"%(self.name,self.age,self.grade,self.topic))
test = sample("Tim",25,80,4,"Python")
test.speak()   #方法名同，默认调用的是在括号中参数位置排前父类的方法
super(sample,test).speak()  #用子类对象调用父类已被覆盖的方法
#因为这里是多继承，调用的是speaker因为speaker 类在继承列表中排在student 类之前。你可以通过查看 sample 类的 MRO（方法解析顺序）来验证这一点
print(sample.__mro__)
```

## 类

### 特殊方法/魔法方法

定义了类要如何对待运算符的python内置函数的方法，往往前后有两个下划线，叫作`dunder method`->`double underscore`

### import

导入文件时的查找是根据执行目录`sys.path`来的

> 假设我们A导入B，在B导入C，BC在同目录下，运行A，当前目录是A所在的目录，虽然BC是同级，但无法直接导入

导入时的`*`可用`__all__`来定义

```python
from packageA import *

#packageA/__init__.py
__all__=['X','moduleA']
```



### 相对导入

1. **单个点 (`.`)**：表示当前包。
2. **两个点 (`..`)**：表示当前包的父包。
3. **三个点 (`...`)**：表示当前包的父包的父包，以此类推。

例如，假设有以下目录结构：

```markdown
my_package/
    __init__.py
    test1.py
    sub_package/
        __init__.py
        test2.py
```

在 `test2.py` 中，你可以使用相对导入来导入 `test1.py` 中的函数：

```python
from ..test1 import devide
```

为了使相对导入正常工作，请确保：

1. 你的代码在包的上下文中运行。
2. 使用 `-m` 选项从包的根目录运行 Python 解释器。

### `__init__.py`

- 包的初始化

- 管理包的接口

    ```python
    from packageA import *
    
    #packageA/__init__.py
    __all__=['X','moduleA']
    ```

    

- 管理包的信息
    ```python
    __version__='1.0.0'
    __outhor__='cwdpsky'
    ```


## NumPy

安装

`pip install numpy`或`conda install numpy`

### n维数组对象`ndarray`

创建`ndarray`对象,只需调用 NumPy 的 array 函数即可：

```python
numpy.array(object, dtype = None, copy = True, order = None, subok = False, ndmin = 0)
```

**参数说明：**

| 名称 | 描述 |
| --- | --- |
| object | 数组或嵌套的数列 |
| dtype | 数组元素的数据类型，可选 |
| copy | 对象是否需要复制，可选 |
| order | 创建数组的样式，C为行方向，F为列方向，A为任意方向（默认） |
| subok | 默认返回一个与基类类型一致的数组 |
| ndmin | 指定生成数组的最小维度 |

#### 实例

接下来可以通过以下实例帮助我们更好的理解。

实例 1
```python
import numpy as np 
a = np.array([1,2,3])  
print (a)
```
输出结果如下：
```bash
[1 2 3]
```
实例 2
```python
# 多于一个维度  
import numpy as np 
a = np.array([[1,  2],  [3,  4]])  
print (a)
```
输出结果如下：

```bash
[[1  2] 
 [3  4]]
```

实例 3

```python
# 最小维度  
import numpy as np 
a = np.array([1, 2, 3, 4, 5], ndmin =  2)  
print (a)
```

输出如下(注意这里有两层中括号，意味着这是一个二维数组)：
```bash
[[1 2 3 4 5]]
```

实例 4

```python
# dtype 参数  
import numpy as np 
a = np.array([1,  2,  3], dtype = complex)  #复数
print (a)
```

输出结果如下：

```bash
[1.+0.j 2.+0.j 3.+0.j]
```

#### 数组属性

&nbsp;&nbsp;&nbsp;&nbsp;NumPy 数组的维数称为秩（rank），秩就是轴的数量，即数组的维度，一维数组的秩为 1，二维数组的秩为 2，以此类推。

&nbsp;&nbsp;&nbsp;&nbsp;在 NumPy中，每一个线性的数组称为是一个轴（axis），也就是维度（dimensions）。比如说，二维数组相当于是两个一维数组，其中第一个一维数组中每个元素又是一个一维数组。所以一维数组就是 NumPy 中的轴（axis），第一个轴相当于是底层数组，第二个轴是底层数组里的数组。而轴的数量——秩，就是数组的维数。

&nbsp;&nbsp;&nbsp;&nbsp;很多时候可以声明 axis。axis=0，表示沿着第 0 轴进行操作，即对***每一列***进行操作；axis=1，表示沿着第1轴进行操作，即对***每一行***进行操作。

&nbsp;&nbsp;&nbsp;&nbsp;NumPy 的数组中比较重要 ndarray 对象属性有：

| 属性               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| `ndarray.ndim`     | 数组的秩（rank），即数组的维度数量或轴的数量。               |
| `ndarray.shape`    | 数组的维度，表示数组在每个轴上的大小。对于二维数组（矩阵），表示其行数和列数。 |
| `ndarray.size`     | 数组中元素的总个数，等于 `ndarray.shape` 中各个轴上大小的乘积。 |
| `ndarray.dtype`    | 数组中元素的数据类型。                                       |
| `ndarray.itemsize` | 数组中每个元素的大小，以字节为单位。                         |
| `ndarray.flags`    | 包含有关内存布局的信息，如是否为 C 或 Fortran 连续存储，是否为只读等。 |
| `ndarray.real`     | 数组中每个元素的实部（如果元素类型为复数）。                 |
| `ndarray.imag`     | 数组中每个元素的虚部（如果元素类型为复数）。                 |
| `ndarray.data`     | 实际存储数组元素的缓冲区，一般通过索引访问元素，不直接使用该属性。 |

#### ndarray.ndim

ndarray.ndim 用于获取数组的维度数量（即数组的轴数）。


```python
import numpy as np 
 
a = np.arange(24)  
print (a.ndim)             # a 现只有一个维度
# 现在调整其大小
b = a.reshape(2,4,3)  # b 现在拥有三个维度
print (b.ndim)
```

输出结果为：

```
1
3
```

#### ndarray.shape

ndarray.shape 表示数组的维度，返回一个元组，这个元组的长度就是维度的数目，即 ndim 属性(秩)。比如，一个二维数组，其维度表示"行数"和"列数"。

ndarray.shape 也可以用于调整数组大小。

```python
import numpy as np  
 
a = np.array([[1,2,3],[4,5,6]])  
print (a.shape)
# 现在调整数组的形状
a.shape =  (3,2)  
print (a)
```

输出结果为：

```
(2, 3)
[[1 2]
 [3 4]
 [5 6]]
```

NumPy 也提供了 reshape 函数来调整数组大小

```python
import numpy as np 
 
a = np.array([[1,2,3],[4,5,6]]) 
b = a.reshape(3,2)  
print (b)
```

输出结果为：

```
[[1 2]
 [3 4]
 [5 6]]
```

### NumPy创建数组

#### numpy.empty

```python
numpy.empty(shape, dtype = float, order = 'C')
```

在使用 numpy.empty 创建数组时，数组中的元素是未初始化的内存值，既不是 0，也不保证是任何特定值，而是取决于当时内存的残留数据（可能是随机值、垃圾值或之前程序残留的数据）。

参数说明：

| 参数 | 描述 |
| --- | --- |
| shape | 数组形状 |
| dtype | 数据类型，可选 |
| order | 有"C"和"F"两个选项,分别代表，行优先和列优先，在计算机内存中的存储元素的顺序。 |

```python
import numpy as np 
x = np.empty([3,2], dtype = int) 
print (x)
```
输出结果为：

```bash
[[0 0]
 [0 0]
 [0 0]]
```

#### numpy.zeros

创建指定大小的数组，数组元素以 0 来填充：

```python
numpy.zeros(shape, dtype = float, order = 'C')
```

参数说明：

| 参数 | 描述 |
| --- | --- |
| shape | 数组形状 |
| dtype | 数据类型，可选 |
| order | 'C' 用于 C 的行数组，或者 'F' 用于 FORTRAN 的列数组 |

```python
import numpy as np
 
# 默认为浮点数
x = np.zeros(5) 
print(x)
 
# 设置类型为整数
y = np.zeros((5), dtype = int) 
print(y)
 
# 自定义类型。(2,3)指定矩阵的尺寸，dtype中的x，y指定矩阵中的每个元素包含x,y以及它们的数据类型。
z = np.zeros((2,2), dtype = [('x', 'int'), ('y', 'float')])  
print(z)
```

输出结果为：

```
[0. 0. 0. 0. 0.]
[0 0 0 0 0]
[[(0, 0.) (0, 0.) (0, 0.)]
 [(0, 0.) (0, 0.) (0, 0.)]]
```

#### numpy.ones

创建指定形状的数组，数组元素以 1 来填充：

```
numpy.ones(shape, dtype = None, order = 'C')
```

参数说明：

| 参数 | 描述 |
| --- | --- |
| shape | 数组形状 |
| dtype | 数据类型，可选 |
| order | 'C' 用于 C 的行数组，或者 'F' 用于 FORTRAN 的列数组 |

```python
import numpy as np
 
# 默认为浮点数
x = np.ones(5) 
print(x)
 
# 自定义类型
x = np.ones([2,2], dtype = int)
print(x)
```

输出结果为：

```
[1. 1. 1. 1. 1.]
[[1 1]
 [1 1]]
```

#### numpy.zeros\_like

numpy.zeros\_like 用于创建一个与给定数组具有相同形状的数组，数组元素以 0 来填充。

numpy.zeros 和 numpy.zeros\_like 都是用于创建一个指定形状的数组，其中所有元素都是 0。

它们之间的区别在于：numpy.zeros 可以直接指定要创建的数组的形状，而 numpy.zeros\_like 则是创建一个与给定数组具有相同形状的数组。

```python
numpy.zeros_like(a, dtype=None, order='K', subok=True, shape=None)
```

参数说明：

| 参数 | 描述 |
| --- | --- |
| a | 给定要创建相同形状的数组 |
| dtype | 创建的数组的数据类型 |
| order | 数组在内存中的存储顺序，可选值为 'C'（按行优先）或 'F'（按列优先），默认为 'K'（保留输入数组的存储顺序） |
| subok | 是否允许返回子类，如果为 True，则返回一个子类对象，否则返回一个与 a 数组具有相同数据类型和存储顺序的数组 |
| shape | 创建的数组的形状，如果不指定，则默认为 a 数组的形状。 |

创建一个与 arr 形状相同的，所有元素都为 0 的数组：

```python
import numpy as np
 
# 创建一个 3x3 的二维数组
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
 
# 创建一个与 arr 形状相同的，所有元素都为 0 的数组
zeros_arr = np.zeros_like(arr)
print(zeros_arr)

```

输出结果为：

```
[[0 0 0]
 [0 0 0]
 [0 0 0]]
```

#### numpy.ones\_like

numpy.ones\_like 用于创建一个与给定数组具有相同形状的数组，数组元素以 1 来填充。

numpy.ones 和 numpy.ones\_like 都是用于创建一个指定形状的数组，其中所有元素都是 1。

它们之间的区别在于：numpy.ones 可以直接指定要创建的数组的形状，而 numpy.ones\_like 则是创建一个与给定数组具有相同形状的数组。

```
numpy.ones_like(a, dtype=None, order='K', subok=True, shape=None)
```

参数说明：

| 参数 | 描述 |
| --- | --- |
| a | 给定要创建相同形状的数组 |
| dtype | 创建的数组的数据类型 |
| order | 数组在内存中的存储顺序，可选值为 'C'（按行优先）或 'F'（按列优先），默认为 'K'（保留输入数组的存储顺序） |
| subok | 是否允许返回子类，如果为 True，则返回一个子类对象，否则返回一个与 a 数组具有相同数据类型和存储顺序的数组 |
| shape | 创建的数组的形状，如果不指定，则默认为 a 数组的形状。 |

创建一个与 arr 形状相同的，所有元素都为 1 的数组：

```python
import numpy as np
 
# 创建一个 3x3 的二维数组
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
 
# 创建一个与 arr 形状相同的，所有元素都为 1 的数组
ones_arr = np.ones_like(arr)
print(ones_arr)

```

输出结果为：

```
[[1 1 1]
 [1 1 1]
 [1 1 1]]
```

## pandas

pandas是基于NumPy的数据分析库，提供了高性能、易用的数据结构和数据分析工具。

安装：`pip install pandas` 或 `conda install pandas`

### 数据结构

#### Series（一维数据）

Series是一种类似于一维数组的对象，由数据和索引组成。

```python
import pandas as pd
import numpy as np

# 创建Series
s1 = pd.Series([1, 3, 5, np.nan, 6, 8])
print(s1)

# 指定索引
s2 = pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])
print(s2)

# 从字典创建
data = {'a': 1, 'b': 2, 'c': 3}
s3 = pd.Series(data)
print(s3)
```

#### DataFrame（二维数据）

DataFrame是二维的表格型数据结构，有行索引和列索引。

```python
# 从字典创建
data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Paris', 'London']
}
df = pd.DataFrame(data)
print(df)

# 从NumPy数组创建
dates = pd.date_range('20240101', periods=6)
df2 = pd.DataFrame(np.random.randn(6, 4), index=dates, columns=list('ABCD'))
print(df2)
```

### 数据操作

#### 数据查看

```python
# 查看前几行
df.head()  # 默认前5行
df.head(3)  # 前3行

# 查看后几行
df.tail()

# 查看数据信息
df.info()

# 描述性统计
df.describe()

# 查看形状
df.shape

# 查看列名
df.columns

# 查看索引
df.index
```

#### 数据选择

```python
# 选择列
df['Name']  # 单列
df[['Name', 'Age']]  # 多列

# 选择行
df.loc[0]  # 按标签选择
df.iloc[0]  # 按位置选择

# 切片
df[0:2]  # 前2行
df.loc[0:2, 'Name':'Age']  # 行列切片

# 条件筛选
df[df['Age'] > 25]
df[df['City'].isin(['New York', 'Paris'])]
```

#### 数据修改

```python
# 添加新列
df['Salary'] = [50000, 60000, 70000]

# 修改数据
df.loc[0, 'Age'] = 26

# 删除列
df.drop('Salary', axis=1, inplace=True)

# 删除行
df.drop(0, axis=0, inplace=True)
```

### 数据处理

#### 处理缺失值

```python
# 检查缺失值
df.isnull()
df.isna()

# 删除缺失值
df.dropna()  # 删除包含缺失值的行
df.dropna(axis=1)  # 删除包含缺失值的列

# 填充缺失值
df.fillna(0)  # 用0填充
df.fillna(method='ffill')  # 前向填充
df.fillna(df.mean())  # 用均值填充
```

#### 数据分组和聚合

```python
# 分组
grouped = df.groupby('City')

# 聚合操作
grouped.mean()
grouped.sum()
grouped.count()

# 多重聚合
df.groupby('City').agg({'Age': 'mean', 'Salary': 'sum'})
```

#### 数据合并

```python
# 连接
pd.concat([df1, df2])  # 垂直连接
pd.concat([df1, df2], axis=1)  # 水平连接

# 合并
pd.merge(df1, df2, on='key')  # 内连接
pd.merge(df1, df2, on='key', how='left')  # 左连接
```

### 文件读写

```python
# 读取文件
df = pd.read_csv('data.csv')
df = pd.read_excel('data.xlsx')
df = pd.read_json('data.json')

# 写入文件
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', index=False)
df.to_json('output.json')
```

## Scikit-Learn

Scikit-Learn是Python中最流行的机器学习库，提供了各种监督和无监督学习算法。

安装：`pip install scikit-learn` 或 `conda install scikit-learn`

### 基本工作流程

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import pandas as pd
import numpy as np

# 1. 加载数据
# 这里使用示例数据
from sklearn.datasets import load_boston
data = load_boston()
X, y = data.data, data.target

# 2. 数据划分
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. 数据预处理
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 4. 模型训练
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# 5. 预测
y_pred = model.predict(X_test_scaled)

# 6. 评估
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f'MSE: {mse}, R²: {r2}')
```

### 常见算法

#### 线性回归

```python
from sklearn.linear_model import LinearRegression, Ridge, Lasso

# 普通线性回归
lr = LinearRegression()
lr.fit(X_train, y_train)

# 岭回归（L2正则化）
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)

# Lasso回归（L1正则化）
lasso = Lasso(alpha=1.0)
lasso.fit(X_train, y_train)
```

#### 逻辑回归

```python
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris

# 加载分类数据
iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 逻辑回归
log_reg = LogisticRegression()
log_reg.fit(X_train, y_train)
y_pred = log_reg.predict(X_test)

# 分类评估
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
print(f'Accuracy: {accuracy_score(y_test, y_pred)}')
print(classification_report(y_test, y_pred))
```

#### 决策树

```python
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor

# 分类树
dt_clf = DecisionTreeClassifier(max_depth=5, random_state=42)
dt_clf.fit(X_train, y_train)

# 回归树
dt_reg = DecisionTreeRegressor(max_depth=5, random_state=42)
dt_reg.fit(X_train, y_train)
```

#### 随机森林

```python
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

# 随机森林分类
rf_clf = RandomForestClassifier(n_estimators=100, random_state=42)
rf_clf.fit(X_train, y_train)

# 随机森林回归
rf_reg = RandomForestRegressor(n_estimators=100, random_state=42)
rf_reg.fit(X_train, y_train)

# 特征重要性
feature_importance = rf_clf.feature_importances_
```

#### 支持向量机

```python
from sklearn.svm import SVC, SVR

# SVM分类
svm_clf = SVC(kernel='rbf', C=1.0)
svm_clf.fit(X_train, y_train)

# SVM回归
svm_reg = SVR(kernel='rbf', C=1.0)
svm_reg.fit(X_train, y_train)
```

#### K-均值聚类

```python
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# K-均值聚类
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(X)

# 聚类中心
centers = kmeans.cluster_centers_
```

### 数据预处理

#### 特征缩放

```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

# 标准化（零均值，单位方差）
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 最小-最大缩放
minmax_scaler = MinMaxScaler()
X_minmax = minmax_scaler.fit_transform(X)

# 鲁棒缩放
robust_scaler = RobustScaler()
X_robust = robust_scaler.fit_transform(X)
```

#### 特征编码

```python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

# 标签编码
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# 独热编码
from sklearn.preprocessing import get_dummies
df_encoded = pd.get_dummies(df, columns=['category_column'])
```

### 模型评估

#### 交叉验证

```python
from sklearn.model_selection import cross_val_score, KFold

# K折交叉验证
scores = cross_val_score(model, X, y, cv=5)
print(f'CV scores: {scores}')
print(f'Mean CV score: {scores.mean()} (+/- {scores.std() * 2})')

# 自定义交叉验证
kf = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=kf)
```

#### 网格搜索

```python
from sklearn.model_selection import GridSearchCV

# 参数网格
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 7],
    'min_samples_split': [2, 5, 10]
}

# 网格搜索
grid_search = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)
grid_search.fit(X_train, y_train)

# 最佳参数
print(f'Best parameters: {grid_search.best_params_}')
print(f'Best score: {grid_search.best_score_}')
```

#### 学习曲线

```python
from sklearn.model_selection import learning_curve

# 绘制学习曲线
train_sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5, train_sizes=np.linspace(0.1, 1.0, 10)
)

# 绘图
plt.figure(figsize=(10, 6))
plt.plot(train_sizes, train_scores.mean(axis=1), label='Training score')
plt.plot(train_sizes, val_scores.mean(axis=1), label='Validation score')
plt.xlabel('Training Size')
plt.ylabel('Score')
plt.legend()
plt.show()
```

### 管道（Pipeline）

```python
from sklearn.pipeline import Pipeline

# 创建管道
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier())
])

# 训练管道
pipe.fit(X_train, y_train)

# 预测
y_pred = pipe.predict(X_test)

# 在网格搜索中使用管道
param_grid = {
    'classifier__n_estimators': [50, 100],
    'classifier__max_depth': [3, 5]
}

grid_search = GridSearchCV(pipe, param_grid, cv=5)
grid_search.fit(X_train, y_train)
```

## 机器学习

### 分类

|          | 肯定类别       | 否定类别       |
| -------- | -------------- | -------------- |
| 阳性判断 | 真阳性记录数TP | 假阳性记录数FP |
| 阴性判断 | 假阴性记录数FN | 真阴性记录数TN |

精确率：precision=$\frac{TP}{TP+FP}$,表示预测为正的样本中有多少是真正的正的样本

召回率：recall=$\frac{TP}{TP+FN}$，表示预测为正且正确的样本占预测为正的比例

### 支持向量机（SVM）