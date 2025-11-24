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
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-3 shadow-sm transition-all">
      <p className="font-bold text-lg text-blue-700 mb-2">{props.title}</p>

      {"results" in props && props.results ? (
        <ul className="space-y-2">
          {props.results.map((item, i) => {
            // ⭐ 프리미엄 Highlight Box
            if (item.highlight) {
              return (
                <li
                  key={i}
                  className="
                    bg-gradient-to-r from-blue-100 to-blue-200
                    border border-blue-300 
                    rounded-xl p-3
                    text-blue-900 font-extrabold text-base
                    flex justify-between items-center
                    shadow-md
                    transform animate-[fadeInScale_.35s_ease-out]
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
                className="
                  text-gray-700 flex justify-between items-center
                  transition-all
                "
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

/* ⭐ Tailwind 커스텀 keyframes (전역에 추가 필요 없음 — inline animation 사용) */

/*
fadeInScale 애니메이션은 다음과 같은 느낌:

0%   -> opacity: 0; scale: 0.97;
100% -> opacity: 1; scale: 1;

Tailwind arbitrary animation syntax:
animate-[fadeInScale_.35s_ease-out]
*/
