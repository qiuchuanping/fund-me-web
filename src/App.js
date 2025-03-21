import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* 新增表单部分 */}
      <div className="form-container">
        <h2 className="form-title">请给“我”捐赠</h2>
        <div className="button-container">
          <button>连接钱包</button>
          <button>查询捐赠金额</button>
          <button>提现</button>
        </div>
        <div className="input-container">
          <input type="text" placeholder="输入捐赠金额" />
          <button>捐赠</button>
        </div>
      </div>
    </div>
  );
}

export default App;
