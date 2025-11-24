import type React from "react";
import TestCalcCard from "@/components/cards/test-calcCard";

export type CalculatorCardItem = {
  slug: string;
  name: string;
  Card: React.ComponentType<any>;
};

export const calculatorCards: CalculatorCardItem[] = [
  { slug: "test-calc", name: "test calc 계산기", Card: TestCalcCard },
];
