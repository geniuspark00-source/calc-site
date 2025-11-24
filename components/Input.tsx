"use client";

import { useState, useEffect, useRef } from "react";

type InputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  description?: string;        // ⬅ 추가
  error?: string;              // ⬅ 추가
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

  // 부모 value 변화 → display formatting
  useEffect(() => {
    if (value === 0) {
      setDisplay("");
    } else {
      setDisplay(value.toLocaleString());
    }
  }, [value]);

  // 숫자만 추출
  const normalizeNumber = (str: string) => {
    return str.replace(/,/g, "").replace(/\D/g, "");
  };

  // 천단위 콤마 formatting
  const formatNumber = (str: string) => {
    if (!str) return "";
    return Number(str).toLocaleString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = normalizeNumber(e.target.value);
    setDisplay(formatNumber(raw));
    onChange(raw === "" ? 0 : Number(raw));
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
      {/* label */}
      <label className="text-sm font-bold text-gray-900">{label}</label>

      {/* description */}
      {description && (
        <p className="text-xs text-gray-500 -mt-1">{description}</p>
      )}

      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
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

      {/* error message */}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
