import { useMutation } from "@tanstack/react-query";
import { App, Modal } from "antd";

import { deleteProduct } from "@/utils/api/product";
import type { ProductRecord } from "@/types/product";
import { Button } from "antd";

interface Props {
  open: boolean;
  onClose: () => void;
  data: ProductRecord;
  onSuccess?: (id: number) => void;
}

const DeleteProductModal = ({ open, onClose, data, onSuccess }: Props) => {
  const { message } = App.useApp();
  const mutation = useMutation({
    mutationFn: () => deleteProduct(data?.id),
    onError: () => {
      message.error("Failed to delete product");
    },
    onSuccess: () => {
      onClose();
      onSuccess?.(data.id);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <Modal
      title="Delete Product"
      open={open}
      onCancel={onClose}
      zIndex={9999}
      centered
      mask={{ closable: !mutation.isPending }}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={mutation.isPending}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger onClick={handleDelete} loading={mutation.isPending}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this product?</p>
    </Modal>
  );
};

export default DeleteProductModal;
