---
external: false
title: 大模型应用开发-Part1
description: >-
  大模型应用案例分析及开发学习
date: 2024-03-28
ogImagePath: /images/normal/mac.jpg
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
- [应用场景](#应用场景)
- [Openai API](#openai-api)

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

# 应用场景

一些常见的应用场景和示例的 prompt。

- ## 传统的自然语言处理问题
- ## 数学问题、图论问题
- ## 角色扮演问题
- ## 编程问题
- ## 创作问题
- ## 数据分析问题

# Openai API

API 主要位于 OpenAI 的 [doc](https://platform.openai.org/)

Tokenizer 计算: 中文一个汉字一般是一个 Token。而英文的单词数量与 token 数量不一致，一般小于这个数字。

OpenAI 提供了 PlayGround, 可以进行很多测试。 `System` 是默认的 Prompt, `User` 是用户输入, 模型返回是 `Assistant`。

初始化客户端

```python
# 初始化
import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
# 将 API key 放在.env 文件内
load_dotenv()
# 需要替换自己的 API 地址, 例如使用 One API 项目自建, 不写就是 OpenAI 官方的
client = OpenAI(base_url='')
```

调用基础模型

```python
completion = client.chat.completions.create(
    model='gpt-4-1106-preview',
    messages=[
        {"role":"system", "content":"你是一名专业的大模型课程助教，给学生提供必要的学习支持，如提供提示、纠正错误等"},
        {"role":"user", "content":"如何学习大模型"},

    ],
    max_tokens = 500,
    # GPT-4 seed 保持输出结果一致
    seed = 42,
    temperature=0.7,
)
```

画图模型 DALL-E3 调用

```python
# DALL-E 3
image_style = ['Photo', 'Cartoon', 'Illustration']
image_type = ['vivid', 'natural']
response = client.images.generate(
    model='dall-e-3',
    prompt='在一个教室里面，很多学生正在学习数学',
    size='1024x1024',
    quality='standard',
    type=image_type[0],
    n=1
)
print(response)
print(response.data[0].url)
```

关于 GPT-4-Vision 的调用

```python
# GPT-4-Vision
# 可以传递若干个图片和文字
# 用于视频解说之类的
response = client.chat.completions.create(
    model='gpt-4-vision-preview',
    messages = [
        {
            "role":"user",
            "content":[
                {
                    "type": "text",
                    "text": "What is in this image?"
                },
                {
                    "type":"image_url",
                    "image_url": "https://dalleprodsec.blob.core.windows.net/private/images/cf5f3ed7-81df-442a-9edd-e24b0043ba0f/generated_00.png?se=2024-03-29T08%3A14%3A06Z&sig=94WGqAgkbI9pgjvL5v0OccQvXIp6eF4iTUEiWVOQEeQ%3D&ske=2024-04-04T01%3A54%3A42Z&skoid=e52d5ed7-0657-4f62-bc12-7e5dbb260a96&sks=b&skt=2024-03-28T01%3A54%3A42Z&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skv=2020-10-02&sp=r&spr=https&sr=b&sv=2020-10-02"
                }
            ],
        },

    ],
    max_tokens=200,
)
print(response)
print("--------------------------------")
print(response.choices[0].message.content)
```
