import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import Order from './Order';
import { updateOrder } from '../../services/apiRestaurant';

interface Props {
  order: Order;
}

const UpdateOrder = (props: Props) => {
  const {} = props;

  const fetcher = useFetcher();

  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary'>Make priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

export const action = async ({ params }: { params: any }) => {
  const payload = { priority: true };
  await updateOrder(params.orderId, payload);
  return null;
};
