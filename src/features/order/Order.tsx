// Test ID: IIDSAT

import { LoaderFunction, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers';

interface Order {
  customer: string;
  status: string;
  priority: boolean;
  cart: {
    addIngredients: string[];
    removeIngredients: string[];
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  id: string;
  estimatedDelivery: string;
  orderPrice: number;
  priorityPrice: number;
}

const Order = () => {
  const order = useLoaderData() as Order;
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
};

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  if (!params?.orderId) {
    throw new Error('Order ID is missing in the route parameters.');
  }

  const order = await getOrder(params.orderId);

  return order;
};

export default Order;
