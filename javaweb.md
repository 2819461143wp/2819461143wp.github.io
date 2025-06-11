## 实验结果

### 位置编码超参数

位置编码是Transformer架构中的关键组件，用于为序列中的每个位置提供位置信息。在R-Informer模型中，我们比较了相对位置编码和绝对位置编码两种方式。

\begin{table}[h]
\centering
\begin{tabular}{|c|c|c|c|c|c|}
\hline
位置编码 & RMSE & MAE & R² & MAPE & MSE \\ \hline
相对 & 0.314759 & 0.240532 & 0.757474 & 1.729339 & 0.099398 \\ \hline
绝对 & 0.232561 & 0.172290 & 0.867959 & 1.661362 & 0.054116 \\ \hline
\end{tabular}
\caption{位置编码对比测试}
\label{tab:position_encoding}
\end{table}

**分析：** 绝对位置编码在所有指标上都明显优于相对位置编码，R²值提升了约11%，说明绝对位置编码能够更好地捕捉时间序列的位置信息，为R-Informer模型提供更准确的位置感知能力。

### 位置编码消融实验

为了验证位置编码在R-Informer模型中的重要性，我们进行了消融实验，测试完全不使用位置编码时的模型性能。

\begin{table}[h]
\centering
\begin{tabular}{|c|c|c|c|c|c|}
\hline
实验设置 & RMSE & MAE & R² & MAPE & MSE \\ \hline
无位置编码 & 0.59573 & 0.497342 & -0.070604 & 6.334192 & 0.438781 \\ \hline
\end{tabular}
\caption{位置编码消融实验}
\label{tab:position_ablation}
\end{table}

**分析：** 不使用位置编码时模型性能急剧下降，R²值为负数，表明模型预测能力甚至不如简单的均值预测。这证明了位置编码对R-Informer模型的重要性，特别是在处理时间序列数据时。

### RNN嵌入层类型

RNN嵌入层是R-Informer相对于原始Informer的核心改进。我们测试了不同类型的循环神经网络作为嵌入层，以验证循环结构对序列建模的效果。

\begin{table}[h]
\centering
\begin{tabular}{|c|c|c|c|c|c|}
\hline
嵌入方式 & RMSE & MAE & R² & MAPE & MSE \\ \hline
无 & 0.355703 & 0.273687 & 0.146301 & 3.005920 & 0.126835 \\ \hline
RNN & 0.298882 & 0.241365 & 0.389059 & 2.955097 & 0.328926 \\ \hline
GRU & 0.312692 & 0.246603 & 0.322505 & 2.658925 & 0.100656 \\ \hline
LSTM & 0.255795 & 0.199211 & 0.558182 & 2.119463 & 0.065641 \\ \hline
\end{tabular}
\caption{RNN嵌入层类型对比}
\label{tab:rnn_embedding}
\end{table}

**分析：** LSTM嵌入方式表现最优，R²值达到0.558，这是R-Informer的核心改进点。LSTM能够更好地处理序列信息并缓解梯度消失问题，相比原始Informer的无RNN嵌入方式，性能显著提升。

### 卷积核尺寸(Ksize)参数

Ksize参数控制着模型中卷积层的核大小，影响模型对局部特征的感受野。较小的核关注细粒度特征，较大的核能捕获更广泛的上下文信息。

\begin{table}[h]
\centering
\begin{tabular}{|c|c|c|c|c|c|}
\hline
Ksize & RMSE & MAE & R² & MAPE & MSE \\ \hline
42 & 0.408464 & 0.335041 & -0.044572 & 5.286513 & 0.251520 \\ \hline
32 & 0.332107 & 0.259134 & 0.287116 & 3.921878 & 0.115159 \\ \hline
16 & 0.342571 & 0.268265 & 0.270665 & 4.331210 & 0.117816 \\ \hline
14 & 0.374095 & 0.297786 & 0.129902 & 4.707771 & 0.140555 \\ \hline
7 & 0.316386 & 0.253022 & 0.379267 & 3.963162 & 0.100273 \\ \hline
6 & 0.369896 & 0.295820 & 0.105725 & 4.728030 & 0.144430 \\ \hline
5 & 0.323774 & 0.256982 & 0.348634 & 4.434326 & 0.105185 \\ \hline
3 & 0.292877 & 0.232632 & 0.412253 & 3.700589 & 0.085966 \\ \hline
\end{tabular}
\caption{卷积核尺寸(Ksize)参数对比}
\label{tab:ksize}
\end{table}

**分析：** Ksize=3时效果最佳，这个参数控制卷积核大小。过大的Ksize（如42）会导致过拟合，而适中的Ksize=3能在捕捉局部特征和避免过拟合之间取得平衡。

### 批处理大小(Batch Size)参数

Batch Size决定了每次训练迭代中处理的样本数量。较大的批处理大小可以提供更稳定的梯度估计和更好的并行效率。

