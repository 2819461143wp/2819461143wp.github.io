---
title: FastAPI
date: 2025-12-01 08:56:26
categories:
  - note
  - language
  - Flask
tags: [language]
banner_img: /images/壁纸.jpg
---

## 类型提示

```python
def get_full_name(first_name: str, last_name: str):
    full_name = first_name.title() + " " + last_name.title()
    return full_name
print(get_full_name("john", "doe"))

from typing import List
def process_items(items: List[str]):
    for item in items:
        print(item)

from typing import Set, Tuple
def process_items(items_t: Tuple[int, int, str], items_s: Set[bytes]):
    return items_t, items_s

from typing import Dict
def process_items(prices: Dict[str, float]):
    for item_name, item_price in prices.items():
        print(item_name)
        print(item_price)
```

## 并发 async / await

实例：

```python
@app.get('/')
async def read_results():
    results = await some_library()
    return results
```

只能在被 `async def` 创建的函数内使用 `await`
