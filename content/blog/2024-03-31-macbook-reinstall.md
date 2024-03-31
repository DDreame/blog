---
external: false
title: 3月31系统重装备忘录
description: >-
  由于电脑存在太多奇怪的软件和环境, 导致我的某些软件无法运行,因此选择了直接重装系统。在这记录一下安装的所有东西用以防止后续忘记和混乱。
date: 2024-03-21
ogImagePath: /images/normal/mac.jpg
category: 工具知识
tags:
  - MacOS
  - 系统环境
  - 备忘录
draft: true
---


# 目录

- [目录](#目录)
- [基础软件](#基础软件)
- [编程环境](#编程环境)
- [VsCode 插件](#vscode-插件)

# 基础软件

用于开发和管理环境的一些基础软件:
  - [Brew](https://brew.sh/)
    - /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  - [DevToys](https://github.com/DevToys-app/DevToysMac)
    - brew install --cask devtoys
  - [Wezterm](https://github.com/wez/wezterm)
    - brew install --cask wezterm
  - [Warp](https://www.warp.dev/)
    - brew install --cask warp
  - [Vscode](https://code.visualstudio.com/)
  - [Chrome浏览器](https://www.google.cn/chrome/)
  - [Git](https://git-scm.com/downloads)
    - brew install git
    - [配置 Github 的 ssh](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
  - [TailScale](https://tailscale.com/)
  - 
  

# 编程环境

重装系统之后, 编程内容也发生了变化, 从 Java 转向了 Rust, 决定主要写 Rust、 Python、 Swift 三种语言, 因此环境主要如下:
  - Rust
    - `curl https://sh.rustup.rs -sSf | sh`
    - path: $HOME$/.cargo/
    - `cargo install cargo-generate`
    - `cargo install --locked cargo-deny`
    - `cargo install typos-cli`
    - `cargo install git-cliff`
    - `cargo install --locked cargo-nextest`
  - Python
    - [miniconda] 
    - path: ~/miniconda
  - Swift
    - Xcode
  - Astro
    - [Node.js](https://nodejs.org/en/)
    - path: /usr/local/bin/npm
    - path: /usr/local/bin/node


# VsCode 插件
列举目前 VsCode 内使用的插件和负责的功能:
 - 基础
   - GitLens
   - GitHub Copilot
   - Prettier
   - REST client
   - TODO Highlight
   - YAML
   - Error Lens
 - Rust
   - crates
   - rust-analyzer
   - Rust Test lens
   - Rust Test Explorer
   - Even Better TOML
 - Markdown
   - Mardown All in One
 - Astro
   - Astro


