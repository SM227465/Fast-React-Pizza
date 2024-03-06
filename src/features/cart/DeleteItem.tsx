import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

interface Props {
  pizzaId: number;
}

const DeleteItem = (props: Props) => {
  const { pizzaId } = props;
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteItem(pizzaId));
  };

  return (
    <Button type='small' onClick={handleDeleteItem}>
      Delete
    </Button>
  );
};

export default DeleteItem;
