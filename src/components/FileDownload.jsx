import React from "react";
import { useState } from "react";

export default function FileDownload({
  onDownload,
  isDownloading,
  downloadProgress,
}) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDownload(code.trim());
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter 4-digit invite code"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        maxLength={4}
        disabled={isDownloading}
        className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
      />
      <button
        onClick={handleSubmit}
        disabled={isDownloading || !code.trim() || code.trim().length !== 4}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-80 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isDownloading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              />
            </svg>
            Downloading...
          </>
        ) : (
          "Download"
        )}
      </button>

      {isDownloading && downloadProgress > 0 && (
        <div className="w-full mt-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${downloadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">
            {downloadProgress}%
          </p>
        </div>
      )}
    </div>
  );
}
