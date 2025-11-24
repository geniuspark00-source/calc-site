"use client";

import { ReactNode, useState } from "react";

type ResultItem = {
  label: string;
  value: string;
  highlight?: boolean;
};

type Props =
  | { title: string; results: ResultItem[]; children?: never }
  | { title: string; children: ReactNode; results?: never };

const formatValue = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.-]/g, ""));
  if (isNaN(numeric)) return value;
  return value.includes("원")
    ? `${numeric.toLocaleString()} 원`
    : numeric.toLocaleString();
};

export default function ResultBox(props: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm">
      {/* Title + Collapse */}
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold text-lg text-blue-700">{props.title}</p>

        <button
          onClick={() => setOpen(!open)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {open ? "접기 ▲" : "펼치기 ▼"}
        </button>
      </div>

      {open && (
        <>
          {"results" in props && props.results ? (
            <ul className="space-y-2 animate-fadeIn">
              {props.results.map((item, i) => {
                if (item.highlight) {
                  return (
                    <li
                      key={i}
                      className="
                        bg-gradient-to-r from-blue-100 to-blue-200
                        border border-blue-300 rounded-lg p-3
                        text-blue-900 font-semibold
                        flex justify-between
                        shadow-md animate-[fadeInScale_.35s_ease-out]
                      "
                    >
                      <span>{item.label}</span>
                      <span>{formatValue(item.value)}</span>
                    </li>
                  );
                }

                return (
                  <li
                    key={i}
                    className="flex justify-between text-gray-700 animate-fadeIn"
                  >
                    <span>{item.label}</span>
                    <span>{formatValue(item.value)}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="animate-fadeIn">{props.children}</div>
          )}
        </>
      )}
    </div>
  );
}
