import { ConfigProvider, type ThemeConfig } from 'antd';
import AppRouter from './router';
import MyLayout from './components/MyLayout';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#409EFF',
    colorBgBase: '#FFFFFF',
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <MyLayout>
        <AppRouter />
      </MyLayout>
    </ConfigProvider>
  );
}

export default App;
