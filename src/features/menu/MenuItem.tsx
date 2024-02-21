import { formatCurrency } from '../../utils/helpers';
import { Pizza } from './Menu';

interface Props {
  pizza: Pizza;
}

const MenuItem = (props: Props) => {
  const { pizza } = props;
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li>
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(', ')}</p>
        <div>{!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}</div>
      </div>
    </li>
  );
};

export default MenuItem;
