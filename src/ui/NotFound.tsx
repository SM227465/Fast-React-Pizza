import { useNavigate, useRouteError } from 'react-router-dom';

interface RouteError {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  message: string;
  error: {
    message: string;
    stack: string;
  };
}

const NotFound = () => {
  const navigate = useNavigate();
  const error = useRouteError() as RouteError;

  console.log('E', error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
};

export default NotFound;
