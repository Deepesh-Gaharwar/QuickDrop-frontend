import React, { useRef } from "react";

export default function OtpInput({ value, onChange, disabled }) {
  const inputRefs = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;

    const digit = val[val.length - 1];
    const newCode = value.split("");
    newCode[idx] = digit;
    const updated = newCode.join("");
    onChange(updated);

    if (idx < 3) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (value[idx]) {
        const newCode = value.split("");
        newCode[idx] = "";
        onChange(newCode.join(""));
      } else if (idx > 0) {
        const newCode = value.split("");
        newCode[idx - 1] = "";
        onChange(newCode.join(""));
        inputRefs.current[idx - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < 3) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    onChange(pasted.padEnd(4, "").slice(0, 4));
    const focusIdx = Math.min(pasted.length, 3);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-gray-500">Enter 4-digit invite code</p>
      <div className="flex gap-3">
        {[0, 1, 2, 3].map((idx) => (
          <input
            key={idx}
            ref={(el) => (inputRefs.current[idx] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[idx] || ""}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            onFocus={handleFocus}
            disabled={disabled}
            className="w-14 h-14 text-center text-xl font-semibold border-2 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        ))}
      </div>
    </div>
  );
}
