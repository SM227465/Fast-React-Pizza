import { formatCurrency } from '../../utils/helpers';

interface props {
  item: any;
  ingredients: string[];
  isLoadingIngredients: 'idle' | 'loading' | 'submitting';
}

const OrderItem = (props: props) => {
  const { item, ingredients, isLoadingIngredients } = props;
  const { quantity, name, totalPrice } = item;

  return (
    <li className='py-3 space-y-1'>
      <div className='flex items-center justify-between gap-4 text-sm'>
        <p>
          <span className='font-bold'>{quantity}&times;</span> {name}
        </p>
        <p className='font-bold'>{formatCurrency(totalPrice)}</p>
      </div>
      <p className='text-sm capitalize italic, text-stone-500'>
        {isLoadingIngredients === 'loading' ? 'loading...' : ingredients?.join(', ')}
      </p>
    </li>
  );
};

export default OrderItem;
