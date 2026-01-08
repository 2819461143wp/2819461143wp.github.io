---
title: ai
date: 2026-1-8 19:56:04
categories:
  - 期末考试
tags: [期末]
index_img:
banner_img: /images/壁纸.jpg
---

```python
class MLP(nn.Module):
    # 用模型参数声明层。这里，我们声明两个全连接的层
    def __init__(self):
        # 调用MLP的父类Module的构造函数来执行必要的初始化。
        # 这样，在类实例化时也可以指定其他函数参数，例如模型参数params（稍后将介绍）
        super().__init__()
        self.hidden = nn.Linear(20, 256)  # 隐藏层
        self.out = nn.Linear(256, 10)  # 输出层

    # 定义模型的前向传播，即如何根据输入X返回所需的模型输出
    def forward(self, X):
        # 注意，这里我们使用ReLU的函数版本，其在nn.functional模块中定义。
        return self.out(F.relu(self.hidden(X)))
```

LeNet

```python
net = nn.Sequential(
    # 第一层：卷积层 + 激活函数
    nn.Conv2d(1, 6, kernel_size=5, padding=2),  # 输入通道1(灰度图)，输出通道6，5x5卷积核，填充2保持尺寸
    nn.Sigmoid(),  # Sigmoid激活函数
    
    # 第二层：池化层
    nn.AvgPool2d(kernel_size=2, stride=2),  # 2x2平均池化，步长为2，特征图尺寸减半
    
    # 第三层：卷积层 + 激活函数
    nn.Conv2d(6, 16, kernel_size=5),  # 输入通道6，输出通道16，5x5卷积核，无填充
    nn.Sigmoid(),  # Sigmoid激活函数
    
    # 第四层：池化层
    nn.AvgPool2d(kernel_size=2, stride=2),  # 2x2平均池化，步长为2，特征图尺寸减半
    
    # 第五层：展平层
    nn.Flatten(),  # 将多维特征图展平为一维向量，便于全连接层处理
    
    # 第六层：全连接层 + 激活函数
    nn.Linear(16 * 5 * 5, 120),  # 输入维度16*5*5=400，输出维度120
    nn.Sigmoid(),  # Sigmoid激活函数
    
    # 第七层：全连接层 + 激活函数
    nn.Linear(120, 84),  # 输入维度120，输出维度84
    nn.Sigmoid(),  # Sigmoid激活函数
    
    # 第八层：输出层
    nn.Linear(84, 10)  # 输入维度84，输出维度10（对应10个分类）
)
```

- nn.Sequential  # 容器模块，用于按顺序组合多个层
- nn.Sigmoid()  # Sigmoid 激活函数，将输出压缩到 (0, 1) 区间
- nn.Tanh()  # Tanh 激活函数，将输出压缩到 (-1, 1) 区间
- nn.ReLU(inplace=True),  # ReLU 激活函数，inplace=True 节省内存
- nn.Linear(128, 64)  # 全连接层，输入 128 维，输出 64 维
- nn.Conv2d(256, 256, kernel_size=3, padding=1),  # 2D 卷积层，256个输入通道，256个输出通道，3x3 卷积核
- nn.BatchNorm2d(512),  # 批归一化层，对 512 个通道进行归一化，加速训练并提高稳定性
- nn.ReLU(inplace=True),  # ReLU 激活函数
- nn.MaxPool2d(kernel_size=2, stride=2),  # 最大池化层，2x2 窗口降采样
- nn.Dropout(0.5),  # Dropout 层，50% 的概率随机失活
- torch.flatten(x, 1)  # 展平张量，从第1维开始（保留 batch 维度）
- torch.zeros(3, 224, 224)  # 创建 3 通道、224x224 尺寸的全零张量
- nn.MultiheadAttention(d_model, nhead, dropout=dropout,
- batch_first=True)  # 多头注意力机制，d_model 是特征维度，nhead 是注意力头数，batch_first=True 表示输入格式为 (batch, seq, feature)
    nn.LayerNorm(d_model)  # 层归一化，对 d_model 维度的特征进行归一化，常用于 Transformer 架构
