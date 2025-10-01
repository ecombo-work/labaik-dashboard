"use client";
import { Link, useRouter } from "@/i18n/navigation";
import { useGetCurrentUserQuery } from "@/lib/apis/auth";
import { useLoginAsMutation } from "@/lib/apis/user";
import { UserType } from "@/lib/roles";
import { IconLogin } from "@tabler/icons-react";
import { Row } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { LogIn } from "lucide-react";

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
  const base_path = is_full_path
    ? `/${path}/${row.getValue(id_path)}`
    : `${path}/${row.getValue(id_path)}`;
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
      {["edit", "delete", "view"].includes(icon) && (
        <Link href={full_path}>
          {icon === "edit" && <Edit2 className="size-6" />}
          {icon === "view" && <IconLogin className="size-6" />}
        </Link>
      )}
      {icon === "delete" && <Trash2 className="size-6" />}
    </div>
  );
}
export function DataTableLoginAsCell<TData>({ row }: { row: Row<TData> }) {
  const router = useRouter();
  const { refetch } = useGetCurrentUserQuery();
  const [loginAs, { isLoading: loginAsLoading }] = useLoginAsMutation();
  async function loginAsUser() {
    const { data } = await loginAs(row.getValue("user_id")).unwrap();
    const user_type = data?.user_type;
    let redirect_path = "error/unauthorized";
    if ([UserType.ADMIN, UserType.SUPER_ADMIN].includes(user_type!)) {
      redirect_path = "/dashboard/overview";
    }
    if ([UserType.CALL_SERVICE].includes(user_type!)) {
      redirect_path = "/dashboard/umrah/requests/current";
    }
    if ([UserType.ACCOUNTANT].includes(user_type!)) {
      redirect_path = "/dashboard/finance/accounts";
    }
    router.push(redirect_path);
    refetch()
      .unwrap()
      .then(() => router.refresh());
  }
  return (
    <div
      onClick={loginAsUser}
      className="flex-center cursor-pointer bg-transparent"
    >
      <div className="h-8 w-8">
        <LogIn className="size-6  rtl:rotate-180" />
      </div>
    </div>
  );
}
