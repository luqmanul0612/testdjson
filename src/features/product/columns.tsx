import type { ProductRecord } from "@/types/product";
import { Button, Tooltip, type TableColumnsType } from "antd";
import cn from "./styles.module.scss";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface Props {
  handleEdit: (data: ProductRecord) => void;
}

const useProductColumns = ({ handleEdit }: Props) => {
 
  const onClickEdit = (record: ProductRecord) => {
    handleEdit(record);
  };
  const columns: TableColumnsType<ProductRecord> = [
    {
      title: "No.",
      dataIndex: "id",
      render: (_, _record, index) => index + 1,
      fixed: "left",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      className: cn.noWrap,
    },
    {
      title: "Name",
      dataIndex: "title",
      className: cn.title,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => <span style={{ fontWeight: 700, fontSize: 13 }}>${price}</span>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (stock: number) => (
        <span className={clsx(cn.stock, { [cn.low]: stock < 10, [cn.medium]: stock >= 10 && stock < 50, [cn.high]: stock >= 50 })}>
          {stock}
        </span>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      render: (brand: string) => brand || "-",
      className: cn.noWrap,
    },
    {
      title: "Category",
      dataIndex: "category",
      className: cn.noWrap,
      render: (category: string) => category || "-",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (rating: number) => (
        <span style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>⭐ {rating}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: ProductRecord) => (
        <div className={cn.actions}>
          <Tooltip title="View">
            <Button
              className={cn.actionButton}
              type="primary"
              color="blue"
              variant="filled"
              onClick={() => onClickEdit(record)}
            >
              <EyeIcon className={cn.icon} />
            </Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              className={cn.actionButton}
              type="primary"
              color="blue"
              variant="filled"
              onClick={() => handleEdit(record)}
            >
              <PencilIcon className={cn.icon} />
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              className={cn.actionButton}
              type="primary"
              color="red"
              variant="filled"
              onClick={() => handleEdit(record)}
            >
              <TrashIcon className={cn.icon} />
            </Button>
          </Tooltip>
        </div>
      ),
      onCell: () => ({ onClick: (e: React.MouseEvent) => e.stopPropagation() }),
      fixed: "right",
    },
  ];
  return { columns };
};

export default useProductColumns;
