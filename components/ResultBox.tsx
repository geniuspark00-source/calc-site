"use client";

import { ReactNode } from "react";

type ResultItem = {
  label: string;
  value: string;
  highlight?: boolean; // 🔥 highlight 옵션 추가
};

type Props =
  | { title: string; results: ResultItem[]; children?: never }
  | { title: string; children: ReactNode; results?: never };

// 🔥 숫자 자동 포맷팅 함수 (기존 그대로 사용)
const formatValue = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.-]/g, ""));

  if (isNaN(numeric)) return value;

  const unit = value.replace(/[0-9., -]/g, "").trim();
  const formatted = numeric.toLocaleString();

  return unit ? `${formatted} ${unit}` : formatted;
};

export default function ResultBox(props: Props) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
      {/* 제목 */}
      <p className="font-bold text-lg text-blue-700 mb-2">{props.title}</p>

      {/* 결과 리스트 */}
      {"results" in props && props.results ? (
        <ul className="space-y-1">
          {props.results.map((item, i) => (
            <li
              key={i}
              className={
                "text-gray-700 flex justify-between" +
                (item.highlight
                  ? " font-bold text-blue-800 text-base"
                  : "")
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
