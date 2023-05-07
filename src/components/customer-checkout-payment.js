import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

export default function CustomerCheckoutPaymentComponent() {
  const stripe = useStripe();
  const elements = useElements();

  const handle = async () => {
    try {
      await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${window?.location?.origin}/product` },
      });
    } catch (error) {
      alert('Unable to complete payment! Please try again');
    }
  };

  return (
    <div className='customer_checkout_payment'>
      <PaymentElement />
      <button className='customer_checkout_payment_button' onClick={handle}>
        Pay
      </button>
    </div>
  );
}
