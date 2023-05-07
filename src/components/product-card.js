import Image from 'next/image';
import { useRouter } from 'next/router';

export default function ProductCardComponent({ product }) {
  const router = useRouter();
  const handle = () => {
    router.push({ pathname: 'checkout', query: { id: product.id } });
  };

  return (
    <div className='product_card'>
      <Image
        className='product_card_image'
        src={product.image}
        width={250}
        height={250}
        alt='product_image'
      />
      <div className='product_card_details'>
        <p className='product_card_name'>{product.name}</p>
        <p className='product_card_price'>JP¥{product.price}</p>

        <button onClick={handle} className='product_card_button'>
          Buy Now
        </button>
      </div>
    </div>
  );
}
