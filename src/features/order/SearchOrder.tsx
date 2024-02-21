import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchOrder = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query) {
      return;
    }

    navigate(`/order/${query}`);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='Search order #'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      ></input>
    </form>
  );
};

export default SearchOrder;
