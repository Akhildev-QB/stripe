import { PRODUCTS } from '@/shared/constants/products';
import ProductCardComponent from './product-card';

export default function ProductContainerComponent() {
  return (
    <div className='product_container'>
      {PRODUCTS.map(product => (
        <ProductCardComponent key={product.id} product={product} />
      ))}
    </div>
  );
}
