---
external: false
title: Rust基础知识-概览
description: >-
  总结学习到的 Rsut 的基础知识，包括基本数据类型、控制流、函数与模块等
date: 2024-04-02
ogImagePath: /images/normal/mac.jpg
category: 软件开发
tags:
  - Rust
  - basic
  - summary
---

# 目录

- [目录](#目录)
- [基本数据类型](#基本数据类型)
- [复合类型](#复合类型)
- [分支语句](#分支语句)
- [循环语句](#循环语句)
- [函数与闭包](#函数与闭包)
- [模块](#模块)

# 基本数据类型

在 rust 中, 数据类型有以下基础内容:
数值类型
 - 数值类型与大部分语言不同, 需要区分具体的位数, 比如 `i8` 与 `f32` 这样的. 
字符串类型
 - String 类型作为一个高级类型, 不支持使用下标访问具体的值. 这是由于 rust 使用 Unicode 编码, String 采用 UTF-8 进行编码, UTF-8 属于变长编码, 自然就不能支持下标访问. 
 - rust 除了使用反斜杠 `\` 进行转义之, 还支持使用 `\x` `\u{}` 进行进阶的转换, 例如 `\x7f` 与 `\u{0065}` 分别转为等值的 ASCII 字符和 Unicode字符。
 - rust 可以使用 `r""`  或者 `r#""#` 来禁止字符串转义 
 - 字节串是 `b""` 包裹起来的字符串,是一个字节静态数组
数组
 - 静态数组要求长度固定并且要求提前说明, 例如 `[i32:5]`
 - 动态数组是 Vec 类型, 可以动态的扩大缩小, 例如 `let v: Vec<i32> = Vec::new()`
哈希表
 - `let mut x = HashMap::new();`

# 复合类型

复合类型可以包含多种基础类型, 是一种将类型进行有效组织的方式, 包含元, 结构体, 枚举等。

```rust
// 元组
fn main(){
    let t:(i32, f64, u8) = (500, 6.4, 1);
}

// 结构体
struct User{
    active: bool,
    username: String,
    email: String,
    age: u64
}
// 枚举
enum IpAddrKind{
    V4,
    V6
}

let four = IpAddrKind::V4;
```
枚举与结构体不同, 结构体是里面所有的类型同时发挥作用, 而枚举是其中一个变体发挥作用来产生一个具体的实例。  

**枚举是一个载体, 可以携带任何类型**

# 分支语句

Rust 的 `if else` 并不需要括号来包裹表达式, 同时 `if else` 可以进行返回值, 例如:

```rust
// 代码块结尾的最后一句不加分号, 表示把值返回回去
fn main(){
    let x = 1;
    let y = if x == 1{
        100
    } else{
        200
    };
    println!("y is {}", y)
}
```

# 循环语句

Rust 中存在三种循环: `loop`, `while`, `for`。

`loop` 用于无条件的无限循环
```rust
fn main(){
    let mut cnt = 0;

    let result = loop{
        cnt += 1;
        if cnt == 5{
            // 使用 break 跳出循环, 同时带一个返回值
            break cnt * 2;
        }
    }
}
```

`while` 与 `if else` 一样， 表达式不需要 () 进行包裹
```rust
fn main(){
    let mut number = 3;
    while number != 0{
        number -= 1;
    }
}
```

`for` 一般用于迭代器遍历
```rust
fn main(){
    let a = [10, 20, 30, 40, 50];
    for element in a{
        println!("the value is:{element}");
    }
    // 左闭右开
    for number in 1..4{
        println!("{number}");
    }

    // 左闭右闭
    for number in 1..=4{
        println!("{number}");
    }

    // 反向
    for number in (1..4).rev(){
        println!("{number}");
    }

    for ch in 'a'..='z' {
        println!("{ch}");
    }
}
```

# 函数与闭包

rust 中函数的关键词是 `fn`, 类似 kotlin 那样参数类型后置, 需要注意的是参数所有权的转移和传递。

```rust
fn print_a(a: i32){
    println!("{a}")
}
```


而闭包则是另外一种风格, 在代码中使用 `||` 来定义, 而不是 `fn`, 示例如下:
```rust
let add_one_v1 = |x: u32| -> u32 {x + 1};

let add_one_v2 = |x| {x + 1};

let add_one_v3 = |x| x + 1;
```
由于闭包写在某个函数中, 而非类内, 所以闭包可以捕获函数内的局部变量进行使用。

# 模块

rust 中模块为 mod, 引入模块的方式是 `mod module`

在某个模块中, 可能存在固定文件名 `mod.rs` 作为模块入口, 类似于 python 的 `init.py`

