import Link from 'next/link';

export default function NavigationBarComponent() {
  return (
    <nav className='navigation_bar'>
      <ul className='navigation_bar_list'>
        <li className='navigation_bar_list_item'>
          <Link href='/'>Akzcart</Link>
        </li>

        <div className='navigation_bar_list_item_group'>
          <li className='navigation_bar_list_item'>
            <Link href='/product'>Product</Link>
          </li>

          <li className='navigation_bar_list_item'>
            <Link href='/order'>Order</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
