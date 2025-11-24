"use client";

import { ReactNode } from "react";

type ResultItem = {
  label: string;
  value: string;
  highlight?: boolean;
};

type Props =
  | { title: string; results: ResultItem[]; children?: never }
  | { title: string; children: ReactNode; results?: never };

// 숫자 자동 포맷팅 함수 (금액일 때만)
const formatValue = (value: string) => {
  // ❗ 금액(원)이 포함된 경우만 포맷팅
  if (value.includes("원")) {
    const numeric = Number(value.replace(/[^0-9.-]/g, ""));
    if (isNaN(numeric)) return value;
    const formatted = numeric.toLocaleString();
    return `${formatted} 원`;
  }

  // ❗ 금액이 아니라면 그대로 출력 (에어컨 종류 등)
  return value;
};

export default function ResultBox(props: Props) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
      <p className="font-bold text-lg text-blue-700 mb-2">{props.title}</p>

      {"results" in props && props.results ? (
        <ul className="space-y-1">
          {props.results.map((item, i) => (
            <li
              key={i}
              className={
                "text-gray-700 flex justify-between" +
                (item.highlight ? " font-bold text-blue-800 text-base" : "")
              }
            >
              <span>{item.label}</span>
              <span>{formatValue(item.value)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
}
