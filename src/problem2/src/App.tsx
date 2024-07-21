import { Notification } from './components/Notification';
import { ConfigProvider } from 'antd';
import FormCurrency from './containers/FormCurrency/FormCurrency';
import { InitializeProvider } from './components/InitializeContext';

const prefix = 'yy';

function App() {
  return (
    <ConfigProvider
      popupMatchSelectWidth
      virtual
      popupOverflow='viewport'
      prefixCls={prefix}
      warning={{ strict: true }}
      theme={{
        cssVar: { prefix },
        hashed: false,
        inherit: false,
        token: {
          colorPrimary: 'rgba(22, 137, 252, 1)',
          colorSuccess: 'rgba(60, 159, 25, 1)',
          colorWarning: 'rgba(228, 137, 0, 1)',
          colorError: 'rgba(229, 58, 34, 1)',
          colorInfo: 'rgba(42, 133, 255, 1)',
          paddingMD: 15,
          fontSize: 14,
        },
        components: {
          Typography: {
            fontSizeHeading1: 32,
          },
          Dropdown: {
            paddingBlock: 12,
            controlPaddingHorizontal: 12,
          },
          Input: {
            controlHeight: 42,
          },
          InputNumber: {
            controlHeight: 42,
          },
          Select: {
            optionHeight: 20,
            optionPadding: '8px 12px',
            controlHeight: 42,
          },
          Button: {
            controlHeight: 42,
          },
        },
      }}
    >
      <InitializeProvider>
        <Notification />
        <FormCurrency />
      </InitializeProvider>
    </ConfigProvider>
  );
}

export default App;
