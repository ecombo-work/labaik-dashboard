import { Table } from "@tanstack/react-table";
import React from "react";

function SelectedRows({ table, t }: { table: Table<any>; t: any }) {
  const have_check_box = table
    .getFlatHeaders()
    .find((header) => header.id == "select");
  return (
    <div className="text-muted-foreground text-sm whitespace-nowrap px-2">
      {have_check_box &&
        table.getFilteredRowModel().rows.length > 0 &&
        t("selected_rows", {
          selected: table.getFilteredSelectedRowModel().rows.length,
          of: table.getFilteredRowModel().rows.length,
        })}
    </div>
  );
}

export default SelectedRows;
