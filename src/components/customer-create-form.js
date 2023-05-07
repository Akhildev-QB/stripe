import { useRef } from 'react';

export default function CustomerCreateFormComponent({ setCustomer }) {
  const nameRef = useRef();
  const emailRef = useRef();
  const userIdRef = useRef();

  const handleCreate = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const userId = userIdRef.current.value;

    if (!name || !email || !userId) {
      alert('Please fill required fields');
      return;
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, userId }),
    };
    const response = await fetch('api/customer/create', options);
    const { id } = await response.json();

    if (id) {
      setCustomer({ id });
      localStorage.setItem('customer-id', id);
    } else {
      alert('Unable to create customer! Please try again');
      return;
    }
  };

  return (
    <div className='customer_create_form'>
      <div className='customer_create_form_row'>
        <label>Name</label>
        <input type='text' id='name' ref={nameRef} />
      </div>

      <div className='customer_create_form_row'>
        <label>Email</label>
        <input type='email' id='email' ref={emailRef} />
      </div>

      <div className='customer_create_form_row'>
        <label>User Id</label>
        <input type='text' id='user_id' ref={userIdRef} />
      </div>

      <button className='customer_create_form_button' onClick={handleCreate}>
        Create customer Account
      </button>
    </div>
  );
}
