export default function CustomerDataComponent({ customer }) {
  return (
    <div className='customer_data'>
      <div className='customer_data_row'>
        <p className='customer_data_row_label'>Customer Id: </p>
        <p>{customer.id}</p>
      </div>
    </div>
  );
}
