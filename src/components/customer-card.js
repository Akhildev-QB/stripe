import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import CustomerCardCreateComponent from './customer-card-create';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CustomerCardComponent({ id, payment, setPayment }) {
  const [secret, setSecret] = useState();

  const handle = async e => {
    if (e.target.value === 'new') {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      };
      const response = await fetch('api/payment-method/create', options);
      const { secret } = await response.json();
      setSecret(secret);
    }
  };

  const fetchPaymentDetails = async id => {
    const response = await fetch(`api/payment-method/${id}`);
    const { number, expiry } = await response.json();
    setPayment({ id, number, expiry });
    setSecret(null);
  };

  useEffect(() => {
    const id = localStorage.getItem('payment-id');
    if (id) fetchPaymentDetails(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='customer_card'>
      <p className='customer_card_title'>Choose a payment method</p>
      {payment && payment.hasOwnProperty('id') && (
        <label className='customer_card_row'>
          <input
            type='radio'
            name='card'
            value='old'
            onChange={handle}
            checked={!secret}
          />
          Use Existing Card ({payment.number}) {payment.expiry}
        </label>
      )}

      <label className='customer_card_row'>
        <input
          type='radio'
          name='card'
          value='new'
          onChange={handle}
          checked={!!secret}
        />
        Register New Card
      </label>

      {secret && (
        <>
          <Elements stripe={stripePromise} options={{ clientSecret: secret }}>
            <CustomerCardCreateComponent
              existingPaymentId={payment?.id}
              fetchPaymentDetails={fetchPaymentDetails}
            />
          </Elements>
        </>
      )}
    </div>
  );
}
