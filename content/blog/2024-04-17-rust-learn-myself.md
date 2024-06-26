---
external: false
title: Rust基础知识-类型系统
description: >-
  总结学习到的 Rust 知识, 类型系统
date: 2024-04-17
ogImagePath: /images/normal/mac.jpg
category: 软件开发
tags:
  - Rust
  - basic
draft: true
---


# 目录
- [目录](#目录)
- [引言](#引言)
- [数据类型](#数据类型)
  - [原生类型](#原生类型)
  - [组合类型](#组合类型)
  - [类型推导](#类型推导)
- [泛型](#泛型)
  - [数据结构泛型](#数据结构泛型)
  - [函数泛型](#函数泛型)
  - [特设多态](#特设多态)
  - [子类型多态](#子类型多态)


# 引言

学习计算机的都知道, 计算机的一切都是由 `0` 和 `1` 构成的, 无非是如何理解 `0` 和 `1` 罢了。所以对于内存地址中的某一串 01, 我们需要明白他应该被解读为什么类型。

类型系统因此而存在于所有的语言之中, **是对类型进行定义、检查、处理的系统**。

其中, 按照变量是否在运行时可变可以分为强类型或弱类型语言。

按照变量类型是运行时检查 or 编译时检查可以分为动态类型语言或静态类型语言。

Rust 在运行时不可变, 在编译时进行类型检查, 因此属于强语言、静态类型语言。

但是与之前的语言不同, Rust 存在过多的类型, 比如仅数字就可以随便列举 `u8`, `u32`, `i32`, `f64`。

# 数据类型

与我之前所遇到的所有语言相比, Rust 的类型系统更加的复杂, 不仅仅体现在他拥有过多的原生类型上, 也体现在他对类型的组合上。下面分别来说。

## 原生类型

原生类型主要包含以下:
 - 字符
 - 整数
 - 浮点数
 - 布尔值
 - 数组
 - 元组
 - 切片
 - 指针
 - 引用
 - 函数

原生类型大多数是长度固定的, 并且生存在栈上的, 因此这里面很多也无需进行借用。 当然借用(或引用) 本身也是一种原生类型。

而字符串 `String` 和动态数组 `vec` 我都没有放入原生类型, 因为我觉得更像是一种封装好的能力, 而非基础类型(就像 Java 的 `String` 和 `ArrayList` 也不能说是基础类型一样)。 这些长度容易动态变化的类型其大部分都会被放在堆中, 随着调用的生命周期结束而进行释放。

## 组合类型

组合类型主要是通过 `struct`  和 `enum` 进行组合得到的一个结构, 与其他语言的类、结构体并无不同。

而 Rust 中组合类型比较有趣的是在泛型情况下的组合, 这个稍晚一点再详细谈。

## 类型推导

类型推导是一个好语法糖, 受够了 Java8 那又臭又长的命名和声明, 我觉得使用 `var` 和 `let` 来进行类型推导真的是一个好文明。

而 Rust 不仅仅可以进行类型推到一般的常见类型, 还可以根据上下文推到泛型类型, 例如使用 `Vec` 或 `HashMap` 这样的泛型类时, 可以根据上下文插入的内容来动态的推导 该泛型的具体类型, 例如:
```rust
use std::collection::BTreeMap;

fn main(){
  let mut map = BTreeMap::new();
  map.insert("aa", "bb");
  println!("map:{:?}", map);
}
```

# 泛型

泛型是一个很常见的情况, 由于不知道运行时的具体类型, 因此需要根据情况而进行类型变化。 

在 Java 的时候, 泛型于我而言的价值是, 可以编写一些抽象的代码--对不同类型的对象进行相同的操作或者共同的操作。

在 Rust 中, 再一次学习泛型, 有一点点新的感觉, 虽然 `trait` 就和 `interface` 一样, 但是 `struct` 到底还是与 `class` 不同。

所以 Rust 对于使用泛型也有所不同。

## 数据结构泛型

在 Java 中, 



## 函数泛型


## 特设多态


## 子类型多态

