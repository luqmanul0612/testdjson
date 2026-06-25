import { Button, Layout, Menu, Popover, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { HomeIcon, CircleStackIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Content, Header } from "antd/es/layout/layout";
import cn from "./styles.module.scss";
import { useState } from "react";
import clsx from "clsx";
import { useAuthStore } from "@/stores/auth";
import { logout } from "@/utils/logout";

interface Props {
  children: React.ReactNode;
}

const LayoutComponent: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const auth = useAuthStore((state) => state.auth);
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "/",
      icon: <HomeIcon className={cn.icon} />,
      label: "Home",
      onClick: () => navigate({ to: "/" }),
    },
    {
      key: "/product",
      icon: <CircleStackIcon className={cn.icon} />,
      label: "Products",
      onClick: () => navigate({ to: "/product" }),
    },
  ];

  const selectedKey = items.find((item) => item?.key?.toString().startsWith(pathname))?.key?.toString() || "";

  return (
    <Layout>
      <Header className={cn.header}>
        <h1 className={cn.headerTitle}>dummyJSON</h1>
        <Popover content={ProfileContent} trigger="click" arrow={false}>
          <button className={cn.profileButton}>
            <div className={cn.info}>
              <p className={cn.name}>{`${auth?.firstName ?? ""} ${auth?.lastName ?? ""}`}</p>
              <p className={cn.role}>{auth?.role ?? ""}</p>
            </div>
            {auth?.image ? (
              <img src={auth.image} alt="user" className={cn.image} />
            ) : (
              <div className={cn.imageText}>{auth?.firstName?.charAt(0)}</div>
            )}
          </button>
        </Popover>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className={cn.sider}>
          <Menu mode="inline" selectedKeys={[selectedKey]} items={items} className={cn.menu} />
        </Sider>
        <Content className={clsx(cn.content, { [cn.collapsed]: collapsed })}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;

const ProfileContent = () => {
  return (
    <div className={cn.profileContent}>
      <Button color="danger" variant="solid" className={cn.logoutButton} onClick={logout}>
        Logout
      </Button>
    </div>
  );
};
