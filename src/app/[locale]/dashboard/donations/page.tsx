import BreadcrumbDropdown from "@/components/breadcrumb-dropdown";
import Donations from "./donations";
import { Fragment } from "react";

export default async function Page() {
  // fake promise
  // await new Promise((resolve) => setTimeout(resolve, 100000));
  return (
    <Fragment>
      <BreadcrumbDropdown title="donations" dropdownItems={[]} />
      <Donations />
    </Fragment>
  );
}
