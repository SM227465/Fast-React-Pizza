import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import { RootState } from '../../store';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

const Cart = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className='py-3 px-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2 className='mt-7 textxl font-semibold'>Your cart, {username}</h2>

      <ul className='divide-y divide-stone-200 border-b mt-3'>
        {cart.map((pizza) => (
          <CartItem item={pizza} key={pizza.pizzaId} />
        ))}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button type='primary' to='/order/new' disabled={false}>
          Order pizzas
        </Button>
        <Button type='secondary' onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
