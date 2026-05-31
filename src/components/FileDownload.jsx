import React, { useState } from "react";
import axios from "axios";
import PreviewModal from "./PreviewModal";
import OtpInput from "./OtpInput";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

const Spinner = ({ className = "h-4 w-4 text-white" }) => (
  <svg
    className={`animate-spin ${className}`}
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
);

export default function FileDownload({
  onDownload,
  isDownloading,
  downloadProgress,
}) {
  const [code, setCode] = useState("");
  const [files, setFiles] = useState([]);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewError, setPreviewError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isComplete = code.length === 4 && !/\s/.test(code);

  const handleSubmit = (e) => {
    e.preventDefault();
    onDownload(code.trim());
  };

  const handlePreview = async () => {
    setIsPreviewing(true);
    setPreviewError("");
    setFiles([]);
    try {
      const response = await axios.get(`${API_BASE_URL}/files/${code.trim()}`, {
        withCredentials: true,
      });
      setFiles(response.data.files);
      setIsModalOpen(true);
    } catch {
      setPreviewError("Invalid code or files have expired.");
    } finally {
      setIsPreviewing(false);
    }
  };

  const openPreview = (savedName) => {
    window.open(`${API_BASE_URL}/file/${code.trim()}/${savedName}`, "_blank");
  };

  const downloadSingle = (savedName) => {
    const link = document.createElement("a");
    link.href = `${API_BASE_URL}/file/${code.trim()}/${savedName}?download=true`;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-5">
      <OtpInput
        value={code}
        onChange={(val) => {
          setCode(val);
          setPreviewError("");
        }}
        disabled={isDownloading || isPreviewing}
      />

      <div className="flex gap-2">
        {/* Preview Button */}
        <button
          onClick={handlePreview}
          disabled={isPreviewing || isDownloading || !isComplete}
          className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPreviewing ? (
            <>
              <Spinner className="h-4 w-4 text-blue-600" /> Loading...
            </>
          ) : (
            "Preview Files"
          )}
        </button>

        {/* Download All Button */}
        <button
          onClick={handleSubmit}
          disabled={isDownloading || !isComplete}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-80 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          {isDownloading ? (
            <>
              <Spinner /> Downloading...
            </>
          ) : (
            "Download All"
          )}
        </button>
      </div>

      {/* Download All Progress Bar */}
      {isDownloading && downloadProgress > 0 && (
        <div className="w-full">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">
            {downloadProgress}%
          </p>
        </div>
      )}

      {/* Preview Error */}
      {previewError && (
        <p className="text-sm text-red-500 text-center">{previewError}</p>
      )}

      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        files={files}
        code={code}
        onPreviewFile={openPreview}
        onDownloadFile={downloadSingle}
        onDownloadAll={() => onDownload(code.trim())}
      />
    </div>
  );
}
