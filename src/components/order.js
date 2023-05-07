import { useEffect, useState } from 'react';
import OrderItemComponent from './order-item';

export default function OrderComponent() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('order')) || [];
    setOrders(orders);
  }, []);

  return (
    <div className='order'>
      <p className='order_title'>Recent Orders</p>

      {orders.map(order => (
        <OrderItemComponent key={order.id} order={order} />
      ))}
    </div>
  );
}
