import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../store';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';

interface Formdata {
  address: string;
  customer: string;
  phone: string;
  priority: boolean;
}

const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

const CreateOrder = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const navigation = useNavigation();
  const [withPriority, setWithPriority] = useState(false);

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData() as Formdata;

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            className='input grow'
            type='text'
            name='customer'
            required
            defaultValue={username}
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type='tel' name='phone' required />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input className='input w-full' type='text' name='address' required />
          </div>
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            checked={withPriority}
            onChange={(event) => setWithPriority(event.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type='primary'>
            {isSubmitting ? 'Placing order....' : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    phone: data.phone as string,
    cart: JSON.parse(data.cart as string),
    priority: (data.priority as string) === 'on',
  };

  const errors = {} as Formdata;

  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please provide a valid phone number';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
