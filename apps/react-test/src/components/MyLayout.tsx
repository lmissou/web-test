import type { PropsWithChildren } from 'react';
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

type MyLayoutProps = PropsWithChildren;

function MyLayout(props: MyLayoutProps) {
  return (
    <Layout>
      <Header className="bg-white!">Header</Header>
      <Layout>
        <Sider className="bg-white!">Sider</Sider>
        <Content className="flex flex-col">
          <div className="flex flex-col flex-1 overflow-auto m-2.5 bg-white">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MyLayout;
