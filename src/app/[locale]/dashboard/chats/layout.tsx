import BreadcrumbDropdown from "@/components/breadcrumb-dropdown";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container">
      <BreadcrumbDropdown title="chats" dropdownItems={[]} />
      {children}
    </section>
  );
}
