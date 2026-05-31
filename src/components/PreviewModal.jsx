import React from "react";

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileIcon = (fileName) => {
  const ext = fileName.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) return "🖼️";
  if (["mp4", "mov", "avi", "mkv"].includes(ext)) return "🎬";
  if (["mp3", "wav", "aac"].includes(ext)) return "🎵";
  if (["pdf"].includes(ext)) return "📄";
  if (["zip", "rar", "7z"].includes(ext)) return "🗜️";
  if (["doc", "docx"].includes(ext)) return "📝";
  if (["xls", "xlsx"].includes(ext)) return "📊";
  return "📁";
};

export default function PreviewModal({
  isOpen,
  onClose,
  files,
  code,
  onPreviewFile,
  onDownloadFile,
  onDownloadAll,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              Shared Files
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {files.length} file{files.length > 1 ? "s" : ""} · Code:{" "}
              <span className="font-mono font-medium text-blue-600">
                {code}
              </span>
            </p>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors text-sm leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* File List */}
        <ul className="divide-y max-h-96 overflow-y-auto">
          {files.map((file, idx) => (
            <li key={idx} className="px-6 py-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">
                  {getFileIcon(file.originalName)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {file.originalName}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-3 ml-9">
                {/* Preview */}
                <button
                  onClick={() => onPreviewFile(file.savedName)}
                  className="flex-1 text-xs px-3 py-2 border border-blue-500 text-blue-600 rounded-md transition-colors cursor-pointer"
                >
                  Preview
                </button>
                {/* Download */}
                <button
                  onClick={() => onDownloadFile(file.savedName)}
                  className="flex-1 text-xs px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Download
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <button
            onClick={() => {
              onClose();
              onDownloadAll();
            }}
            className="w-full text-sm bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Download All as ZIP
          </button>
        </div>
      </div>
    </div>
  );
}
