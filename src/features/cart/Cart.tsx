import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';

export interface Cart {
  addIngredients: string[];
  removeIngredients: string[];
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const fakeCart = [
  {
    addIngredients: [],
    removeIngredients: [],
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    addIngredients: [],
    removeIngredients: [],
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    addIngredients: [],
    removeIngredients: [],
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

const Cart = () => {
  const carts = fakeCart;
  return (
    <div className='py-3 px-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2 className='mt-7 textxl font-semibold'>Your cart, %NAME%</h2>

      <ul className='divide-y divide-stone-200 border-b mt-3'>
        {carts.map((cart) => (
          <CartItem item={cart} key={cart.pizzaId} />
        ))}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button type='primary' to='/order/new' disabled={false}>
          Order pizzas
        </Button>
        {/* <LinkButton to='/order/new'></LinkButton> */}
        <Button type='secondary' disabled={false}>
          Clear cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
