import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useSearchDebounce = <T>(value: T, delay: number = 500) => {
  const [debouncedValue] = useDebounce(value, delay);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [debouncedValue]);

  return {
    debouncedValue,
    page,
    setPage,
  };
};