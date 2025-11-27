
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="py-4">Page not found</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
};
