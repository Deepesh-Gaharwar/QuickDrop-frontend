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
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-200 ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
      } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
    >
      <input {...getInputProps()} />
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

        {isUploading && uploadProgress > 0 && (
          <div className="w-full max-w-xs mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{uploadProgress}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
