import type { ProductForm, ProductRecord } from "@/types/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Drawer, Form, Input, InputNumber } from "antd";
import { useEffect } from "react";
import cn from "./edit.module.scss";
import { getProduct, putProduct } from "@/utils/api/product";

interface Props {
  open: boolean;
  onClose: () => void;
  data: ProductRecord;
  onSuccess?: (data: ProductRecord) => void;
}

const EditDrawer = ({ open, onClose, data, onSuccess }: Props) => {
  const [form] = Form.useForm<ProductForm>();

  const query = useQuery({
    queryKey: ["product", data?.id],
    queryFn: () => getProduct(data?.id),
    select: (data) => data.data,
    enabled: open && !!data?.id,
  });

  const mutation = useMutation({
    mutationFn: (updatedData: ProductForm) => putProduct(data?.id, updatedData),
    onSuccess: (res) => {
      onClose();
      onSuccess?.(res.data);
    },
  });

  const onFinish = (data: ProductForm) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    form.resetFields();
    if (query.data) {
      form.setFieldsValue({
        title: query.data?.title || "",
        description: query.data?.description || "",
        price: query.data?.price || 0,
        brand: query.data?.brand || "",
        category: query.data?.category || "",
      });
    }
  }, [query.data]);

  return (
    <Drawer
      title="Edit Product"
      placement="right"
      onClose={onClose}
      open={open}
      size={400}
      zIndex={9999}
      forceRender
      loading={query.isLoading}
      mask={{ closable: false }}
      footer={
        <div className={cn.footer}>
          <Button type="primary" onClick={form.submit} loading={mutation.isPending} disabled={query.isLoading}>
            Save
          </Button>
          <Button onClick={onClose} className={cn.cancelButton} disabled={mutation.isPending || query.isLoading}>
            Cancel
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Title is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: "Price is required" }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Brand" name="brand" rules={[{ required: true, message: "Brand is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{ required: true, message: "Category is required" }]}>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditDrawer;
