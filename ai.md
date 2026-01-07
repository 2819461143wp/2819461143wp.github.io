```python
# 使用 nn.Sequential 容器按顺序构建神经网络模型
net = nn.Sequential(
    # 1. Flatten层（展平层）
    # 作用：将输入的多维数据（如图片）转换成一维向量，以便输入到全连接层
    # 例如，输入一张28x28像素的MNIST手写数字图片，该层会将其展平为一个长度为784 (28*28) 的一维向量
    nn.Flatten(),

    # 2. 第一个全连接层（线性层）
    # 作用：进行基础的线性变换（y = Wx + b）
    # 参数：nn.Linear(输入特征的维度， 输出特征的维度)
    # 这里：输入维度为784（展平后的像素向量），输出维度为256（代表本层有256个神经元）
    nn.Linear(784, 256),

    # 3. ReLU激活函数层
    # 作用：引入非线性变换，这是神经网络能够学习复杂模式的关键
    # 公式：ReLU(x) = max(0, x)。它将所有负值置为0，正值保持不变。
    # 如果没有激活函数，多层线性层的堆叠仍然等价于一个线性层，无法解决复杂问题。
    nn.ReLU(),

    # 4. 第二个全连接层（输出层）
    # 作用：将256维的特征映射到最终的10个输出节点上
    # 这里：输入维度为256（上一层的输出），输出维度为10（对应MNIST数据集的10个类别，即数字0-9）
    # 通常在这一层之后不会立即使用激活函数（如ReLU），因为输出值需要传递给损失函数（如CrossEntropyLoss）进行计算，
    # 而CrossEntropyLoss内部已经包含了Softmax操作（将输出转换为概率分布）。如果在此处额外添加Softmax，会导致错误。
    nn.Linear(256, 10)
)

# 定义权重初始化函数
# 这个函数将作为参数传递给 net.apply() 方法，对网络中的每一层进行遍历和应用
def init_weights(m):
    """
    初始化权重的函数
    参数:
        m: 神经网络中的一个模块（层）
    """
    # 检查当前遍历到的模块 m 是否为线性层 (nn.Linear)
    if type(m) == nn.Linear:
        # 如果是线性层，则使用正态分布初始化该层的权重矩阵
        # nn.init.normal_：原地操作函数（带下划线），会直接修改m.weight的值
        # 参数:
        #   m.weight: 要初始化的权重张量
        #   std=0.01: 正态分布的标准差，这里设为较小的值（0.01）
        #   均值默认为0
        # 效果：权重值将从均值为0，标准差为0.01的正态分布中随机采样
        nn.init.normal_(m.weight, std=0.01)
        
        # 注意：这里没有初始化偏置项(m.bias)
        # 在PyTorch中，如果不对偏置显式初始化，它通常会被默认初始化为0

# 应用权重初始化函数到整个网络
# net.apply() 会递归地遍历网络net中的所有模块（包括子模块）
# 对每个模块都执行一次 init_weights 函数
net.apply(init_weights);
# 分号(;)在Jupyter notebook等环境中用于抑制最后一个语句的返回值输出，使界面更整洁
# 设置超参数：批大小、学习率、训练轮数
batch_size, lr, num_epochs = 256, 0.1, 10

# 定义交叉熵损失函数，reduction='none'表示不对损失求平均或求和
loss = nn.CrossEntropyLoss(reduction='none')

# 创建SGD优化器，传入网络参数和学习率
trainer = torch.optim.SGD(net.parameters(), lr=lr)

# 加载Fashion-MNIST数据集，返回训练和测试数据迭代器
train_iter, test_iter = d2l.load_data_fashion_mnist(batch_size)

# 调用训练函数，开始模型训练过程
d2l.train_ch3(net, train_iter, test_iter, loss, num_epochs, trainer)
```

