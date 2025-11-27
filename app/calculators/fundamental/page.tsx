import { generateCalculatorSEOTags } from "@/lib/seo";
export const metadata = generateCalculatorSEOTags("fundamental");

import FundamentalCalculatorUI from "./fundamentalCalculatorUI";

export default function Page() {
  return <FundamentalCalculatorUI />;
}
