"use client";

import { useState, useEffect } from "react";

interface InputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  description?: string;
  error?: string;
}

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  description,
  error,
}: InputProps) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (value === 0) {
      setDisplay("");
    } else {
      setDisplay(value.toLocaleString());
    }
  }, [value]);

  const normalizeNumber = (str: string) => {
    return str.replace(/,/g, "").replace(/\D/g, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = normalizeNumber(e.target.value);
    setDisplay(raw === "" ? "" : Number(raw).toLocaleString());

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
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
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
        onFocus={handleFocus}
        onWheel={blockWheel}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
