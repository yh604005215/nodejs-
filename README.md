# nodejs实战

## 项目起步

1. 创建了运程仓库
2. 克隆到本地电脑
3. 做了一些项目初始化的一些操作
4. 创建一个.gitignore 文件，对不需要版本管理的文件做忽略

## 二、项目目录结构介绍


## 三、MVC 的架构模式

1. M    model   数据层
2. V    view    视图层
3. C    controller  控制层  

## 四、接口文档

##### 使用步骤

1. 安装 apidoc

```bash
 npm install apidoc -g
``` 
apidoc 提供了一个 apidoc 的命令， 可以通过 apidoc -v 去验证


2. 在每一个路由代码前写上 apidoc 规定的注释信息
3. 在项目跟目录下创建一个 apidoc.json 文件，配置api接口文档的一些描述信息
4. 通过 apidoc 的命令生成 api 接口文档

```bash
apidoc -i 写注释的路径/ -o 文档的输出路径

apidoc -i ./routers -o ./docs
```
5. 访问文档