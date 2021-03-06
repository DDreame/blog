---
title: 线性回归与Softmax回归
---

>思路：是什么-->怎么做-->鉴定效果-->相关代码

## 线性回归

### 一句话描述

我们在已知部分X 和部分 Y 的情况下，求得一个 X 关于 Y 的方程，并且根据这个方程，然后使用其他已知的 X 来求解不曾知道的 Y。

### 简单讲讲

从小学学方程的时候，我们就能用 X 和 Y 的关系，来构建简单的方程，并且依据这个方程，代入任意的 X 就可以求得 任意的 Y。 

而与小学解方程不同的地方在于，我们在这里要处理的数据量太多，数据项太多，太杂，小学的数字是被构思出来的具有完美解的方案，而线性回归所求的数据是未知的
没有标准解的答案，所以只是预测。

### 百科定义

摘自百度百科：线性回归是利用数理统计中回归分析，来确定两种或两种以上变量间相互依赖的定量关系的一种统计分析方法，运用十分广泛。其表达形式为 `y = w'x+
e`， e 为误差服从均值为0的正态分布。

### 模型思路

以入门的房价预测进行举例，线性回归是期望从已经有的房屋成交数据中提取信息，挖掘公式，然后预测尚未售出的房屋价格。

从 `y = w'x + e`出发，其中 Y 为所求解（还未出售的房屋的最终价格）， X 为自变量，数据已知（房屋位置、面积、房间数量、交通情况等），关键在让计算机
自动求得 `W` 和 `e` 两个参数。要注意的是，这里的 X 并不是只有一个，位置、面积、交通情况都可以作为X，数量众多，至于哪个指标更重要，也是在做机器学习
的时候应该考虑的问题。

对于上面公式中的每一个 X 都会有一个对应的权重 `W` 需要考虑。假定有 N 个参数，那么最终的公式应该是 `y = w1'x1 + w2'x2 + w3'x3 + ... + wn'xn + e`。

这时，输入为 N 个 X， 输出为 1 个 Y 。


### 损失函数

>Todo 线性回归的损失函数 均方损失

### 从线性回归看机器学习

>Todo 构建训练模型 损失模型 训练 判断损失 预测
> 
> 机器学习就是在填充未知值的过程
> 


## Softmax

>并非预测问题，而是分类问题





