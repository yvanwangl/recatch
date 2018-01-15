## 博客项目第二版管理后台 代号 recatch

该项目为我的个人博客第二版，实现功能：
`1.`博客数据预览
`2.`标签管理
`3.`文章管理
`4.`评论管理
`5.`项目管理
`6.`友链管理
`7.`个人信息设置
等7个模块功能。

[在线预览地址](https://admin.yvanwang.com/)
暂时没有开发注册功能。。。

### 项目技术栈
该项目采用前后端分离技术，前端依然采用 React 系列技术栈，包括： react/redux/redux-form/redux-orm/react-router v4/material-ui，使用 Typescript 进行代码编写。

### 如何运行
`1.` `https://github.com/yvanwangl/recatch.git`
`2.` `cd recatch && npm install`
`3.` `npm run start`

### 项目构建
`1.` 通过 `npm run build` 进行项目构建

### 项目部署
该项目支持两种部署方式：
`1.` 基于node环境部署：
`npm run start:prod`

`2.`部署 docker 容器：
首先构建 docker 镜像：`docker build --rm -f Dockerfile -t recatch:latest .`
然后运行容器：`docker run -d -it recatch:latest`
