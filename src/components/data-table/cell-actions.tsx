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
}: {
  row: Row<TData>;
  path: string;
  id_path: string;
  is_full_path?: boolean;
  icon: "edit" | "delete" | "view";
}) {
  const full_path = is_full_path ? `/${path}/${row.getValue(id_path)}` : `${path}/${row.getValue(id_path)}`;
  return (
    <div className="flex items-center justify-center">
      <Link href={full_path}>
        {icon === "edit" && <Edit2 className="w-5 h-5" />}
        {icon === "view" && <IconLogin className="w-5 h-5" />}
      </Link>
    </div>
  );
}
