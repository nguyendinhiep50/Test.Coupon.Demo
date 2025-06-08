import { useSelector } from "react-redux";
import { Product } from "store/slices/productSlice";
import { RootState } from "store/store";
const ProductList = () => {
  const products = useSelector((state: RootState) => state.product.products);

  return (
    <ul>
      {products.map((p: Product) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
};

export default ProductList;
