import { App, Breadcrumb, Card, Table } from "antd";
import cn from "./styles.module.scss";
import useProductColumns from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/api/product";
import { useState } from "react";
import type { GetProductsRequest, GetProductsResponse, ProductRecord } from "@/types/product";
import Paginaton from "@/components/pagination";
import EditDrawer from "./drawers/edit";
import queryClient from "@/lib/queryClient";
import type { AxiosResponse } from "axios";

interface EditDrawerState {
  open: boolean;
  data: ProductRecord | null;
}

const ProductContainer = () => {
  const { message } = App.useApp();
  const [editDrawer, setEditDrawer] = useState<EditDrawerState>({ open: false, data: null });
  const [params, setParams] = useState<Required<GetProductsRequest>>({
    limit: 25,
    skip: 0,
    select: "id,sku,title,price,stock,rating,brand,category",
  });
  const { columns } = useProductColumns({ handleEdit: (data: ProductRecord) => setEditDrawer({ open: true, data }) });

  const { data, isLoading } = useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    select: (data) => data.data,
  });

  const onChangePage = (limit: number, skip: number) => {
    setParams((prev) => ({ ...prev, limit, skip }));
  };

  const onSuccessEditProduct = (data: ProductRecord) => {
    // harusnya pakai invalidateQueries tapi karena server tidak update product, jadi pakai setQueryData
    // queryClient.invalidateQueries({ queryKey: ["product"] });

    queryClient.setQueryData(["products", params], (oldData: AxiosResponse<GetProductsResponse> | undefined) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        data: {
          ...oldData.data,
          products: oldData.data.products.map((item) => (item.id === data.id ? { ...item, ...data } : item)),
        },
      };
    });
    message.success("Product updated successfully");
  };

  return (
    <div className={cn.main}>
      <Breadcrumb
        items={[
          {
            title: "Product",
          },
        ]}
      />
      <div className={cn.content}>
        <Card classNames={{ root: cn.card, body: cn.cardBody }} title="Product List">
          <Table
            className={cn.table}
            scroll={{ x: true }}
            loading={isLoading}
            columns={columns}
            dataSource={data?.products}
            rowKey="id"
            pagination={false}
          />
          <Paginaton limit={params.limit} skip={params.skip} total={data?.total || 0} onChange={onChangePage} />
        </Card>
      </div>
      <EditDrawer
        open={editDrawer.open}
        onClose={() => setEditDrawer({ ...editDrawer, open: false })}
        data={editDrawer.data!}
        onSuccess={onSuccessEditProduct}
      />
    </div>
  );
};

export default ProductContainer;
