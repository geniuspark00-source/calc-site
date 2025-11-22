"use client";

import { ReactNode } from "react";

type ResultItem = {
  label: string;
  value: string;
};

type Props =
  | { title: string; results: ResultItem[]; children?: never }
  | { title: string; children: ReactNode; results?: never };

// 🔥 숫자 자동 포맷팅 함수 추가
const formatValue = (value: string) => {
  // 숫자만 추출 (단위 제거)
  const numeric = Number(value.replace(/[^0-9.-]/g, ""));

  // 숫자가 아니면 그대로 출력
  if (isNaN(numeric)) return value;

  // 단위 추출 (숫자/쉼표/점 제거)
  const unit = value.replace(/[0-9., -]/g, "").trim();

  const formatted = numeric.toLocaleString();

  return unit ? `${formatted} ${unit}` : formatted;
};

export default function ResultBox(props: Props) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
      <p className="font-bold text-lg text-blue-700 mb-2">{props.title}</p>

      {"results" in props && props.results ? (
        <ul className="space-y-1">
          {props.results.map((item, i) => (
            <li key={i} className="text-gray-700">
              <strong>{item.label}</strong>: {formatValue(item.value)}
            </li>
          ))}
        </ul>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
}
