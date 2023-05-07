import { useEffect, useState } from 'react';
import CustomerCardComponent from './customer-card';
import CustomerCheckoutComponent from './customer-checkout';
import CustomerCreateFormComponent from './customer-create-form';
import CustomerDataComponent from './customer-data';

export default function CustomerComponent({ productId }) {
  const [customer, setCustomer] = useState({});
  const [payment, setPayment] = useState();

  const fetchCustomerDetails = async id => {
    const response = await fetch(`api/customer/${id}`);
    const data = await response.json();
    setCustomer(data);
  };

  useEffect(() => {
    const id = localStorage.getItem('customer-id');
    if (id) {
      setCustomer({ id });
      fetchCustomerDetails(id);
    }
  }, []);

  return (
    <div className='customer'>
      <p className='customer_title'>Checkout</p>

      {customer && customer.hasOwnProperty('id') ? (
        <>
          <CustomerDataComponent customer={customer} />
          <CustomerCardComponent
            id={customer.id}
            payment={payment}
            setPayment={setPayment}
          />
        </>
      ) : (
        <CustomerCreateFormComponent
          fetchCustomerDetails={fetchCustomerDetails}
        />
      )}

      {payment && payment.hasOwnProperty('id') && (
        <CustomerCheckoutComponent
          productId={productId}
          customerId={customer.id}
          paymentId={payment.id}
        />
      )}
    </div>
  );
}
