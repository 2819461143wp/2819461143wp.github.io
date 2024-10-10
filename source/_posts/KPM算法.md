---
title: KPM算法
date: 2024-10-10 08:46:46
categories:
  - note
  - 408
  - 数据结构与算法
tags: [算法]
index_img:
banner_img: /images/壁纸.jpg
---

## 算法思想

### next数组

不含当前，前面字符串的前后缀最大匹配长度（不为整体），0下表的next为-1
a abaabsaabaaa
-1 0 1

aab
"" "" √  长度0
a b ×    长度1
aa ab×   长度2

可补终止位置的next值

### 程序实现

```java
//时间复杂度为O(n)
public static int kmp(char[] s1, char[] s2){
    int n = s1.length, m = s2.length,x = 0, y = 0;
    int[] next = nextArray(s2, m);
    while (x < n && y < m){
        if (s1[x] == s2[y]){
            x++;
            y++;
        }
        else if (y == 0){//①开头不匹配；②中间过程从头开始匹配。即y=next[y]=0,且两个不同
            x++;
        }
        else {
            y = next[y];//x位置转为与next[y]来进行比对
        }
    }
    return y == m ? x - y : -1;
}
//复杂度为O(m)
public static int[] nextArray(char[] s,int m){
    if(m == 1){
        return new int[] {-1};
    }
    int[] next new int[m];
    next[0] = -1;
    next[1] = 0;
    int i = 2, cn = 0;
    while (i < m){
        if (s[i - 1] == s[cn]){
            next[i++] = ++cn;//通过这句代码修改cn的值
        }
        else if (cn > 0){
            cn = next[cn];
        }
        else {
            next [i++] = 0;
        }
    }
}
```

### 时间复杂度分析

生成next的数组过程中，
if：i++，i-cn不变
else if：i不变，i-cn增加
else：i++，i-cn增加

因为i<m,i-cn<m,所以总复杂度<O(2m),所以生成next的复杂度为O(m)

KPM过程中：
if：x++,x-y不变
else if: x++,x-y增加
else:x不变,x-y增加

x<n,x-y<n,复杂度<O(2n),O(nS)

## 例题

### 判断子树

有两棵二叉树root和subRoot，检验root中是否包含和subRoot具有相同结构和结点的子树，如果存在返回ture，否则返回false
