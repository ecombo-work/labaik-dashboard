import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExpenseReportResponse } from "@/interfaces/reports";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function ExpensesTable({
  data,
  t,
}: {
  data: ExpenseReportResponse[];
  t: any;
}) {
  return (
    <Card className="mt-6">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-auto text-center">#</TableHead>
              <TableHead className="w-auto text-center">{t('term')}</TableHead>
              <TableHead className="w-auto text-center">
                {t('total_expense')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.term_id}>
                <TableCell className="font-medium text-center">
                  {item.term_id}
                </TableCell>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">
                  {Number(item.total_expense).toLocaleString()}{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-gray-50">
              <TableCell colSpan={2}>{t('total')}</TableCell>
              <TableCell className="text-right">
                {data
                  .reduce(
                    (total, item) => total + Number(item.total_expense),
                    0
                  )
                  .toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
