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

- `@Scope`调整组件扫描范围 
- `@Import`导入第三方类/组件
- `@Controller`控制层
- `@Service`业务层
- `@Repository`数据层

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


### 条件注解

- `@ConditionalOnClass(name = "name")`如果类路径中存在这个类，则触发指定行为
- `@ConditionalOnMissingClass`如果类路径中不存在这个类，则触发指定行为
- `@ConditionlOnBean(value = "value")`如果容器中存在这个bean组件(类型并非实例)，则触发指定行为
- `@ConditionlOnBean`如果容器中不存在这个bean组件，则出发指定行为

### 属性绑定

- `@ConfigurationProperties(prefix = "value")`绑定于`application.properties`
- `@EnableConfigurationProperties`

### 异常回滚

`@Transactional `注解用于确保方法中的所有数据库操作要么全部成功，要么全部失败（回滚），实现事务的原子性。

```java
@Transactional
public void batchInsertWithScoreUpdate(List<Sutuo> sutuos) {
    for (Sutuo sutuo : sutuos) {
        // 插入素拓记录
        sutuoMapper.InsertSutuo(sutuo);
        // 更新学生总分
        studentMapper.UpdateStudent(sutuo);
    }
}
```



### 自动装配

`@Autowired`将 Spring 容器中的 Bean 注入到目标类中。

```java
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public boolean login(String username, String password) {
        User user = userMapper.findByUsernameAndPassword(username, password);
        return user != null;
    }

    public boolean register(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        int result = userMapper.insertUser(user);
        return result > 0;
    }
}
```

### 多环境

`@profile`

```javaa
@Configuration
public class DataSourceConfig {

    //开发
    @Bean
    @Profile("dev")
    public MyDataSource dev(){
        MyDataSource myDataSource = new MyDataSource();
        myDataSource.setUsername("root");
        myDataSource.setPassword("123");
        myDataSource.setUrl("jdbc:mysql://localhost:3306/dev");
        return myDataSource;
    }

    //测试
    @Bean
    @Profile("test")
    public MyDataSource test(){
        MyDataSource myDataSource = new MyDataSource();
        myDataSource.setUsername("root");
        myDataSource.setPassword("123");
        myDataSource.setUrl("jdbc:mysql://localhost:3306/test");
        return myDataSource;
    }

    //生产
    @Bean
    @Profile("prod")
    public MyDataSource prod(){
        MyDataSource myDataSource = new MyDataSource();
        myDataSource.setUsername("root");
        myDataSource.setPassword("123");
        myDataSource.setUrl("jdbc:mysql://localhost:3306/prod");
        return myDataSource;
    }
}
```

## 容器

## AOP（面向切面编程）

注册时注册实现类，调用时调用接口

### 日志

#### 静态代理

&nbsp;&nbsp;&nbsp;&nbsp;编码期间决定好了代理关系

&nbsp;&nbsp;&nbsp;&nbsp;现有接口和实现这一接口的实现类`class1`，创建proxy软件包，在该包下写创建类`class2`，在类里创建该实现类类型的变量tagret并继承接口重写方法，在方法内调用target.方法，从而通过target实现一个静态代理，日志生成本质还是硬编码。

#### 动态代理

&nbsp;&nbsp;&nbsp;&nbsp;运行期间确定代理关系,目标对象必须有接口

```java
MathCalculator target = new MathCalculatorImpl();//目标对象
//接口MathCalculator
MathCalculator proxyInstance = (MathCalculator)Proxy.newProxyInstance(
	target.getClass().getClassLoader(),
    target.getClass().getInterfaces(),
    //类似于拦截器
    (proxy,methon,args)->{//lamda表达式，使用InvocationHandler内的invoke方法
        Object result = method.invoke(target, args);//调用目标对象的函数
        return result;
    }
);
//设目标对象内有一个add函数
int add = proxyInstance.add(1,2);
System.out.println(add);

//InvocationHandler h = new InvocationHandler(){
//    @Override
//    public Object invoke(Object proxy, Methon methon,Object[] args) throws Throwable {
//        //方法体
//    }
//}
```

&nbsp;&nbsp;&nbsp;&nbsp;该构造函数包含三个参数，目标对象的类加载器，目标对象实现的接口，执行处理器，`proxy`代理对象，·`methon`代理对象调用目标对象的方法，`args`调用的方法的参数

上述方法限定了日志的对象，可以使用如下方法

代理类：

```java
public class DynamicProxy {
    public static Object newProxyInstance(Object target) {

        return Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                (proxy, method, args) -> {
                    System.out.println("开始事务"+method.getName());
                    // 执行目标对象方法
                    Object returnValue = method.invoke(target, args);
                    System.out.println("提交事务");
                    return returnValue;
                }
        );
    }
}
```

测试类：

```java
@Test
void test(){
    //定义接口，创建一个代理类的对象
    MathCalculator proxyInstance = (MathCalculator) DynamicProxy.newProxyInstance(new MathCalculatorImpl());
    //设目标对象内有一个add函数
    int add = proxyInstance.add(1,2);
	System.out.println(add);
}
```

#### 动态代理简化版本

日志工具类：

```java
public class LogUtils {
    public static void logStart(String methodName, Object... args) {
        System.out.println("方法" + methodName + "开始执行，参数是" + Arrays.asList(args));
    }
    public static void logEnd(String methodName) {
        System.out.println("方法" + methodName + "执行结束");
    }
    public static void logReturn(String methodName, Object result) {
        System.out.println("方法" + methodName + "执行完成，结果是" + result);
    }
    public static void logException(String methodName, Exception e) {
        System.out.println("方法" + methodName + "出现异常，异常是" + e);
    }
}
```

代理类：

```java
public class DynamicProxy {
    public static Object newProxyInstance(Object target) {
        return Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                (proxy, method, args) -> {
                    String methodName = method.getName();
                    LogUtils log = new LogUtils();
                    log.logStart(methodName, args);
                    Object returnValue = null;
                    try{
                        returnValue = method.invoke(target, args);
                        log.logReturn(methodName, returnValue);
                    }catch (Exception e){
                        log.logException(methodName, e);
                    }finally {
                        log.logEnd(methodName);
                    }
                    return returnValue;
                }
        );
    }
}
```

测试类同上

#### 系统日志

```sh
2024-11-24T23:35:54.815+08:00  INFO 33088 --- [spring01] [           main] o.example.spring01.Spring01Application   : Starting Spring01Application using Java 22.0.1 with PID 33088 (D:\java-programs\spring01\target\classes started by 什么dodo in D:\java-programs\spring01)
2024-11-24T23:35:54.816+08:00  INFO 33088 --- [spring01] [           main] o.example.spring01.Spring01Application   : No active profile set, falling back to 1 default profile: "default"
2024-11-24T23:35:55.238+08:00  INFO 33088 --- [spring01] [           main] o.example.spring01.Spring01Application   : Started Spring01Application in 0.757 seconds (process running for 1.236)
```

时间日期 + 日志级别 +进程ID + --- + 线程名 + Logger名 + 消息

##### 日志级别

由低到高：`ALL`,`TRACE`,`DEBUG`,`INFO`,`WARN`,`FRROR`,`FATAL`,`OFF`只会打印指定级别以上的日志。

- `ALL`打印所有日志
- `TRACE`追踪框架详细流程日志，一般不使用
- `DEBUG`开发调试细节日志
- `INFO`关键、感兴趣信息日志
- `WARN`警告日志
- `FRROR`业务错误日志
- `FATAL`致命错误日志
- `OFF`关闭所有日志记录

可在`application.properties`中对日志级别进行配置

## web开发

### 自动配置

