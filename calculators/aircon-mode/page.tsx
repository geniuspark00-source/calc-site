import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./aircon-modeCalculatorUI";

export const metadata = generateCalculatorSEOTags("aircon-mode");

export default function Page() {
  return <CalculatorUI />;
}
