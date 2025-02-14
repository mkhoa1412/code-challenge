import { Select } from "antd";

const { Option } = Select;

const TokenSelect = ({ tokens, value, onChange, placeholder }) => (
  <Select placeholder={placeholder} value={value} onChange={onChange} style={{ width: "100%", marginBottom: 10 }}>
    {tokens.map((token, index) => (
      <Option key={index} value={token.currency}>
        <img src={token.imageUrl} width="20" height="20" style={{ marginRight: 8, position: "relative", top: 5 }} />
        {token.currency}
      </Option>
    ))}
  </Select>
);

export default TokenSelect;
