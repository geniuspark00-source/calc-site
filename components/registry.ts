import type React from "react";

/*  
  계산기 카드 자동 등록용 기본 레지스트리 파일  
  - create-calculator.js 실행 시, 이 파일에 import + 목록 자동 추가됨  
  - 여기서는 기본 구조(타입, 빈 배열)만 선언  
*/

export type CalculatorCardItem = {
  slug: string;
  name: string;
  Card: React.ComponentType<any>;
};

// 최초에는 비어 있음 → 자동 생성기가 이 배열에 항목을 추가해준다.
export const calculatorCards: CalculatorCardItem[] = [];
