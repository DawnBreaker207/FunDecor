import {
  BarsOutlined,
  DashboardOutlined,
  LineChartOutlined,
  PoweroffOutlined,
  ProductOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//   getItem('Dashboard', '1', <PieChartOutlined />),
//   getItem('Products', '2', <DesktopOutlined />),
//   getItem('Category', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('User', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];

const LayoutAdmin: React.FC = () => {
  const navigate = useNavigate()
  const { Logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => {
            if (key === 'logout') {
              Logout()
            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <DashboardOutlined />,
              label: 'Dashboard'
            },
            {
              key: 'products',
              icon: <ProductOutlined />,
              label: 'Product',
              children: [

                { key: 'products/list', label: 'List' },
                { key: 'products/add', label: 'Add' },
              ]
            },
            {
              key: 'category',
              icon: <BarsOutlined />,
              label: 'Category',
              children: [
                { key: 'category/list', label: 'List' },
                { key: 'category/add', label: 'Add' },
              ]

            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: 'Admin',
              children: [
                { key: '4-1', label: 'List' }
              ]
            },
            {
              key: '5',
              icon: <LineChartOutlined />,
              label: 'Report'
            },
            {
              key: 'logout',
              icon: <PoweroffOutlined />,
              label: 'Sign Out',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[
            { title: 'User' },
            { title: 'Dashboard' },
          ]}>

          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          DawnBreaker ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;