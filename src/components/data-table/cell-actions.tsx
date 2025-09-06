import { Link } from "@/i18n/navigation";
import { IconLogin } from "@tabler/icons-react";
import { Row } from "@tanstack/react-table";
import { Edit2 } from "lucide-react";

export function DataTableActionCell<TData>({
  row,
  path,
  id_path,
  icon = "edit",
  is_full_path = false,
  query = {},
}: {
  row: Row<TData>;
  path: string;
  id_path: string;
  is_full_path?: boolean;
  icon: "edit" | "delete" | "view";
  query?: Record<string, string | number | boolean>;
}) {
  const base_path = is_full_path ? `/${path}/${row.getValue(id_path)}` : `${path}/${row.getValue(id_path)}`;
  const urlParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlParams.append(key, String(value));
    }
  });
  const full_path = urlParams.toString() 
    ? `${base_path}?${urlParams.toString()}`
    : base_path;
  return (
    <div className="flex items-center justify-center">
      <Link href={full_path}>
        {icon === "edit" && <Edit2 className="size-6" />}
        {icon === "view" && <IconLogin className="size-6" />}
      </Link>
    </div>
  );
}
