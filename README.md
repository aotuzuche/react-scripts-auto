# react-scripts-auto

## 初始化项目

请使用npx安装，保证最新的版本

**注意：如果本机已经装有create-react-app，请务必删除它!**

另外，该脚手架目前只支持cra@3.2.0及以下的版本

```
npx create-react-app@3.2.0 myproject --scripts-version=react-scripts-auto
```


## Slot

Slot用于自动获取所有模块的共用代码，如监测代码、sentry等

在html模板的head和body中分别有`<!--HEADSLOT-->...<!--ENDHEADSLOT-->`和`<!--BODYSLOT-->...<!--ENDBODYSLOT-->`两段注释，**请不要在该注释之间编写代码**，因为在打包过程中该两段注释之间的内容会被远程模板替换，替换的内容在该项目的slot文件夹下

## Jenkins打包时

为了方便新老项目统一打包代码，所以在jenkins中的构建部分，`Execute shell`不再直接执行打包命令，统一执行`sh bin/test.sh`或`sh bin/prod.sh`，分别打测试包与正式包
