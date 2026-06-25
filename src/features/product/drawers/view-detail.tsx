import type { ProductRecord } from "@/types/product";
import { getProduct } from "@/utils/api/product";
import { useQuery } from "@tanstack/react-query";
import { App, Drawer } from "antd";
import cn from "./view-detail.module.scss";
import ThumbnailImg from "@/components/thumbnail-img";
import clsx from "clsx";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  data: ProductRecord;
}

const ViewDetailProductDrawer = ({ open, onClose, data }: Props) => {
  const { message } = App.useApp();
  const query = useQuery({
    queryKey: ["product", data?.id],
    queryFn: () => getProduct(data?.id!),
    enabled: !!data?.id,
    select: (data) => data.data,
  });

  const stockClassName = clsx(cn.value, cn.stock, {
    [cn.low]: query.data?.stock && query.data.stock < 10,
    [cn.medium]: query.data?.stock && query.data.stock >= 10 && query.data.stock < 50,
    [cn.high]: query.data?.stock && query.data.stock >= 50,
  });

  useEffect(() => {
    if (query.isError) {
      onClose();
      message.error("Failed to fetch product data");
    }
  }, [query.isError]);

  return (
    <Drawer
      title="Product Detail"
      placement="right"
      onClose={onClose}
      open={open}
      size={600}
      zIndex={9999}
      loading={query.isLoading}
    >
      <div className={cn.detailContainer}>
        <ThumbnailImg
          src={query.data?.thumbnail!}
          alt={query.data?.title || "Product Image"}
          className={cn.thumbnail}
        />
        <div className={cn.detailItem}>
          <span className={cn.label}>Title</span>
          <span className={cn.value}>{query.data?.title || "-"}</span>
        </div>
        <div className={cn.detailItem}>
          <span className={cn.label}>Description</span>
          <span className={cn.value}>{query.data?.description || "-"}</span>
        </div>
        <div className={cn.detailItem}>
          <span className={cn.label}>Price</span>
          <span className={clsx(cn.value, cn.price)}>${query.data?.price || 0}</span>
        </div>
        <div className={cn.detailItem}>
          <span className={cn.label}>Brand</span>
          <span className={cn.value}>{query.data?.brand || "-"}</span>
        </div>
        <div className={cn.detailItem}>
          <span className={cn.label}>Category</span>
          <span className={cn.value}>{query.data?.category || "-"}</span>
        </div>
        <div className={cn.detailItem}>
          <span className={cn.label}>Stock</span>
          <span className={stockClassName}>{query.data?.stock || 0}</span>
          <span className={clsx(cn.value, cn.availability)}>{query.data?.availabilityStatus || ""}</span>
        </div>
        <div className={cn.detailItem}>
          <span className={cn.label}>Rating</span>
          <span className={clsx(cn.value, cn.rating)}>⭐ {query.data?.rating || 0}</span>
        </div>
        <div className={cn.detailItem}>
          <span className={cn.label}>Dimensions</span>
          <span className={cn.value}>
            {`Depth: ${query.data?.dimensions?.depth || 0}, Width: ${query.data?.dimensions?.width || 0}, Height: ${query.data?.dimensions?.height || 0}`}
          </span>
        </div>
      </div>
    </Drawer>
  );
};

export default ViewDetailProductDrawer;
