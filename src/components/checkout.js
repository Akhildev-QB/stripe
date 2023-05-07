import CustomerComponent from './customer';

export default function CheckoutComponent({ productId }) {
  return (
    <div className='checkout'>
      <CustomerComponent productId={productId} />
    </div>
  );
}
