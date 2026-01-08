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
