import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Username = () => {
  const username = useSelector((state: RootState) => state.user.username);

  if (!username) {
    return null;
  }

  return <div className='text-sm font-semibold md:block hidden'>{username}</div>;
};

export default Username;
