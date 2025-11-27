"use client";

import { useState, useEffect } from "react";

interface FloatInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  description?: string;
  error?: string;
}

export default function FloatInput({
  label,
  value,
  onChange,
  placeholder,
  description,
  error,
}: FloatInputProps) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (value === 0) setDisplay("");
    else setDisplay(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // ✔ 숫자 또는 . 만 허용
    const cleaned = raw.replace(/[^0-9.]/g, "");

    // ✔ 소수점은 1개만 허용
    const normalized = cleaned.replace(/(\..*)\./g, "$1");

    setDisplay(normalized);

    if (normalized === "" || normalized === ".") {
      onChange(0);
    } else {
      onChange(Number(normalized));
    }
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-bold text-gray-900">{label}</label>

      {description && (
        <p className="text-xs text-gray-500 -mt-1">{description}</p>
      )}

      <input
        type="text"
        className={`
          w-full border rounded p-2 mt-1
          text-gray-900 placeholder-gray-400
          transition-all outline-none
          ${error
            ? "border-red-400 focus:ring-2 ring-red-300"
            : "border-gray-300 focus:ring-2 ring-blue-300"}
        `}
        value={display}
        placeholder={placeholder}
        onChange={handleChange}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
