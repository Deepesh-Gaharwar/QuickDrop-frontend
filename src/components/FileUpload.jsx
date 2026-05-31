import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

export default function FileUpload({
  onFileUpload,
  isUploading,
  uploadProgress,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) onFileUpload(acceptedFiles);
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full p-8 border-2 border-dashed rounded-lg text-center transition-colors duration-200 ${
        isUploading
          ? "border-gray-200 bg-gray-50 cursor-not-allowed"
          : isDragActive
            ? "border-blue-500 bg-blue-50 cursor-pointer"
            : "border-gray-300 hover:border-blue-500 hover:bg-gray-50 cursor-pointer"
      }`}
    >
      <input {...getInputProps()} />

      {isUploading ? (
        // Uploading state — replaces the normal drop zone content
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-gray-100 rounded-full">
            <svg
              className="animate-spin w-9 h-9 text-gray-400"
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
          </div>
          <p className="text-lg font-medium text-gray-400">
            Uploading files...
          </p>

          {uploadProgress > 0 && (
            <div className="w-full max-w-xs">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-400 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">{uploadProgress}%</p>
            </div>
          )}
        </div>
      ) : (
        // Normal idle state
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-blue-100 rounded-full transition-colors">
            <FiUpload className="w-9 h-9 text-blue-500" />
          </div>
          <p className="text-lg font-medium text-blue-500">
            {isDragActive
              ? "Drop your files here..."
              : "Drag & drop files here, or click to select"}
          </p>
          <p className="text-sm text-gray-500">
            Multiple files supported - shared securely with one invite code
          </p>
        </div>
      )}
    </div>
  );
}
