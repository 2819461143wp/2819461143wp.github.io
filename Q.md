## 环境设置

- 新建一个anaconda的虚拟环境，安装3.10.11版本的py`conda create --name new_env python=3.10.11`
- 下载pytorch`conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia`

## 项目结构

| 程序     | 功能                                                         | 输出（图像） |
| -------- | ------------------------------------------------------------ | ------------ |
| utils    | 打开数据集/图片                                              | 无           |
| data     | 获取并计算数据集/图片的一些信息（调用utils）                 | 无           |
| net      | unet模型（无需修改）                                         | 无           |
| train    | 进行训练                                                     | tran_image   |
| test_cpu | 将模型与数据加载到CPU中进行处理（调用data，路径自己输入，无需修改） | result       |

## 更改数据

&nbsp;&nbsp;&nbsp;&nbsp;`JPEGlamages`和`SegmentationClass`为我们给定的两个数据集，分别表示分割前与分割后的图像，若需修改图片进行训练，可将`CellDataSet`内为分割的图像放入`JPEGlamages`与`test_image`,该项目中未给我们提供相应的`SegmentationClass`

> 由于原始的图像为jpg格式，若修改为所给的png格式需要修改data中的`image_path = os.path.join(self.path, 'JPEGImages', segment_name)  # 不再替换扩展名`
>
> 运行train可能会出现警告，但不影响程序的运行，可以选择修改test_cpu为`net.load_state_dict(torch.load(weights, map_location=device,weights_only=True))`
