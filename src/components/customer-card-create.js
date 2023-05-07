import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

export default function CustomerCardCreateComponent({
  existingPaymentId,
  fetchPaymentDetails,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const handle = async () => {
    const { setupIntent } = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
    });

    if (!setupIntent?.payment_method) {
      alert('Unable to register card');
      return;
    }

    if (existingPaymentId) {
      await fetch(`api/payment-method/detach/${existingPaymentId}`);
    }

    localStorage.setItem('payment-id', setupIntent.payment_method);
    fetchPaymentDetails(setupIntent.payment_method);
  };

  return (
    <div className='customer_card_create'>
      <PaymentElement />
      <button className='customer_card_create_button' onClick={handle}>
        Register
      </button>
    </div>
  );
}
