import { useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';

export default function CustomerCheckoutPaymentComponent({
  secret,
  paymentId,
  price,
}) {
  const stripe = useStripe();
  const router = useRouter();

  const handle = async () => {
    try {
      await stripe.confirmCardPayment(secret, { payment_method: paymentId });
      router.replace('/');
    } catch (error) {
      alert('Unable to complete payment! Please try again');
    }
  };

  return (
    <div className='customer_checkout_payment'>
      <button className='customer_checkout_payment_button' onClick={handle}>
        Pay (JP¥ {price})
      </button>
    </div>
  );
}
