import { redirect } from "next/navigation";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  return redirect(`/${locale}/login`);
}
