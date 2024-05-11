import { useRoutes } from 'react-router-dom';

import { Exchange } from '@/features/exchange-currency';

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/exchange', element: <Exchange /> }];

  const element = useRoutes(commonRoutes);

  return <>{element}</>;
};
