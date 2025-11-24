import { generateCalculatorSEOTags } from "@/lib/seo";
export const metadata = generateCalculatorSEOTags("wedding-cost");

import WeddingCostCalculatorUI from "./wedding-costCalculatorUI";

export default function Page() {
  return <WeddingCostCalculatorUI />;
}
