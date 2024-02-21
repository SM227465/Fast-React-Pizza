import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

export interface Pizza {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

const Menu = () => {
  const menu = useLoaderData() as Pizza[];

  // console.log('Menu', menu);

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
};

export const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
