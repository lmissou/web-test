import { useState, type PropsWithChildren } from 'react';
import { Layout, Menu, type MenuProps } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { router, type RouteObjectWithMeta } from '@/router';
import { useLayoutStore } from '@/store/layout';

const { Header, Sider, Content } = Layout;

type MyLayoutProps = PropsWithChildren;

function MyLayout(props: MyLayoutProps) {
  const routes: RouteObjectWithMeta[] = router.routes;
  const [menuItems] = useState<MenuProps['items']>(() =>
    routes
      .filter((item) => item.path !== '/')
      .map((item) => ({
        key: item.path ?? '',
        label: item.meta?.title ?? item.id,
      }))
  );
  function handleClickMenu(info: { key: string }) {
    router.navigate(info.key);
  }
  const siderCollapsed = useLayoutStore((state) => state.siderCollapsed);
  const setSiderCollapsed = useLayoutStore((state: any) => state.setSiderCollapsed);
  return (
    <Layout>
      <Header className="bg-white! border-b border-gray-200">Header</Header>
      <Layout>
        <Sider
          className="bg-white!"
          collapsible
          collapsedWidth={0}
          collapsed={siderCollapsed}
          onCollapse={setSiderCollapsed}
          zeroWidthTriggerStyle={{
            top: '50%',
            right: '-0.6em',
            width: '1.5em',
            height: '1.5em',
            fontSize: '16px',
            color: 'black',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px 0px rgba(0, 0, 0, .06)',
            borderRadius: '50%',
            transition: 'transform .3s cubic-bezier(.4, 0, .2, 1)',
            transform: `rotate(${siderCollapsed ? 180 : 0}deg)`,
          }}
          trigger={<LeftOutlined />}
        >
          <Menu items={menuItems} onClick={handleClickMenu} />
        </Sider>
        <Content className="flex flex-col">
          <div className="flex flex-col flex-1 overflow-auto m-2.5 bg-white">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MyLayout;
