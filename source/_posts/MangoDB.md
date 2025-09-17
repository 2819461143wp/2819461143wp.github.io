---
title: MangoDB
date: 2025-09-02 13:56:26
categories:
  - note
  - language
  - SQL
tags: [language]
banner_img: /images/壁纸.jpg
---

## 简介

*MongoDB是一个流行的开源文档型数据库，它使用类似 JSON 的文档模型存储数据，这使得数据存储变得非常灵活。*

### 术语区别

| SQL 术语/概念 | MongoDB 术语/概念 | 解释/说明                           |
| :------------ | :---------------- | :---------------------------------- |
| database      | database          | 数据库                              |
| table         | collection        | 数据库表/集合                       |
| row           | document          | 数据记录行/文档                     |
| column        | field             | 数据字段/域                         |
| index         | index             | 索引                                |
| table joins   |                   | 表连接,MongoDB不支持                |
| primary key   | primary key       | 主键,MongoDB自动将_id字段设置为主键 |

## MangoDB用户管理

### 切换数据库

```sql
use <database_name>
```

### 创建用户

创建一个名为 testuser 的用户，密码为 password123，并赋予 readWrite 和 dbAdmin 角色：

```sql
db.createUser({
  user: "testuser",
  pwd: "password123",
  roles: [
    { role: "readWrite", db: "<database_name>" },
    { role: "dbAdmin", db: "<database_name>" }
  ]
})
```

### 验证用户

```sql
db.auth("testuser", "password123")
```

### 启用身份验证

为了确保只有经过身份验证的用户才能访问 MongoDB，需要启用身份验证。

编辑 MongoDB 配置文件 mongod.conf，并在其中添加以下内容：

```sql
security:
  authorization: "enabled"
```

## 语法

### 库相关操作

#### 创建数据库

当你使用 **use** 命令来指定一个数据库时，如果该数据库不存在，MongoDB将自动创建它。

```sql
use DATABASE_NAME
```

#### 查看所有数据库

```sql
show dbs
```

#### 查看当前数据库

```sql
db
```

#### 删除正在使用的数据库

```sql
db.dropDatabase()
```

MongoDB 中默认的数据库为 test，如果你没有创建新的数据库，集合将存放在 test 数据库中。

当您通过 shell 连接到 MongoDB 实例时，如果未使用 use 命令切换到其他数据库，则会默认使用 test 数据库。

例如，在启动 MongoDB 实例并连接到 MongoDB shell 后，如果您开始插入文档而未显式指定数据库，MongoDB 将默认使用 test 数据库。

### 集合相关操作

#### 创建集合(表)

```sql
db.createCollection(name, options)
```

| 参数名             | 类型   | 描述                                                         | 示例值                          |
| :----------------- | :----- | :----------------------------------------------------------- | :------------------------------ |
| `capped`           | 布尔值 | 是否创建一个固定大小的集合。                                 | `true`                          |
| `size`             | 数值   | 集合的最大大小（以字节为单位）。仅在 `capped` 为 true 时有效。 | `10485760` (10MB)               |
| `max`              | 数值   | 集合中允许的最大文档数。仅在 `capped` 为 true 时有效。       | `5000`                          |
| `validator`        | 对象   | 用于文档验证的表达式。                                       | `{ $jsonSchema: { ... }}`       |
| `validationLevel`  | 字符串 | 指定文档验证的严格程度。 `"off"`：不进行验证。 `"strict"`：插入和更新操作都必须通过验证（默认）。 `"moderate"`：仅现有文档更新时必须通过验证，插入新文档时不需要。 | `"strict"`                      |
| `validationAction` | 字符串 | 指定文档验证失败时的操作。 `"error"`：阻止插入或更新（默认）。 `"warn"`：允许插入或更新，但会发出警告。 | `"error"`                       |
| `storageEngine`    | 对象   | 为集合指定存储引擎配置。                                     | `{ wiredTiger: { ... }}`        |
| `collation`        | 对象   | 指定集合的默认排序规则。                                     | `{ locale: "en", strength: 2 }` |

实例:

```sql
db.createCollection("myComplexCollection", {
  capped: true,
  size: 10485760,
  max: 5000,
  validator: { $jsonSchema: {
    bsonType: "object",
    required: ["name", "email"],
    properties: {
      name: {
        bsonType: "string",
        description: "必须为字符串且为必填项"
      },
      email: {
        bsonType: "string",
        pattern: "^.+@.+$",
        description: "必须为有效的电子邮件地址"
      }
    }
  }},
  validationLevel: "strict",
  validationAction: "error",
  storageEngine: {
    wiredTiger: { configString: "block_compressor=zstd" }
  },
  collation: { locale: "en", strength: 2 }
});
```

在 MongoDB 中，你不需要创建集合，当你插入一些文档时，MongoDB 会自动创建集合。

```sql
> db.mycol2.insert({"name" : "菜鸟教程"})
> show collections
mycol2
...
```

