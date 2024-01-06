import React, { useEffect, useState } from "react";
import "../styles/layout.css";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  DatabaseOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../Redux/rootReducer";
const { Header, Sider, Content } = Layout;
const LayoutPage = ({ children }) => {
  const navigate=useNavigate();
  const {cardItems} = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const dispath=useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(()=>{
    localStorage.setItem('cardItems',JSON.stringify(cardItems))
  },[cardItems])
  const auth=localStorage.getItem('user');
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h5 className="text-center text-light font-weight-bold mt-4">POS</h5>
        </div>
        {auth?
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key={"/home"} icon={<HomeOutlined />}>
            
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key={"/bills"} icon={<DatabaseOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key={"/items"} icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key={"/custombers"} icon={<UserOutlined />}>
            <Link to="/custombers">Custombers</Link>
          </Menu.Item>
          <Menu.Item key={"/logout"} icon={<LogoutOutlined />}>
          <Link to="/logout">Logout</Link>
          </Menu.Item>

        </Menu>
        :navigate('/login')}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="card-item">
              <p>
                 <span className="m-2"> {cardItems.length}</span>
                 <span onClick={()=>navigate('/card')} style={{cursor:'pointer'}}><ShoppingOutlined /></span>
              </p>
              
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutPage;
