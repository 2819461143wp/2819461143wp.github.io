---
title: Flask
date: 2025-06-18 16:56:26
categories:
  - note
  - language
  - Flask
tags: [language]
banner_img: /images/壁纸.jpg
---

## 项目管理

### `requirements.txt`

```python
pip freeze > requirements.txt
```

### uv

配置文件：`pyproject.toml`

#### 基础格式

```toml
[project]
name = "you project name"
version = "0.1.0"
dependencies = [
	"外部库配置",
]
```

后续开发过程中新依赖库只需要`uv add _____`即可下载并加入该文件当中，类比`npm`

构建环境`uv sync`

`uv run main.py` 

## 项目结构

```text
flask_backend/
├── app/                      # 核心代码 (类似src/main/java).
│   ├── __init__.py           # 应用工厂 (类似主配置类)
│   ├── models/               # 数据模型 (类似JPA Entity)
│   │   └── user.py           # 示例模型
│   ├── routes/               # 路由层 (类似Controller)
│   │   ├── auth.py           # 认证路由
│   │   └── api.py            # API路由
│   ├── services/             # 业务逻辑层 (类似@Service)
│   │   └── user_service.py   # 用户服务
│   ├── utils/                # 工具类 (类似Util包)
│   ├── config.py             # 配置类 (多环境配置)
│   └── extensions.py         # 扩展初始化 (类似@Configuration)
├── tests/                    # 测试代码 (类似src/test/java)
├── migrations/               # 数据库迁移 (类似Flyway)
├── requirements.txt          # 依赖管理 (类似pom.xml)
├── .env                      # 环境变量
└── run.py                    # 启动入口 (类似main方法)
```

示例：

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
```

解析：

> - **from flask import Flask**： 这行代码从 `flask` 模块中导入了 `Flask` 类。`Flask` 类是 Flask 框架的核心，用于创建 Flask 应用程序实例。
> - **app = Flask(__name__)**： 这行代码创建了一个 Flask 应用实例。`__name__` 是一个特殊的 Python 变量，它在模块被直接运行时是 `'__main__'`，在被其他模块导入时是模块的名字。传递 `__name__` 给 `Flask` 构造函数允许 Flask 应用找到和加载配置文件。
> - **@app.route('/')**： 这是一个装饰器，用于告诉 Flask 哪个 URL 应该触发下面的函数。在这个例子中，它指定了根 URL（即网站的主页）。
> - **def hello_world():**： 这是定义了一个名为 `hello_world` 的函数，它将被调用当用户访问根URL时。
> - **return 'Hello, World!'**： 这行代码是 `hello_world` 函数的返回值。当用户访问根 URL 时，这个字符串将被发送回用户的浏览器。
> - **if __name__ == '__main__':**：这行代码是一个条件判断，用于检查这个模块是否被直接运行，而不是被其他模块导入。如果是直接运行，下面的代码块将被执行。
> - **app.run(debug=True)**：这行代码调用 Flask 应用实例的 `run` 方法，启动 Flask 内置的开发服务器。`debug=True` 参数会启动调试模式，这意味着应用会在代码改变时自动重新加载，并且在发生错误时提供一个调试器。

### 视图函数

```python
from markupsafe import escape

@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return f'User {escape(username)}'

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return f'Post {post_id}'

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return f'Subpath {escape(subpath)}'
```

### 请求对象

```python
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()
    
@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['username'],request.form['password']):
            return log_the_user_in(request.form['username'])
        else:
            error = 'Invalid username/password'
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return render_template('login.html', error=error)
```

### 响应对象

```python
@app.route("/me")
def me_api():
    user = get_current_user()
    return {
        "username": user.username,
        "theme": user.theme,
        "image": url_for("user_image", filename=user.image),
    }

@app.route("/users")
def users_api():
    users = get_all_users()
    return [user.to_json() for user in users]
```

### 连接数据库

```python
#flaskr/db.py
import sqlite3
from datetime import datetime

import click
from flask import current_app, g


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()
```

### 创建表

```sql
#flaskr/schema.sql
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES user (id)
);
```

运行

```python
#flaskr/db.py
def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


sqlite3.register_converter(
    "timestamp", lambda v: datetime.fromisoformat(v.decode())
)
```

