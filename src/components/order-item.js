import { PRODUCTS } from '@/shared/constants/products';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function OrderItemComponent({ order }) {
  const [status, setStatus] = useState('');
  const product = PRODUCTS.find(({ id }) => id === Number(order.productId));

  const fetchPaymentDetails = async () => {
    const response = await fetch(`/api/payment/${order.paymentId}`);
    const { status } = await response.json();
    setStatus(status);
  };

  useEffect(() => {
    fetchPaymentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='order_item'>
      <Image
        className='order_item_image'
        src={product.image}
        width={60}
        height={60}
        alt='product_image'
      />

      <div className='order_item_container'>
        <div className='order_item_container_row'>
          <p className='order_item_name'>{product.name}</p>
          <p>{order.date}</p>
        </div>
        <div className='order_item_container_row'>
          <p>JP¥ {product.price}</p>
          <p
            className={
              status === 'succeeded'
                ? 'order_item_status status_green'
                : 'order_item_status status_red'
            }
          >
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}
