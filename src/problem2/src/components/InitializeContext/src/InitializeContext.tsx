import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { useIsMounted } from '~/shared/useIsMounted';

type State = boolean;

const InitializeContext = createContext<State | undefined>(undefined);

export class AntCustomError extends Error {
  constructor() {
    super();
    this.message =
      'Components of "AntCustom" module must be used within the ThemeProvider from AntCustom. Make sure your component is wrapped with ThemeProvider.';
  }
}

/**
 * This hook ensures that the components of "AntCustom" using it is within the ThemeProvider.
 * If the context is undefined, it throws an error indicating that the component is not correctly placed within the AntCustom structure.
 */
export const useInitializeContext = (): void => {
  const context = useContext(InitializeContext);
  if (typeof context === 'undefined') {
    throw new AntCustomError();
  }
};

/**
 * Components from the `AntCustom` library should be wrapped with this provider to ensure they have access to the required context.
 */
export const InitializeProvider: FC<PropsWithChildren> = ({ children }) => {
  const isMounted = useIsMounted();

  return <InitializeContext.Provider value={isMounted}>{children}</InitializeContext.Provider>;
};
