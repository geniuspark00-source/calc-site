import { generateCalculatorSEOTags } from "@/lib/seo";
import CalculatorUI from "./test-calcCalculatorUI";

export const metadata = generateCalculatorSEOTags("test-calc");

export default function Page() {
  return <CalculatorUI />;
}
