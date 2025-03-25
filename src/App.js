
import './App.css';
import Web3 from 'web3';
import React, { useState } from 'react';
import FundMeABI from './FundMeABI.json';



function App() {

  const [web3, setWeb3] = useState(null);
  const [message, setMessage] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [fundMeContract, setFundMeContract] = useState(null);
  const [fundAmount,setFundAmount] = useState('');
  const [withdrawAmount,setWithdrawAmount] = useState('');

  // const ContractAddress = "0xF1Bb350D88b7C61ffdE94cd638b784DC08DA0b85";
  const ContractAddress = "0x3DD817E767a6d762eF5d13bAAb0e7Dc784Ce7a07";

  const fundInputAmount = (e) => {
    setFundAmount(e.target.value);
  }
  const withdrawInputAmount = (e) => {
    setWithdrawAmount(e.target.value);
  }

  // 连接钱包
  const connectWallet = async () => {
    try {
        // 检查是否安装了钱包扩展程序
        if (!window.ethereum) {
            setMessage('请安装钱包扩展程序（如 MetaMask）');
            return;
        }
        setMessage('连接中');
        // 请求用户授权访问钱包
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
        } else {
            setMessage('未获取到钱包地址');
            return;
        }
        // 创建 Web3 实例
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        // 创建合约实例
        const fundMeContract = new web3.eth.Contract(FundMeABI, ContractAddress);
        setFundMeContract(fundMeContract);
        setMessage('连接成功');
    } catch (error) {
        setMessage(`连接钱包失败: ${error.message}`);
    }
  };

  // 查询余额
  const queryBalance = async () => {
    if (web3 && walletAddress && fundMeContract) {
      try {
          setMessage('查询中');
          const result = await fundMeContract.methods.balanceOf().call({ from: walletAddress });
          console.log('余额：'+result);
          const fmtBalance = web3.utils.fromWei(result, 'ether');
          setMessage('捐赠金额：'+fmtBalance + ' ETH');
      } catch (error) {
        console.error("查询余额时出错:", error);
        setMessage("查询余额失败");
      }
    } else {
      setMessage('请先连接钱包');
    }
  }
  // 捐赠
  const fund = async () => {
    if (web3 && walletAddress && fundMeContract) {
      try {
          setMessage('捐赠中');
          const result = await fundMeContract.methods.fund().send({ from: walletAddress,value: web3.utils.toWei(fundAmount, 'ether')});
          console.log('捐赠结果：'+result);
          setMessage('捐赠成功');
      } catch (error) {
        console.error("捐赠时出错:", error);
        setMessage("捐赠失败");
      }
    }
  }
  // 提现
  const withdraw = async () => {
    console.log('提现金额：'+withdrawAmount);
    if (web3 && walletAddress && fundMeContract) {
      try {
          setMessage('提现中');
          const result = await fundMeContract.methods.withdraw(web3.utils.toWei(withdrawAmount, 'ether')).send({ from: walletAddress});
          console.log('提现结果：'+ result);
          setMessage('提现成功');
      } catch (error) {
        console.error("提现时出错:", error);
        setMessage("提现失败");
      }
    }
  }

  return (
    <div className="App">
      <div className="form-container">
        <h2 className="form-title">请给“我”捐赠</h2>
        <div>【测试网络：Sepolia，最低捐赠 2.00 美元，约 0.001 ETH 】<br/>
        【合约地址：0x3DD817E767a6d762eF5d13bAAb0e7Dc784Ce7a07】</div>
        <h4>【当前账户：{walletAddress}】</h4>
        <div className="button-container">
          <button onClick={connectWallet}>连接钱包</button>
          <button onClick={queryBalance}>查询捐赠金额</button>
        </div>
        <div className="input-container">
          <input type="text" placeholder="输入捐赠金额（ETH）" onChange={fundInputAmount}/>
          <button onClick={fund}>捐赠</button>
        </div>
        <div className="input-container">
          <input type="text" placeholder="输入提现金额（ETH）" onChange={withdrawInputAmount}/>
          <button onClick={withdraw}>提现</button>
        </div>
        <p className="status">{message}</p>
      </div>
    </div>
  );
}

export default App;
