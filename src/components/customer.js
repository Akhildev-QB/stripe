import { useEffect, useState } from 'react';
import CustomerCreateFormComponent from './customer-create-form';
import CustomerDataComponent from './customer-data';

export default function CustomerComponent() {
  const [customer, setCustomer] = useState({});

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
      <p className='customer_title'>Order Processing</p>
      {customer && customer.hasOwnProperty('id') ? (
        <CustomerDataComponent customer={customer} />
      ) : (
        <CustomerCreateFormComponent setCustomer={setCustomer} />
      )}
    </div>
  );
}
