import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./lottoCalculatorUI";

export const metadata = generateCalculatorSEOTags("lotto");

export default function Page() {
  return <CalculatorUI />;
}
