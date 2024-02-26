import { FormEvent, useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username) {
      return;
    }

    dispatch(updateName(username));
    navigate('/menu');
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-600 md:text-base'>
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className='w-72 input mb-8'
        type='text'
        placeholder='Your full name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username && (
        <div>
          <Button disabled={false} type='primary'>
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
};

export default CreateUser;
