##  framework

## common
```txt
📦common
 ┣ 📂constant 
 ┃ ┣ 📜CacheConstants.java 缓存的key 常量
 ┃ ┣ 📜Constants.java 通用常量信息
 ┃ ┣ 📜GenConstants.java 代码生成通用常量
 ┃ ┣ 📜HttpStatus.java 返回状态码
 ┃ ┣ 📜ScheduleConstants.java 任务调度通用常量
 ┃ ┗ 📜UserConstants.java 用户常量信息
 ┣ 📂core
 ┃ ┗ 📂text
 ┃ ┃ ┣ 📜CharsetKit.java 字符集工具类
 ┃ ┃ ┣ 📜Convert.java 类型转换器
 ┃ ┃ ┗ 📜StrFormatter.java 字符串格式化
 ┣ 📂enums
 ┃ ┣ 📜HttpMethod.java 请求方式
 ┃ ┗ 📜UserStatus.java 用户状态
 ┣ 📂exception 异常相关的类
 ┃ ┣ 📂base
 ┃ ┃ ┗ 📜BaseException.java  基础异常
 ┃ ┣ 📂file 异常相关的类
 ┃ ┃ ┣ 📜FileException.java 文件信息异常类
 ┃ ┃ ┣ 📜FileNameLengthLimitExceededException.java 
 ┃ ┃ ┣ 📜FileSizeLimitExceededException.java
 ┃ ┃ ┣ 📜FileUploadException.java
 ┃ ┃ ┗ 📜InvalidExtensionException.java
 ┃ ┣ 📂job
 ┃ ┃ ┗ 📜TaskException.java
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📜BlackListException.java
 ┃ ┃ ┣ 📜CaptchaException.java
 ┃ ┃ ┣ 📜CaptchaExpireException.java
 ┃ ┃ ┣ 📜UserException.java
 ┃ ┃ ┣ 📜UserNotExistsException.java
 ┃ ┃ ┣ 📜UserPasswordNotMatchException.java
 ┃ ┃ ┗ 📜UserPasswordRetryLimitExceedException.java
 ┃ ┣ 📜DemoModeException.java
 ┃ ┣ 📜GlobalException.java
 ┃ ┣ 📜ServiceException.java
 ┃ ┗ 📜UtilException.java
 ┣ 📂filter 过滤器
 ┃ ┣ 📜PropertyPreExcludeFilter.java
 ┃ ┣ 📜RefererFilter.java
 ┃ ┣ 📜RepeatableFilter.java
 ┃ ┣ 📜RepeatedlyRequestWrapper.java
 ┃ ┣ 📜XssFilter.java
 ┃ ┗ 📜XssHttpServletRequestWrapper.java
 ┣ 📂utils 工具类
 ┃ ┣ 📂bean
 ┃ ┃ ┣ 📜BeanUtils.java
 ┃ ┃ ┗ 📜BeanValidators.java
 ┃ ┣ 📂file
 ┃ ┃ ┣ 📜FileTypeUtils.java
 ┃ ┃ ┣ 📜FileUploadUtils.java
 ┃ ┃ ┣ 📜FileUtils.java
 ┃ ┃ ┣ 📜ImageUtils.java
 ┃ ┃ ┗ 📜MimeTypeUtils.java
 ┃ ┣ 📂html
 ┃ ┃ ┣ 📜EscapeUtil.java
 ┃ ┃ ┗ 📜HTMLFilter.java
 ┃ ┣ 📂http
 ┃ ┃ ┣ 📜HttpHelper.java
 ┃ ┃ ┗ 📜HttpUtils.java
 ┃ ┣ 📂ip
 ┃ ┃ ┣ 📜AddressUtils.java
 ┃ ┃ ┗ 📜IpUtils.java
 ┃ ┣ 📂job
 ┃ ┃ ┣ 📜AbstractQuartzJob.java
 ┃ ┃ ┣ 📜CronUtils.java
 ┃ ┃ ┣ 📜JobInvokeUtil.java
 ┃ ┃ ┣ 📜QuartzDisallowConcurrentExecution.java
 ┃ ┃ ┣ 📜QuartzJobExecution.java
 ┃ ┃ ┗ 📜ScheduleUtils.java
 ┃ ┣ 📂poi
 ┃ ┃ ┣ 📜ExcelHandlerAdapter.java
 ┃ ┃ ┗ 📜ExcelUtil.java
 ┃ ┣ 📂reflect
 ┃ ┃ ┗ 📜ReflectUtils.java
 ┃ ┣ 📂sign
 ┃ ┃ ┣ 📜Base64.java
 ┃ ┃ ┗ 📜Md5Utils.java
 ┃ ┣ 📂spring
 ┃ ┃ ┗ 📜SpringUtils.java
 ┃ ┣ 📂sql
 ┃ ┃ ┗ 📜SqlUtil.java
 ┃ ┣ 📂uuid
 ┃ ┃ ┣ 📜IdUtils.java
 ┃ ┃ ┣ 📜Seq.java
 ┃ ┃ ┗ 📜UUID.java
 ┃ ┣ 📜Arith.java
 ┃ ┣ 📜DateUtils.java
 ┃ ┣ 📜DesensitizedUtil.java
 ┃ ┣ 📜DictUtils.java
 ┃ ┣ 📜ExceptionUtil.java
 ┃ ┣ 📜LogUtils.java
 ┃ ┣ 📜MessageUtils.java
 ┃ ┣ 📜PageUtils.java
 ┃ ┣ 📜SecurityUtils.java
 ┃ ┣ 📜ServletUtils.java
 ┃ ┣ 📜StringUtils.java
 ┃ ┗ 📜Threads.java
 ┗ 📂xss
 ┃ ┣ 📜Xss.java
 ┃ ┗ 📜XssValidator.java
```

