"use client";

import { ReactNode } from "react";

type ResultItem = {
  label: string;
  value: string;
};

type Props =
  | { title: string; results: ResultItem[]; children?: never }
  | { title: string; children: ReactNode; results?: never };

export default function ResultBox(props: Props) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
      <p className="font-bold text-lg text-blue-700 mb-2">{props.title}</p>

      {"results" in props && props.results ? (
        <ul className="space-y-1">
          {props.results.map((item, i) => (
            <li key={i} className="text-gray-700">
              <strong>{item.label}</strong>: {item.value}
            </li>
          ))}
        </ul>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
}
