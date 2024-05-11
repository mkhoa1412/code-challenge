import { useRoutes } from 'react-router-dom';

import { Exchange } from '@/features/exchange-currency';
import { NotFound } from '@/features/misc';

export const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <Exchange /> },
    { path: '*', element: <NotFound /> },
  ];

  const element = useRoutes(commonRoutes);

  return <>{element}</>;
};