- nn.GELU()  # GELU 激活函数（高斯误差线性单元），比 ReLU 更平滑，常用于 Transformer 模型如 BERT、GPT
- self.criterion = nn.CrossEntropyLoss() # 交叉熵损失函数

- torch.device('cuda')

- nn.backward()#梯度下降

1.请从任务类型、输出形式和损失函数三个方面，对比softmax回归与逻辑回归的不同。
(1) 任务类型：
逻辑回归：二分类任务，
softmax回归：多分类任务；
(2) 计算输出形式：
逻辑回归：输出1个0-1之间的概率值
softmax回归：输出多个概率值，且所有值总和为1
(3) 损失函数：
逻辑回归：使用二元交叉熵损失；
softmax回归：使用多类交叉熵损失。

2.请简述多层感知机（MLP）的基本结构及其核心作用。
(1) 基本结构：由多个全连接层堆叠，每层输出经ReLU等激活函数做非线性变换；
(2) 核心作用：通过学习权重偏置，实现任意可测函数的逼近，表征输入输出的复杂映射。

3.在训练卷积神经网络（CNN）时，为防止模型过拟合，可采取哪些有效策略，请列举至少3种常用方法？
(1) 数据增强；
(2) Dropout丢弃法；
(3) 加入L2正则化项；

4.请简要说明卷积层和池化层在卷积神经网络中的作用及主要区别？
(1) 作用
卷积层：提取图像局部特征（边缘、纹理等），减少模型参数。
池化层：压缩特征维度，保留关键特征，降低计算量。
(2) 主要区别
卷积层有可学习参数，核心是特征提取；
池化层无学习参数，核心是特征降维筛选

5.请从模型结构、训练效率与收敛速度三个方面，对比ReLU与Sigmoid激活函数的不同，并简要说明各自的优缺点。
(1) 模型结构（梯度）
ReLU：适配深层网络，能有效缓解梯度消失问题。
Sigmoid：易引发深层网络梯度消失，更适合浅层网络。
(2) 训练效率
ReLU：计算简单，训练效率高。
Sigmoid：计算复杂，训练效率低。
(3) 收敛速度
ReLU：梯度更新顺畅，模型收敛速度快。
Sigmoid：梯度易饱和，模型收敛速度慢。
(4) 优缺点
ReLU优点：计算高效、收敛快、缓解梯度消失；
缺点：输入为负时神经元易永久失活。
Sigmoid优点：输出值在(0,1)区间，可直接表示概率；
缺点：计算复杂、收敛慢、深层网络易梯度消失。

6.简述批量归一化（Batch Normalization, BN）的核心思想？
(1) 核心操作：对每层输入的批量数据做标准化，将其调整为标准分布。
(2) 解决问题：消除内部协变量偏移。
(3) 保留特征能力：保留原有的特征信息。
(4) 最终效果：加快模型收敛速度，提升训练稳定性，缓解梯度消失。

7.假设你有一个小型的图像识别任务（仅5个类别），数据量不足10k张图像。简述如何使用预训练的VGG模型进行微调来完成该任务。请按三步给出主要思路？
(1) 加载 + 冻结
加载预训练好的VGG模型，冻结卷积层（保留通用图像特征，不破坏已学知识）。
(2) 换分类头
去掉原模型的分类层，换成仅适配5个类别的新分类层（简单全连接层 + softmax）。
(3) 分阶段训练
先小学习率训练新分类层；再解冻部分卷积层，用更小学习率微调，让模型适配自己的小数据集。

8.请列举3种常见的目标检测算法，并简述其特性。
(1) YOLO
单阶段算法，检测速度快、适合实时场景，缺点是小目标检测精度稍弱。
(2) Faster R-CNN
两阶段算法，检测精度高，缺点是步骤多、速度慢，不适合实时任务。
(3) SSD
单阶段算法，兼顾速度和精度，对小目标的检测效果比YOLO好。
