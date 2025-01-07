import styled from 'styled-components';
import { CurrencySwapForm } from './components';

function App() {
  return (
    <StyledApp>
      <CurrencySwapForm />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
