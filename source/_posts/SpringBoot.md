---
title: SpringBoot
date: 2024-11-21 14:56:26
categories:
  - note
  - language
  - SpringBoot
tags: [language]
banner_img: /images/壁纸.jpg
---

## 常用注解

### 组件注册

```java
@Configuration//配置类来分类管理组件
public class PersonConfig {

    @Bean("zhangsan")//给容器中注册一个bean，类型为返回值的类型，id默认是方法名
    public Person zhangsan(){
        Person person=new Person();
        person.setName("zhangsan");
        person.setAge(18);
        person.setGender("男");
        return person;
    }

    @Bean("lisi")
    public Person lisi(){
        Person person=new Person();
        person.setName("lisi");
        person.setAge(20);
        person.setGender("男");
        return person;
    }
}
```

`@Scope`调整组件扫描范围 `@Import`导入第三方类/组件

### 条件注解

- `@ConditionalOnClass(name = "name")`如果类路径中存在这个类，则触发指定行为
- `@ConditionalOnMissingClass`如果类路径中不存在这个类，则触发指定行为
- `@ConditionlOnBean(value = "value")`如果容器中存在这个bean组件(类型并非实例)，则触发指定行为
- `@ConditionlOnBean`如果容器中不存在这个bean组件，则出发指定行为

### 属性绑定

- `@ConfigurationProperties(prefix = "value")`绑定于application.properties
- `@EnableConfigurationProperties`