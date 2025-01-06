import Container from "@mui/material/Container";
import { memo } from "react";

import SwapForm from "~/components/SwapForm";

function App() {
  return (
    <Container maxWidth="sm">
      <SwapForm />
    </Container>
  );
}

export default memo(App);
