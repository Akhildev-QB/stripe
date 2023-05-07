export default function CustomerDataComponent({ customer }) {
  return (
    <div className='customer_data'>
      <div className='customer_data_row'>
        <p className='customer_data_row_label'>Customer Id: </p>
        <p>{customer.id}</p>
      </div>
      <div className='customer_data_row'>
        <p className='customer_data_row_label'>Name: </p>
        <p>{customer.name}</p>
      </div>
      <div className='customer_data_row'>
        <p className='customer_data_row_label'>Email: </p>
        <p>{customer.email}</p>
      </div>
      <div className='customer_data_row'>
        <p className='customer_data_row_label'>User Id: </p>
        <p>{customer.userId}</p>
      </div>
    </div>
  );
}
