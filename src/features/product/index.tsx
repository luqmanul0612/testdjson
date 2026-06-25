import { App, Breadcrumb, Button, Card, Table } from "antd";
import cn from "./styles.module.scss";
import useProductColumns from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/api/product";
import { useState } from "react";
import type { GetProductsRequest, ProductRecord } from "@/types/product";
import Paginaton from "@/components/pagination";
import EditProductDrawer from "./drawers/edit";
import ViewDetailProductDrawer from "./drawers/view-detail";
import AddProductDrawer from "./drawers/add";
import DeleteProductModal from "./modals/delete";
import { addProductToCache, deleteProductFromCache, updateProductInCache } from "@/utils/update-product-cache";

interface DrawerState {
  open: boolean;
  type?: "add" | "edit" | "view-detail" | "delete";
  data: ProductRecord | null;
}

const ProductContainer = () => {
  const { message } = App.useApp();
  const [drawerState, setDrawerState] = useState<DrawerState>({
    open: false,
    data: null,
  });
  const [params, setParams] = useState<Required<GetProductsRequest>>({
    limit: 25,
    skip: 0,
    select: "id,sku,title,price,stock,rating,brand,category",
  });
  const { columns } = useProductColumns({
    handleViewDetail: (data: ProductRecord) => setDrawerState({ open: true, type: "view-detail", data }),
    handleEdit: (data: ProductRecord) => setDrawerState({ open: true, type: "edit", data }),
    handleDelete: (data: ProductRecord) => setDrawerState({ open: true, type: "delete", data }),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    select: (data) => data.data,
  });

  const onChangePage = (limit: number, skip: number) => {
    setParams((prev) => ({ ...prev, limit, skip }));
  };

  const onSuccessAddProduct = (data: ProductRecord) => {
    // harusnya pakai invalidateQueries tapi karena server tidak update product, jadi pakai setQueryData
    // queryClient.invalidateQueries({ queryKey: ["product"] });
    addProductToCache(data, params);
    message.success("Product added successfully");
  };

  const onSuccessEditProduct = (data: ProductRecord) => {
    // harusnya pakai invalidateQueries tapi karena server tidak update product, jadi pakai setQueryData
    // queryClient.invalidateQueries({ queryKey: ["product"] });
    updateProductInCache(data, params);
    message.success("Product updated successfully");
  };

  const onSuccessDeleteProduct = (id: number) => {
    // harusnya pakai invalidateQueries tapi karena server tidak update product, jadi pakai setQueryData
    // queryClient.invalidateQueries({ queryKey: ["product"] });
    deleteProductFromCache(id, params);
    message.success("Product deleted successfully");
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
        <Card
          classNames={{ root: cn.card, body: cn.cardBody }}
          title="Product List"
          extra={
            <Button type="primary" onClick={() => setDrawerState({ open: true, type: "add", data: null })}>
              Add Product
            </Button>
          }
        >
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
      <AddProductDrawer
        open={drawerState.open && drawerState.type === "add"}
        onClose={() => setDrawerState({ ...drawerState, open: false })}
        onSuccess={onSuccessAddProduct}
      />
      <EditProductDrawer
        open={drawerState.open && drawerState.type === "edit"}
        onClose={() => setDrawerState({ ...drawerState, open: false })}
        data={drawerState.data!}
        onSuccess={onSuccessEditProduct}
      />
      <ViewDetailProductDrawer
        open={drawerState.open && drawerState.type === "view-detail"}
        onClose={() => setDrawerState({ ...drawerState, open: false })}
        data={drawerState.data!}
      />
      <DeleteProductModal
        open={drawerState.open && drawerState.type === "delete"}
        onClose={() => setDrawerState({ ...drawerState, open: false })}
        data={drawerState.data!}
        onSuccess={onSuccessDeleteProduct}
      />
    </div>
  );
};

export default ProductContainer;
