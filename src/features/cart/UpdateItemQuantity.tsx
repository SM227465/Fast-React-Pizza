import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

interface Props {
  pizzaId: number;
  currentQuantity: number;
}

const UpdateItemQuantity = (props: Props) => {
  const { pizzaId, currentQuantity } = props;
  const dispatch = useDispatch();

  const handleItemDecremnt = () => {
    dispatch(decreaseItemQuantity(pizzaId));
  };

  const handleItemIncrement = () => {
    dispatch(increaseItemQuantity(pizzaId));
  };

  return (
    <div className='flex gap-2 items-center md:gap-3'>
      <Button type='round' onClick={handleItemDecremnt}>
        -
      </Button>
      <span className='text-sm font-medium'>{currentQuantity}</span>
      <Button type='round' onClick={handleItemIncrement}>
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
