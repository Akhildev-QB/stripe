import { PRODUCTS } from '@/shared/constants/products';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import CustomerCheckoutPaymentComponent from './customer-checkout-payment';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CustomerCheckoutComponent({
  productId,
  customerId,
  paymentId,
}) {
  const [secret, setSecret] = useState();
  const product = PRODUCTS.find(({ id }) => id === Number(productId));

  const handle = async () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, customerId, paymentId }),
    };
    const response = await fetch('api/payment/create', options);
    const { secret } = await response.json();
    setSecret(secret);
  };

  return (
    <div className='customer_checkout'>
      {secret ? (
        <Elements stripe={stripePromise} options={{ clientSecret: secret }}>
          <CustomerCheckoutPaymentComponent
            secret={secret}
            paymentId={paymentId}
            productId={productId}
            price={product?.price}
          />
        </Elements>
      ) : (
        <button className='customer_checkout_button' onClick={handle}>
          Proceed to checkout (JP¥ {product?.price})
        </button>
      )}
    </div>
  );
}
