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

// 숫자 자동 포맷팅 함수
const formatValue = (value: string) => {
  if (value.includes("원")) {
    const numeric = Number(value.replace(/[^0-9.-]/g, ""));
    if (isNaN(numeric)) return value;
    return `${numeric.toLocaleString()} 원`;
  }
  return value;
};

export default function ResultBox(props: Props) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-3">
      <p className="font-bold text-lg text-blue-700 mb-2">{props.title}</p>

      {"results" in props && props.results ? (
        <ul className="space-y-2">
          {props.results.map((item, i) => {
            if (item.highlight) {
              // ⭐ 하이라이트 박스 스타일
              return (
                <li
                  key={i}
                  className="
                    bg-blue-100 border border-blue-300 
                    rounded-lg p-3 
                    text-blue-900 font-bold text-base 
                    flex justify-between
                  "
                >
                  <span>{item.label}</span>
                  <span>{formatValue(item.value)}</span>
                </li>
              );
            }

            // 기본 스타일
            return (
              <li
                key={i}
                className="text-gray-700 flex justify-between"
              >
                <span>{item.label}</span>
                <span>{formatValue(item.value)}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
}
