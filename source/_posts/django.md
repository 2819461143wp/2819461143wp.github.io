---
title: Django
date: 2025-03-19 09:56:26
categories:
  - note
  - language
  - Django
tags: [language]
banner_img: /images/壁纸.jpg
---

## 快速开始

推荐使用`conda`虚拟环境安装并运行`django`

创建项目

```shell
django-admin startproject myproject
```

基础目录结构

```markdown
# 目录结构
myproject/
  ├── manage.py         # 类似 Spring Boot 的 mvnw/gradlew
  └── myproject/
      ├── __init__.py
      ├── settings.py    # 全局配置（类似 application.properties）
      ├── urls.py        # 主路由配置（类似 @RestController）
      └── wsgi.py       # 部署相关
```

创建应用

```shell
# 在项目根目录下执行（类似创建子模块）
python manage.py startapp myapp
```

新增目录结构

```markdown
# 目录结构新增：
myapp/
  ├── migrations/       # 数据库迁移文件（类似 Flyway）
  ├── admin.py          # 后台管理配置
  ├── apps.py           # 应用配置
  ├── models.py         # 数据模型（类似 JPA Entity）
  ├── tests.py          # 单元测试
  └── views.py          # 视图层（类似 Controller）
```

定义模型，在`models.py`中

```python
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
    publish_date = models.DateField()

    def __str__(self):
        return self.title
```

常用命令

`python manage.py runserver` 启动开发服务器

`python manage.py shell` 进入`django`的交互式shell

`python manage.py createsuperuser` 创建管理员账号

`python manage.py test` 运行单元测试