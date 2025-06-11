type UseDropdownOptions<T> = {
  type: string;
  payload?: Record<string, any>;
  enabled?: boolean;
  transform?: (raw: any[]) => T[];
};

export function useDropdownOptions<T = any>({
  type,
  payload = {},
  enabled = true,
  transform,
}: UseDropdownOptions<T>) {
  const { data } = useQuery({
    queryKey: [type, payload],
    queryFn: () => getDropdownData(type, payload),
    enabled,
  });

  return useMemo(() => {
    const rows = data?.data?.xdata?.rows ?? [];

    // Return transformed data if transform is given, else raw rows
    return transform ? transform(rows) : rows;
  }, [data, transform]);
}
