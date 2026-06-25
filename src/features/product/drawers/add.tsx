import type { ProductForm, ProductRecord } from "@/types/product";
import { postProduct } from "@/utils/api/product";
import { useMutation } from "@tanstack/react-query";
import { App, Button, Drawer, Form, Input } from "antd";
import cn from "./add.module.scss";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: ProductRecord) => void;
}

const AddProductDrawer = ({ open, onClose, onSuccess }: Props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<ProductForm>();

  const mutation = useMutation({
    mutationFn: (vars: ProductForm) => postProduct(vars),
    onSuccess: (res) => {
      onClose();
      onSuccess?.(res.data);
    },
    onError: () => {
      message.error("Failed to add product");
    },
  });

  const onFinish = (data: ProductForm) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open]);

  return (
    <Drawer
      title="Add Product"
      placement="right"
      onClose={onClose}
      open={open}
      size={400}
      zIndex={9999}
      footer={
        <div className={cn.footer}>
          <Button type="primary" onClick={() => form.submit()} loading={mutation.isPending}>
            Add
          </Button>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the product title!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the product description!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please input the product price!" }]}>
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item name="brand" label="Brand" rules={[{ required: true, message: "Please input the product brand!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please input the product category!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddProductDrawer;
