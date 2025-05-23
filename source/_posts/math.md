---
title: 重要记录
date: 2025-05-22 14:56:04
categories:
  - note
  - 数一
  - 高等数学
tags: [高等数学]
index_img:
banner_img: /images/壁纸.jpg
---

![3](D:\数学\孔祥仁-高等数学\第九章多元函数微分法及其应用\p128三3-全微分3\3.jpg)

####  变限积分求导

**一、基本形式**
若 `f(x)` 连续，$F(x) = ∫[a,x] f(t) dt$，则：
$$
\frac{d}{dx}F(x) = f(x)
$$
**几何意义**：积分变限函数 F(x)*F*(*x*) 的导数等于被积函数 f(x)*f*(*x*) 在上限处的值。

**二、一般形式的变限积分求导**

若积分上下限均为函数 $u(x)$ 和 $v(x)$，且被积函数含参变量 $t$，即：
$$
F(x)=∫ _{v(x)}^{u(x)}​f(t,x)dt
$$
其导数为：
$$
\frac{d}{dx}F(x) = f(u(x),x)u'(x) - f(v(x),x)v'(x) + ∫[v(x),u(x)] \frac{∂}{∂x}f(t,x) dt
$$
**三、分类公式与示例**

**1.下限为函数，上限为常数**
$$
\frac{d}{dx} ∫^{u(x)}_a f(t) dt = f(u(x))·u'(x)
$$
**2.下限为函数，上限为常数**
$$
\frac{d}{dx} ∫_{v(x)}^b f(t) dt = -f(v(x))·v'(x)
$$
**3.上下限均为函数**
$$
\frac{d}{dx} ∫_{v(x)}^{u(x)} f(t) dt = f(u(x))u'(x) - f(v(x))v'(x)
$$

#### 二元函数极值

必要条件：设$z=f(x,y)$在点$(x_0,y_0)$处一阶偏导数存在且取极值，则$f'_x(x_0,y_0)=0,f'_y(x_0,y_0)=0$

![3](D:\数学\孔祥仁-高等数学\第九章多元函数微分法及其应用\p143八1_极值及求法\3.png)

#### 拉普拉斯定理

$\mu=\frac{1}{\sqrt{x^2+y^2+z^2}}$，则$\frac{\partial^2 \mu}{\partial x^2}+\frac{\partial^2 \mu}{\partial y^2}+\frac{\partial^2 \mu}{\partial z^2}=0$

#### 多元函数全微分

$z=f(x,y),dz=\frac{\partial z}{\partial x}dx+\frac{\partial z}{\partial y}dy$

#### 多元函数复合求导

$f(x) = 
\begin{cases}
u = \phi(t)\\
v = \psi(t)\\
\end{cases}$，$z=f(u,v)$,则$\frac{\partial z}{\partial t}=\frac{\partial z}{\partial u}\cdot \frac{\partial u}{\partial t}+\frac{\partial z}{\partial v}\cdot \frac{\partial v}{\partial t}$



