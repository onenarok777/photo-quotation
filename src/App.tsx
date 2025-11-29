import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { ThemeController } from '@/components/ThemeController';

function App() {
  return (
    <>
      <ThemeController />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
