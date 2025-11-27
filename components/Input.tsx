"use client";

import { useState, useEffect, useRef } from "react";

type InputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  description?: string;
  error?: string;
};

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  description,
  error,
}: InputProps) {
  const [display, setDisplay] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 부모 value → display formatting
  useEffect(() => {
    if (value === 0) {
      setDisplay("");
    } else {
      setDisplay(formatNumber(value));
    }
  }, [value]);

  // 소수점 포함 숫자만 허용하도록 normalize 수정
  const normalizeNumber = (str: string) => {
    // 숫자와 소수점만 허용
    let v = str.replace(/,/g, "").replace(/[^0-9.]/g, "");

    // 소수점이 2개 이상 들어오면 마지막 . 제거
    const dots = v.match(/\./g);
    if (dots && dots.length > 1) {
      const lastDot = v.lastIndexOf(".");
      v = v.slice(0, lastDot) + v.slice(lastDot + 1);
    }

    return v;
  };

  // 천단위 콤마 formatting (소수점 유지)
  const formatNumber = (num: number | string) => {
    if (num === "" || num === null) return "";
    const [intPart, decimal] = num.toString().split(".");
    const formattedInt = Number(intPart).toLocaleString();

    return decimal ? `${formattedInt}.${decimal}` : formattedInt;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = normalizeNumber(e.target.value);

    setDisplay(formatNumber(raw));

    // 빈값 → 0
    if (raw === "") {
      onChange(0);
    } else {
      onChange(Number(raw));
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
    if (display === "0") setDisplay("");
  };

  const blockWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.preventDefault();
    (e.target as HTMLInputElement).blur();
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-bold text-gray-900">{label}</label>

      {description && (
        <p className="text-xs text-gray-500 -mt-1">{description}</p>
      )}

      <input
        ref={inputRef}
        type="text"
        className={`
          w-full border rounded p-2 mt-1
          text-gray-900 placeholder-gray-400
          transition-all outline-none
          ${error ? "border-red-400 focus:ring-2 ring-red-300"
                  : "border-gray-300 focus:ring-2 ring-blue-300"}
        `}
        value={display}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onWheel={blockWheel}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
