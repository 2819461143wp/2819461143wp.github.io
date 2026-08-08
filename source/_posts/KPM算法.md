---
title: KPM算法
date: 2024-10-10 08:46:46
categories:
  - note
  - 408
  - 算法
tags: [算法]
index_img:
banner_img: /images/壁纸.jpg
---
判断`S1` 字符串是否包含`S2`字符串，如果包含返回`S1`中包含`S2`的最做开头的位置，不包含返回`-1`
## 算法思想

### next数组

针对较大的那个串，不含当前下标，当前下标字符的前面字符串的前后缀最大匹配长度（不含这个字符串整体），0下标位置的的`next`为`-1`

|      |     |     |     |     |     |     |     |     |     |
| ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 字符串  | a   | a   | b   | a   | a   | b   | s   | a   | b   |
| 下标   | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   |
| next | -1  | 0   | 1   | 0   | 1   | 2   | 3   | 0   | 1   |
aabaabsaabaaa

例如
求下标2位置的next的值
aa
"" "" √  长度0
a b √    长度1
aa aa × 不能为这个字符串整体

求下标3位置的next的值
aab
"" "" √  长度0
a b ×    长度1
aa ab×   长度2

因此`next`数组元素会比字符串元素多一位可补终止位置的next值

设`S1`为`A B A C...`，`S2` 为`A...`，其中ABC表示由若干个字符组成的字符串，他们及其子串都没有头尾相同的情况

当移动到C的第一个字符位置发现不匹配了，就把`S2`的头对其`S1`的第二个A的位置，然后直接从C的第一个字符与`A.length()`下标的`S2`的字符进行匹配，这个`A.length()`其实就是`S1`的C第一个字符位置`next`数组的值

当移动到B的第一个字符位置发现不匹配了，就就把`S2`的头对其`S1`的B的位置，直接从B与`S2`的开头进行对比
同理上面，其实是将B的字符与`S2[next[B]]`的位置进行比较，然后B位置的`next`的值为0


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

方法一：暴力递归O(n*m)

```java
public static boolean isSubtree(TreeNode t1, TreeNode t2){
    if(t1 != null && t2 != null){
        return same(t1, t2)||isSubtree(t1.left, t2)||isSubtree(t1.right, t2);
    }
    //t1!=null t2==null true
    //t1==null t2!=null false
    //t1==null t2==null true
    return t2 == null;
}
//判断a和b是否完全一样
public static boolean same(TreeNode a, TreeNode b){
    if(a == null && b == null){
        return true;
    }
    if(a != null && b != null){
        return a.val == b.val && same(a.left, b.left) && same(a.right, b.right);
    }
}
```

方法二：二叉树先序序列化+KMP算法匹配O(n+m)
&nbsp;&nbsp;&nbsp;&nbsp;判断t2序列化后是否为t1序列化后的子串

```java
public static boolean isSubtree2(TreeNode t1, TreeNode t2){
    if(t1 != bull && t2 != null){
        ArrayList<String> s1 = new ArrayList<>();
        ArrayList<String> s2 = new ArrayList<>();
        serial(t1, s1);
        serial(t2, s2);
        return kmp(s1, s2) != -1;
    }
    return t2 == null;
}

public static void serial(TreeNode head, ArrayList<String> path){
    if(head == null){
        path.add(null);
    }
    else{
        path.add(String.valueOf(head.val));
        serial(head.left, path);
        serial(head.right, path);
    }
}
```
