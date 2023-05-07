import { useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';

export default function CustomerCheckoutPaymentComponent({
  secret,
  paymentId,
  productId,
  price,
}) {
  const stripe = useStripe();
  const router = useRouter();

  const handle = async () => {
    try {
      const { paymentIntent } = await stripe.confirmCardPayment(secret, {
        payment_method: paymentId,
      });

      if (!paymentIntent?.id) {
        alert('Unable to complete payment! Please try again');
        return;
      }

      const order = JSON.parse(localStorage.getItem('order')) || [];
      order.push({
        id: Date.now().toString(),
        productId,
        paymentId: paymentIntent.id,
        date: new Date().toLocaleDateString(),
      });
      localStorage.setItem('order', JSON.stringify(order));

      router.replace('/order');
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
