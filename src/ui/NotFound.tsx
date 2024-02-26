import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

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
  const error = useRouteError() as RouteError;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <LinkButton to='-1'>&larr; Go back</LinkButton>
    </div>
  );
};

export default NotFound;
