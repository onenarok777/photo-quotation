import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { QuotationPage } from '@/pages/QuotationPage';
import { DesignPage } from '@/pages/DesignPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/quotation',
    element: <QuotationPage />,
  },
  {
    path: '/design',
    element: <DesignPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
