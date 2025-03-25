# Fund Me
本项目是一个基于以太坊区块链的智能合约应用，前端使用 React 构建，结合 Web3.js 库与以太坊区块链交互，并部署在 Sepolia 测试网络上运行。该应用允许用户连接钱包，向智能合约捐赠以太币，并在需要时从合约中提取捐赠资金，同时可以查询捐赠余额（捐赠总资金-已提取资金），提取和查询功能必须是合约的拥有者才能使用。

该项目是作者入坑WEB3的第二个练手项目，在学习了Patrick Collins的《Foundry Fundamentals》系列课程后手撸的项目。

课程原地址：https://updraft.cyfrin.io/courses/foundry
B站精翻地址： https://www.bilibili.com/video/BV13a4y1F7V3

该项目没有采用Patrick老师的HTML前端，前端采用React开发，作为后端工程师来写前端，JS还凑合，CSS样式，布局什么的确实有点抠脑壳，按照惯例，必须祭出AI助手，面向AI编程，基本功能终于可以呈现了。

本次项目没有再使用Remix，而是使用了更专业的Foundry框架开发,更接近真实的开发环境，完成了开发、测试、部署等一系列操作。

合约项目地址：

## 技术栈

- **前端框架**：React，用于构建用户界面，实现组件化开发和状态管理。
- **Web3 库**：Web3.js，用于与以太坊区块链进行交互，包括连接钱包、调用智能合约方法等。
- **chainlink/contracts 库**：智能合约开发库，与Chainlink 的价格预言机进行交互，获取加密货币的价格数据。
- **智能合约**：Solidity，编写 FundMe 智能合约，处理捐赠、提取、查询等操作。

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