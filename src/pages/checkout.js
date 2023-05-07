import CheckoutComponent from '@/components/checkout';
import { useRouter } from 'next/router';

export default function Checkout(props) {
  const { query } = useRouter();

  return (
    <main>
      <CheckoutComponent productId={query?.id} />
    </main>
  );
}
