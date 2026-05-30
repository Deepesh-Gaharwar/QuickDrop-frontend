import React from "react";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function InviteCode({ code }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg transition-colors">
      <h3 className="text-lg font-medium text-green-800">
        File Ready to Share!
      </h3>
      <p className="text-sm text-green-600 mb-3">
        Share this invite code with anyone you want to give access.
      </p>
      <div className="flex items-center">
        <div className="flex-1 bg-white p-3 rounded-l-md border border-r-0 border-gray-300 font-mono text-lg text-black transition-colors">
          {code}
        </div>
        <button
          onClick={copyToClipboard}
          className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md transition-colors"
          aria-label="Copy invite code"
        >
          {copied ? (
            <FiCheck className="w-7 h-7" />
          ) : (
            <FiCopy className="w-7 h-7" />
          )}
        </button>
      </div>
    </div>
  );
}
