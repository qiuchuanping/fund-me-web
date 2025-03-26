# Fund Me
本项目是一个基于以太坊区块链的智能合约应用，前端使用 React 构建，结合 Web3.js 库与以太坊区块链交互，并部署在 Sepolia 测试网络上运行。该应用允许用户`连接钱包`，向智能合约`捐赠`以太币，并在需要时从合约中`提取`捐赠资金，同时可以`查询`捐赠余额（捐赠总资金-已提取资金），`提取`功能必须是合约的拥有者才能使用。

该项目是作者入坑WEB3的第二个练手项目，在学习了Patrick Collins的《Foundry Fundamentals》系列课程后编码实现。

课程原地址：https://updraft.cyfrin.io/courses/foundry

B站精翻地址： https://www.bilibili.com/video/BV13a4y1F7V3

该项目没有采用Patrick老师的HTML前端+Javascript的模式，而是采用React，并结合Web3.js库开发，作为后端工程师来写前端，JS还凑合，CSS样式，布局什么的确实有点抠脑壳，按照惯例，必须祭出AI助手，面向AI编程，基本功能终于可以呈现了。

合约项目地址：https://github.com/qiuchuanping/fund-me.git

## 技术栈

- **前端框架**：React，用于构建用户界面，实现组件化开发和状态管理。
- **Web3 库**：Web3.js，用于与以太坊区块链进行交互，包括连接钱包、调用智能合约方法等。
- **chainlink/contracts 库**：智能合约开发库，与Chainlink 的价格预言机进行交互，获取加密货币的价格数据。
- **智能合约**：Solidity，编写 FundMe 智能合约，实现捐赠、提取、查询等业务功能。

## 环境搭建
- 环境准备，Node.js 和 Git 

```
node -v
v18.20.4

npm -v
10.7.0

git -v
```

- 修改npm镜像源

```
npm config set registry https://registry.npmmirror.com/
```

- 运行项目

```
# 进入工作目录,克隆项目到本地
git clone https://github.com/qiuchuanping/fund-me.git

# 进入项目目录
cd fund-me

# 安装
npm install

# 运行
npm run start
```
## 效果展示
![](https://raw.githubusercontent.com/qiuchuanping/fund-me-web/main/images/1.png)

## TIPS
> 当使用魔法时，可能会出现git push失败的情况，可通过为git设置代理解决,可针对单独仓库设置，也可全局设置
```shell
# 针对单个仓库
git config http.proxy http://127.0.0.1:7890
# 全局设置
git config --global http.proxy http://127.0.0.1:7890
```
> 取消代理
```shell
# 针对单个仓库
git config --unset http.proxy
# 全局设置
git config --global --unset http.proxy
```
> 查看代理
```shell
# 查看单个仓库代理
git config --get http.proxy
# 查看全局代理
git config --global --get http.proxy
```