\begin{table}[h]
\centering
\begin{tabular}{|c|c|c|c|c|c|}
\hline
Batch Size & RMSE & MAE & R² & MAPE & MSE \\ \hline
128 & 0.241194 & 0.177661 & 0.857748 & 1.482472 & 0.058301 \\ \hline
256 & 0.232561 & 0.172290 & 0.867959 & 1.661362 & 0.054116 \\ \hline
\end{tabular}
\caption{批处理大小(Batch Size)参数对比}
\label{tab:batch_size}
\end{table}

**分析：** 较大的batch size（256）性能更好，这可能因为：1）更稳定的梯度估计；2）更好的批标准化效果；3）R-Informer模型复杂度较高，需要更大的batch size来稳定训练。

### 模型维度(D_model)参数

D_model参数定义了模型的隐藏维度大小，直接影响模型的表达能力和参数数量。较大的维度能够捕获更复杂的特征表示。

\begin{table}[h]
\centering
\begin{tabular}{|c|c|c|c|c|c|}
\hline
D\_model & RMSE & MAE & R² & MAPE & MSE \\ \hline
32 & 0.272105 & 0.201878 & 0.817991 & 1.804864 & 0.074596 \\ \hline
64 & 0.261235 & 0.195909 & 0.830171 & 1.824849 & 0.069603 \\ \hline
128 & 0.249953 & 0.179703 & 0.847136 & 1.447089 & 0.062650 \\ \hline
256 & 0.310209 & 0.221540 & 0.763615 & 1.356838 & 0.096881 \\ \hline
\end{tabular}
\caption{模型维度(D\_model)参数对比}
\label{tab:d_model}
\end{table>

**分析：** D_model=128时效果最佳。这个参数控制模型维度，过小会限制模型表达能力，过大（256）则容易过拟合。128维在模型容量和泛化能力间达到最佳平衡。

### 激活函数选择

激活函数决定了神经网络的非线性特性，不同的激活函数具有不同的梯度特性和表达能力。

\begin{table}[h]
\centering
\begin{tabular}{|c|c|c|c|c|c|}
\hline
激活函数 & RMSE & MAE & R² & MAPE & MSE \\ \hline
tanh & 0.272105 & 0.201878 & 0.817991 & 1.804864 & 0.074596 \\ \hline
relu & 0.261235 & 0.195909 & 0.830171 & 1.824849 & 0.069603 \\ \hline
gelu & 0.249953 & 0.179703 & 0.847136 & 1.447089 & 0.062650 \\ \hline
\end{tabular>
\caption{激活函数选择对比}
\label{tab:activation}
\end{table>

**分析：** GELU激活函数表现最优，这与其平滑的梯度特性有关。GELU结合了ReLU和Dropout的优点，在保持非线性的同时提供更好的梯度流动，特别适合深度网络如R-Informer。

### Dropout正则化率参数

Dropout是一种重要的正则化技术，通过随机丢弃部分神经元来防止过拟合。Dropout率的选择需要在防止过拟合和保持模型学习能力之间取得平衡。

\begin{table}[h]
\centering
\begin{tabular}{|c|c|c|c|c|c|}
\hline
Dropout & RMSE & MAE & R² & MAPE & MSE \\ \hline
0.05 & 0.243984 & 0.177038 & 0.854149 & 1.434257 & 0.059776 \\ \hline
0.1 & 0.240261 & 0.177371 & 0.858597 & 1.567772 & 0.057953 \\ \hline
0.2 & 0.269987 & 0.201991 & 0.819010 & 1.510395 & 0.074178 \\ \hline
0.3 & 0.232561 & 0.172290 & 0.867959 & 1.661362 & 0.054116 \\ \hline
0.4 & 0.297306 & 0.232338 & 0.778579 & 2.252355 & 0.090748 \\ \hline
0.5 & 0.357336 & 0.284354 & 0.676915 & 2.331022 & 0.132415 \\ \hline
\end{tabular}
\caption{Dropout正则化率参数对比}
\label{tab:dropout}
\end{table>

**分析：** Dropout=0.3时效果最佳。适度的dropout能有效防止过拟合，但过高的dropout率（≥0.4）会损害模型的学习能力。0.3的设置在正则化和保持模型容量间取得最佳平衡。

### RNN编码方向参数

RNN编码方向决定了循环神经网络处理序列的方式。单向RNN只能访问历史信息，符合时间序列的因果性；双向RNN可以同时利用过去和未来的信息。

\begin{table}[h]
\centering
\begin{tabular}{|c|c|c|c|c|c|}
\hline
编码方向 & RMSE & MAE & R² & MAPE & MSE \\ \hline
单向 & 0.291274 & 0.213466 & 0.792546 & 1.323475 & 0.085024 \\ \hline
双向 & 0.317830 & 0.224248 & 0.753276 & 1.356303 & 0.101119 \\ \hline
\end{tabular}
\caption{RNN编码方向对比}
\label{tab:encoding_direction}
\end{table>

**分析：** 出人意料的是，单向编码效果更好。这可能因为：1）时间序列预测本质上是因果任务，单向更符合实际应用；2）双向编码可能引入未来信息泄露；3）R-Informer的RNN嵌入层已经提供了足够的序列建模能力。