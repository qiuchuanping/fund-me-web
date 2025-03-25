
import './App.css';
import Web3 from 'web3';
import React, { useState } from 'react';
import FundMeABI from './FundMeABI.json';



function App() {

  const [web3, setWeb3] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [status,setStatus] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [fundMeContract, setFundMeContract] = useState(null);
  const [fundAmount,setFundAmount] = useState('');
  const [withdrawAmount,setWithdrawAmount] = useState('');

  const ContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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
            setErrorMessage('请安装钱包扩展程序（如 MetaMask）');
            return;
        }
        setStatus('连接中');
        // 请求用户授权访问钱包
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
        } else {
            setErrorMessage('未获取到钱包地址');
            return;
        }
        // 创建 Web3 实例
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        // 创建合约实例
        const fundMeContract = new web3.eth.Contract(FundMeABI, ContractAddress);
        setFundMeContract(fundMeContract);
        setStatus('连接成功');
        // 清除错误消息
        setErrorMessage('');
    } catch (error) {
        setErrorMessage(`连接钱包失败: ${error.message}`);
    }
  };

  // 查询余额
  const queryBalance = async () => {
    if (web3 && walletAddress && fundMeContract) {
      try {
          setStatus('查询中');
          const result = await fundMeContract.methods.balanceOf().call({ from: walletAddress });
          const fmtBalance = parseFloat(result).toFixed(2);
          setStatus('捐赠金额：'+fmtBalance + ' ETH');
          setErrorMessage('');
      } catch (error) {
        console.error("查询余额时出错:", error);
        setErrorMessage(`查询余额失败: ${error.message}`);
      }
    } else {
        setErrorMessage('请先连接钱包');
    }
  }
  // 捐赠
  const fund = async () => {
    if (web3 && walletAddress && fundMeContract) {
      try {
          setStatus('捐赠中');
          const result = await fundMeContract.methods.fund().send({ from: walletAddress,value: web3.utils.toWei(fundAmount, 'ether')});
          console.log('捐赠结果：'+result);
          setStatus('捐赠成功');
          setErrorMessage('');
      } catch (error) {
        console.error("捐赠时出错:", error);
        setErrorMessage(`捐赠失败: ${error.message}`);
      }
    }
  }
  // 提现
  const withdraw = async () => {
    console.log('提现金额：'+withdrawAmount);
    if (web3 && walletAddress && fundMeContract) {
      try {
          setStatus('提现中');
          const result = await fundMeContract.methods.withdraw(web3.utils.toWei(withdrawAmount, 'ether')).send({ from: walletAddress});
          console.log('提现结果：'+result);
          setStatus('提现成功');
          setErrorMessage('');
      } catch (error) {
        console.error("提现时出错:", error);
        setErrorMessage(`提现失败: ${error.message}`);
      }
    }
  }

  return (
    <div className="App">
      <div className="form-container">
        <h2 className="form-title">请给“我”捐赠</h2>
        <h3>{errorMessage}</h3>
        <div className="button-container">
          <button onClick={connectWallet}>连接钱包</button>
          <button onClick={queryBalance}>查询捐赠金额</button>
        </div>
        <div className="input-container">
          <input type="text" placeholder="输入捐赠金额" onChange={fundInputAmount}/>
          <button onClick={fund}>捐赠</button>
        </div>
        <div className="input-container">
          <input type="text" placeholder="输入提现金额" onChange={withdrawInputAmount}/>
          <button onClick={withdraw}>提现</button>
        </div>
        <p className="status">{status}</p>
        <p className="status">当前账户：{walletAddress}</p>
      </div>
    </div>
  );
}

export default App;
