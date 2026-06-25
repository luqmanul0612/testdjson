import cn from "./styles.module.scss";
import { Pagination as AntPagination, Select } from "antd";

interface Props {
  limit: number;
  skip: number;
  total: number;
  onChange: (limit: number, skip: number) => void;
}

const LIMITS = [10, 25, 50, 100];

const Paginaton: React.FC<Props> = ({ limit, skip, total, onChange }) => {
  const onChangePagination = (page: number, pageSize: number) => {
    onChange(pageSize, (page - 1) * pageSize);
  };

  return (
    <div className={cn.main}>
      <div className={cn.perPage}>
        Item per page <Select options={LIMITS.map((item) => ({ value: item, label: item }))} value={limit} />
        <p className={cn.pageInfo}>{`${skip + 1} - ${limit * (skip / limit + 1)} of ${total}`}</p>
      </div>
      <AntPagination
        showSizeChanger={false}
        current={skip / limit + 1}
        pageSize={limit}
        total={total}
        onChange={onChangePagination}
      />
    </div>
  );
};

export default Paginaton;
