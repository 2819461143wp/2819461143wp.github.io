```cmd
conda create -n SCSegamba python=3.10 -y
conda activate SCSegamba
pip install torch==1.13.1+cu116 torchvision==0.14.1+cu116 --extra-index-url https://download.pytorch.org/whl/cu116
conda install -c nvidia cuda-toolkit=11.6
pip install -U openmim
mim install mmcv-full
pip install mamba-ssm -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn
pip install timm lmdb mmengine numpy
```

