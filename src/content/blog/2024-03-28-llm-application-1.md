---
title: 大模型应用开发-Part1
description: >-
  大模型应用案例分析及开发学习
pubDate: 2024-03-27T09:56:43Z
heroImage: ../../assets/images/normal/mac.jpg
category: 软件开发
tags:
  - 大模型
  - 应用开发
  - 基础
---

记录学习大模型的应用开发系列

# 索引

- [索引](#索引)
- [模型训练](#模型训练)
- [应用Case分析](#应用case分析)
- [开源项目](#开源项目)

# 模型训练

- 数据 - 关键
- 模型设计(Transformer)
- 模型训练(微调、对齐、DeepSpeed)
- Benchmark(模型评测)
- Memory(知识图谱、向量数据)
- 搜索技术(向量数据库, Query的优化)
- RAG

# 应用Case分析

- 具体场景: 金融科技希望大模型制作 AI 助手来协助或替代原有的智能客服
- 方案:

  - 基于已有的模型, 如GPT4
  - 训练私有模型

- 基于 GPT4 的方案:
  - 1.  APP <--- Prompt ---> GPT4
  - 2.  APP <--- Prompt(with 外部数据) ---> GPT4
  - 3.  Aget <---- GPT4
- 训练私有模型:
  - 1.  Pre-train
    - 1.  模型设计
      - 1.  参数量 -- 1B? 14B? 100B?
      - 2.  Tokenizer 词库
      - 3.  arch
    - 2.  确定应用场景 => 确定模型的能力
    - 3.  Benchmark
    - 4.  数据设计
      - 中文数据、英文数据
      - 数据内容
        - 垂直领域
          - 金融数据
          - 保险数据
        - 通用能力
          - 必需的
      - 数据量( 多少 T 的 token)
        - 100G的数据 -> 大概 10B token(理想情况)
      - 数据配比
        - 垂直 vs 通用
        - 每个数据源的配比
    - 5.  数据清洗
      - 重复数据清理
      - 符号数据
      - 构建语料库
    - 6.  训练
      - 最低要求
        - 100卡以上
        - 2-3周
        - 100B数据
        - 预训练
  - 2.  微调 - SFT
    - 基础对话能力
    - 场景应对能力
    - 多轮对话和单轮对话数据
    - 技术
      - Lora
  - 3.  Alignment(对齐) <==> Human Pu
    - 目的
      - 规范模型
      - 更安全
    - 方法
      - DPO - 旧, 困难
      - PPO - 新, 简单
  - 4.  模型完成, 软件开发
    - 文件, 构建向量数据库
    - Agent, 代理

# 开源项目

[Awesome Chinese LLM](https://github.com/HqWu-HITCS/Awesome-Chinese-LLM)
