import { Table } from "@tanstack/react-table";
import React from "react";

function SelectedRows({ table, t }: { table: Table<any>; t: any }) {
  return (
    <div className="text-muted-foreground text-sm whitespace-nowrap">
      {t("selected_rows", {
        selected: table.getFilteredSelectedRowModel().rows.length,
        of: table.getFilteredRowModel().rows.length,
      })}
    </div>
  );
}

export default SelectedRows;
