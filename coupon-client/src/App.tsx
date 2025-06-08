import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import './App.css';
import logo from './img/logo.svg';
import { setProducts } from "store/slices/productSlice";
import type { Product } from "store/slices/productSlice";
import ProductList from "component/productItem";

function App() {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLoadProducts = () => {
    setLoading(true);
    fetch("https://localhost:7077/api/Products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Product[]) => {
        dispatch(setProducts(data));
      })
      .catch((err) => {
        console.error("Lỗi khi fetch sản phẩm:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Danh sách sản phẩm</h2>

        <button onClick={handleLoadProducts} disabled={loading}>
          {loading ? "Đang tải..." : "Tải sản phẩm"}
        </button>

        {products.length > 0 && <ProductList />}
      </header>
    </div>
  );
}

export default App;
