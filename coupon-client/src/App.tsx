import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import './App.css';
import logo from './img/logo.svg';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.products);
  const loading = products.length === 0;

  useEffect(() => {
    fetch("https://localhost:7077/api/Products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log("Dữ liệu lấy từ API:", data);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch sản phẩm:", err);
      });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Danh sách sản phẩm</h2>
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