#### 查看集合

```sql
show collections / tables
```

#### 删除集合

```sql
db.runoob.drop()
```

### 文档相关操作

#### 文档插入

##### 单个文档插入

`insertOne() `方法用于在集合中插入单个文档

```sql
db.collection.insertOne(document, options)
```

- document：要插入的单个文档。
- options（可选）：一个可选参数对象，可以包含 `writeConcern` 和 `bypassDocumentValidation` 等。

**实例**:

```sql
db.myCollection.insertOne({
    name: "Alice",
    age: 25,
    city: "New York"
});

{
    "acknowledged": true,
    "insertedId": ObjectId("60c72b2f9b1d8b5a5f8e2b2d")
}
```

##### 多个文档插入

`insertMany()` 方法用于在集合中插入多个文档。

```sql
db.collection.insertMany(documents, options)
```

- documents：要插入的文档数组。
- options（可选）：一个可选参数对象，可以包含 `ordered`、`writeConcern` 和 `bypassDocumentValidation` 等。

```sql
db.myCollection.insertMany([
    { name: "Bob", age: 30, city: "Los Angeles" },
    { name: "Charlie", age: 35, city: "Chicago" }
]);

{
    "acknowledged": true,
    "insertedIds": [
        ObjectId("60c72b2f9b1d8b5a5f8e2b2e"),
        ObjectId("60c72b2f9b1d8b5a5f8e2b2f")
    ]
}
```

#### 更新文档

##### 更新单个文档

`updateOne() `方法用于更新匹配过滤器的单个文档。

```sql
db.collection.updateOne(filter, update, options)
```

- **filter**：用于查找文档的查询条件。
- **update**：指定更新操作的文档或更新操作符。
- **options**：可选参数对象，如 `upsert`、`arrayFilters` 等。

```sql
db.myCollection.updateOne(
    { name: "Alice" },                // 过滤条件
    { $set: { age: 26 } },            // 更新操作
    { upsert: false }                 // 可选参数
);
```

`replaceOne()` 方法用于替换匹配过滤器的单个文档，新的文档将完全替换旧的文档。

```sql
db.collection.replaceOne(filter, replacement, options)
```

- **filter**：用于查找文档的查询条件。
- **replacement**：新的文档，将替换旧的文档。
- **options**：可选参数对象，如 `upsert` 等。

```sql
db.myCollection.replaceOne(
    { name: "Bob" },                  // 过滤条件
    { name: "Bob", age: 31 }          // 新文档
);
```

##### 更新多个文档

`updateMany()` 方法用于更新所有匹配过滤器的文档。

```sql
db.collection.updateMany(filter, update, options)
```

- **filter**：用于查找文档的查询条件。
- **update**：指定更新操作的文档或更新操作符。
- **options**：可选参数对象，如 `upsert`、`arrayFilters` 等。

```sql
db.myCollection.replaceOne(
    { name: "Bob" },                  // 过滤条件
    { name: "Bob", age: 31 }          // 新文档
);
```

#### 删除文档

`deleteOne() `方法用于删除匹配过滤器的单个文档。

```sql
db.collection.deleteOne(filter, options)
```

- **filter**：用于查找要删除的文档的查询条件。
- **options**（可选）：一个可选参数对象。

```sql
db.myCollection.deleteOne({ name: "Alice" });

{
    "acknowledged": true,
    "deletedCount": 1
}
```

`deleteMany()` 方法用于删除所有匹配过滤器的文档。

```sql
db.collection.deleteMany(filter, options)
```

- **filter**：用于查找要删除的文档的查询条件。
- **options**（可选）：一个可选参数对象。

```sql
db.myCollection.deleteMany({ status: "inactive" });

{
    "acknowledged": true,
    "deletedCount": 1
}
```

#### 查询文档

```sql
db.collection.find(query, projection)
```

- **query**：用于查找文档的查询条件。默认为 `{}`，即匹配所有文档。
- **projection**（可选）：指定返回结果中包含或排除的字段。

```sql
db.myCollection.find();

db.myCollection.find({ age: { $gt: 25 } });

db.myCollection.find(
    { age: { $gt: 25 } },
    { name: 1, age: 1, _id: 0 }
);
```

如果你需要以易读的方式来读取数据，可以使用 pretty() 方法

```sql
db.col.find().pretty()

db.col.find().pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```

`findOne()` 方法用于查找集合中的单个文档。如果找到多个匹配的文档，它只返回第一个。

```sql
db.collection.findOne(query, projection)
```

- **query**：用于查找文档的查询条件。默认为 `{}`，即匹配所有文档。
- **projection**（可选）：指定返回结果中包含或排除的字段。

```sql
db.myCollection.findOne({ name: "Alice" });

db.myCollection.findOne(
    { name: "Alice" },
    { name: 1, age: 1, _id: 0 }
);
```

