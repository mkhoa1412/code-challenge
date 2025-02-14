import { InputNumber } from "antd";

const AmountInput = ({ value, onChange }) => <InputNumber placeholder="Amount" value={value} onChange={onChange} style={{ width: "100%", marginBottom: 10 }} />;

export default AmountInput;
