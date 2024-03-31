---
external: false
title: 模型轻量化网络结构设计
description: >-
  模型轻量化技术学习记录
date: 2024-03-27
ogImagePath: /images/normal/mac.jpg
category: 人工智能
tags:
  - 模型轻量化
  - 学习速记
  - 基础
---

# 索引

- [索引](#索引)
- [轻量化简介](#轻量化简介)
- [模型性能指标](#模型性能指标)
  - [计算密度](#计算密度)
  - [计算密集型算子与访存密集型算子](#计算密集型算子与访存密集型算子)
  - [推理时间](#推理时间)
- [轻量网络设计](#轻量网络设计)

# 轻量化简介

分为加速和压缩两种,大致细分为 矩阵低秩分解,剪枝,量化,知识蒸馏,轻量化模型设计 五种方案。

- 低秩分解:参数看成矩阵,一个大矩阵分为多个小矩阵
- 剪枝:结构化剪枝(去掉整个通道)和非结构化剪枝(稀疏矩阵),自动化剪枝(神经网络结构搜索、降低结构)
- 量化:低比特量化,FP32转为FP16,int8,极端 0-1
- 知识蒸馏: 大模型指导小模型,FitNet, Attention Transfer等
- 轻量化模型设计: 高效轻量的神经网络代替传统庞大的网络,优化网络性能。
- 框架: 阿里MNN,腾讯NCNN, 商汤OpenPPL,TensorRT等。

# 模型性能指标

性能评估：

    分类： Top-N 错误率； ROC 曲线,感受性曲线；
    目标检测： mAP(MeanAveragePrecision), IOU(交并集), mIoU(mean Intersection Over Union)

参数量评估：

    卷积: K * K * C_in * C_out
    则参数: Params = (K * K * C_in + 1) * C_Out

    FLOPs: 浮点运算数, 别和 FLOPS混淆,FLOPS是指每秒FLOPs
    FLOPs = 2 * W * H * k * k * C_in + C_out

    参数量越小,一般浮点运算越快。但是也和内存访问次数(因为边缘设备存在带宽、内存大小问题)、网络结构本身有关系

    MACs: 乘加操作数, 乘加算作一次

    内存占用: 要求内存占用可控,占用量不会大幅波动, 内存占用不等于访存量。 需要看如何安排内存、GPU内存如何读写

    DMAs: 访存量

## 计算密度

    计算密度= 计算量/ 访存量

达到峰值计算速度之前,是访存密集型,达到最大计算速度之后,为计算密集型

RoofLine模型

计算速度= min(计算密度 \* 带宽, 峰值计算速度)

计算密度较大时,程序性能受到最大峰值限制,性能上界等于硬件算力。

计算密度较小时,计算密度越大,程序能达到的速度上界就越高,内存带宽始终为最大值。性能上界 = 计算密度 \* 带宽

不同设备上,同一个程序的性质可能发生变化。算力较弱的情况下,可能是计算密集型,算力较强的情况下变成了访存密集型。

## 计算密集型算子与访存密集型算子

一般来说 Conv、FC、Deconv 等属于计算密集型,ReLU、EltWise Add、 Concat属于访存密集型

同一个参数可能因为参数的不同导致计算密度变化,甚至改变性质。

网络设计或优化时根据算子进行替换或优化。

计算密度过低,导致访存浪费时间。

计算密度越大,越有可能提高硬件的计算效率,充分发挥硬件性能。

举例： 4.5G 主频, 16核,指令集带宽 512,理论算力4.9T, 内存带宽96GB

4.5 _ 16 _ (512 / 32) _ 2 _ 2（2个FMA 单元）

## 推理时间

计算时间 = 计算量/计算速度 = 计算量 / min( 计算量/访存量 \* 带宽, 理论算力)

计算时间 = 访存量/带宽(访存密集型号), 计算量/理论算力(计算密集型)

# 轻量网络设计

轻量化网络四准则：

1. 同等通道大小最小化内存访问量
2. 过量使用组卷机会增加MAC
3. 网络碎片化会降低并行度
4. 不能忽略元素级操作,如 `relu`, `eltwise`