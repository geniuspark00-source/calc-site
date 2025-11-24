import WeddingCostCard from "@/components/cards/wedding-costCard";
import type React from "react";
import TestCalcCard from "@/components/cards/test-calcCard";

export type CalculatorCardItem = {
  slug: string;
  name: string;
  Card: React.ComponentType<any>;
};

export const calculatorCards: CalculatorCardItem[
  { slug: "wedding-cost", name: "wedding-cost 계산기", Card: WeddingCostCard },] = [
  { slug: "test-calc", name: "test calc 계산기", Card: TestCalcCard },
];
