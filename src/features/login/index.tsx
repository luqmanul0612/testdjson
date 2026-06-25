import { App, Button, Form, Input } from "antd";
import cn from "./styles.module.scss";
import type { LoginForm } from "@/types/auth";
import { getAuthMe, postLogin } from "@/utils/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth";
import { useEffect } from "react";

const LoginContainer = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { message } = App.useApp();
  const search = useSearch({ strict: false });
  const messageParams = new URLSearchParams(search);
  const [form] = Form.useForm<LoginForm>();

  const auth = useMutation({
    mutationFn: getAuthMe,
    onSuccess: (res, vars) => {
      localStorage.setItem("token", vars?.accessToken || "");
      localStorage.setItem("refreshToken", vars?.refreshToken || "");
      setAuth(res.data);
      navigate({ to: "/" });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (body: LoginForm) => postLogin({ ...body, expiresInMins: 10 }),
    onSuccess: (res) => {
      auth.mutate(res.data);
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const onFinish = async (values: LoginForm) => {
    mutate(values);
  };

  useEffect(() => {
    const text = messageParams.get("message");
    if (text) {
      message.error(text);
      navigate({ to: "/login" });
    }
  }, []);

  return (
    <div className={cn.main}>
      <Form form={form} className={cn.loginCard} onFinish={onFinish} layout="vertical">
        <div className={cn.header}>
          <p className={cn.title}>Welcome to Test Dummy JSON</p>
          <p className={cn.subtitle}>Login</p>
        </div>
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username is required" }]}>
          <Input disabled={isPending || auth.isPending} placeholder="Input your username" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }]}>
          <Input.Password disabled={isPending || auth.isPending} placeholder="Input your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={cn.loginButton} loading={isPending || auth.isPending}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginContainer;
