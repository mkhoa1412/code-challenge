import { Button, Spin } from "antd";

const SwapButton = ({ onClick, loading }) => (
  <Button type="primary" block onClick={onClick} disabled={loading}>
    {loading ? <Spin /> : "Swap"}
  </Button>
);

export default SwapButton;
