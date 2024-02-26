import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import { RootState } from '../store';
import Button from './Button';

const Home = () => {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <div className='my-10 text-center sm:my-16 px-4'>
      <h1 className='text-xl font-semibold mb-8 md:text-3xl'>
        The best pizza.
        <br />
        <span className='text-yellow-500'>Straight out of the oven, straight to you.</span>
      </h1>

      {username ? (
        <Button to='/menu' type='primary'>
          Continue ordering, {username}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
};

export default Home;
