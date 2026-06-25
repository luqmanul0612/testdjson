import useDebounceCallback from "@/hooks/use-debounce-callback";
import { Input } from "antd";
import { memo, useState } from "react";

interface Props {
  onChange: (value: string) => void;
}

const SearchInput = memo(({ onChange }: Props) => {
  const [value, setValue] = useState("");
  const debouncedOnChange = useDebounceCallback(onChange, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedOnChange(e.target.value);
  };

  return <Input.Search placeholder="Search product" value={value} onChange={handleChange} />;
});

export default SearchInput;
