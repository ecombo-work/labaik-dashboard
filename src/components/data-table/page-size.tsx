import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "../ui/skeleton";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface DataTablePageSizeProps<TData> {
  table: Table<TData>;
  count?: number;
  pageSize?: number;
  is_loading?: boolean;
  onPageSizeChange?: (size: number) => void;
}

const STANDARD_PAGE_SIZES = [10, 25, 50, 100];

export function DataTablePageSize<TData>({
  table,
  count,
  pageSize,
  is_loading,
  onPageSizeChange,
}: Readonly<DataTablePageSizeProps<TData>>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlPageSize = searchParams.get("limit");
  const currentPageSize = table.getState().pagination.pageSize;

  // Set initial page size from URL or props
  useEffect(() => {
    if (urlPageSize) {
      const size = Number(urlPageSize);
      if (!isNaN(size)) {
        table.setPageSize(size);
      }
    } else if (pageSize) {
      table.setPageSize(pageSize);
    }
  }, [urlPageSize, pageSize, table]);

  const handlePageSizeChange = (value: string) => {
    const newPageSize = Number(value);
    table.setPageSize(newPageSize);

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newPageSize.toString());
    // Reset to first page when changing page size
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    // Notify parent component if needed
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  };

  // Don't render if count is too small
  if (count !== undefined && count <= 10) return null;

  // Determine the current page size to display
  const displayPageSize = urlPageSize ? Number(urlPageSize) : pageSize || 25;
  console.log("=====================================");
  console.log(currentPageSize);
  console.log("=====================================");
  return (
    <div className="flex items-center gap-2">
      {/* <span className="text-sm text-muted-foreground">Rows per page:</span> */}
      {is_loading ? (
        <Skeleton className="w-[100px] h-9" />
      ) : (
        <Select
          value={`${displayPageSize}`}
          onValueChange={handlePageSizeChange}
          disabled={is_loading}
        >
          <SelectTrigger className="w-[100px] !h-9 rounded-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="!w-[100px]">
            {STANDARD_PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
            {count && count > Math.max(...STANDARD_PAGE_SIZES) && (
              <SelectItem value={`${count}`}>{count}</SelectItem>
            )}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
