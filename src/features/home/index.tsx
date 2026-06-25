import { Breadcrumb } from "antd";
import cn from "./styles.module.scss";
import { useAuthStore } from "@/stores/auth";

const HomeContainer = () => {
  const auth = useAuthStore((state) => state.auth);
  return (
    <div className={cn.main}>
      <Breadcrumb
        items={[
          {
            title: "Home",
          },
        ]}
      />
      <div className={cn.content}>
        <h1>
          Welcome <span className={cn.name}>{`${auth?.firstName ?? ""} ${auth?.lastName ?? ""}`}</span>
        </h1>
      </div>
    </div>
  );
};

export default HomeContainer;
