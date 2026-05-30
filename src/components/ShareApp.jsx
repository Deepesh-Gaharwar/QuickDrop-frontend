import React from "react";
import { useState } from "react";
import axios from "axios";
import FileUpload from "./FileUpload";
import FileDownload from "./FileDownload";
import InviteCode from "./InviteCode";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

axios.defaults.withCredentials = true;

export default function ShareApp() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [inviteCode, setInviteCode] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleFileSelect = (files) => {
    const newFiles = Array.isArray(files) ? files : [files];
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setInviteCode(null);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadSubmit = async () => {
    if (uploadedFiles.length === 0) return;

    setIsUploading(true);
    setInviteCode(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => formData.append("file", file));

      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percentCompleted);
        },
      });

      setInviteCode(response.data.inviteCode);
    } catch (err) {
      alert("Failed to upload file. Try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDownload = async (code) => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const response = await axios.get(`${API_BASE_URL}/download/${code}`, {
        responseType: "blob",
        withCredentials: true,
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setDownloadProgress(percentCompleted);
          }
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const disposition = response.headers["content-disposition"];
      let filename = `files_${code}.zip`;
      if (disposition) {
        const match = disposition.match(/filename="(.+)"/);
        if (match) filename = match[1];
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to download file. Check the invite code.");
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-1 md:mt-2 md:py-12 max-w-4xl min-h-screen transition-colors">
      <header className="text-center mb-8 mt-12 md:mt-0">
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-blue-700">
          QuickDrop
        </h1>
        <p className="text-xl text-gray-600">File Sharing</p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 transition-colors duration-200">
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium cursor-pointer ${
              activeTab === "upload"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Share Files
          </button>
          <button
            className={`px-4 py-2 cursor-pointer font-medium ${
              activeTab === "download"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("download")}
          >
            Receive a File
          </button>
        </div>

        {activeTab === "upload" ? (
          <div>
            <FileUpload
              onFileUpload={handleFileSelect}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />

            {uploadedFiles.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md space-y-2 transition-colors">
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm text-gray-600"
                  >
                    <span>
                      {file.name} ({Math.round(file.size / 1024)} KB)
                    </span>
                    {!inviteCode && (
                      <button
                        onClick={() => removeFile(idx)}
                        disabled={isUploading}
                        className="text-red-500 hover:text-red-700 text-xs font-medium disabled:opacity-40 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                {!inviteCode && (
                  <button
                    onClick={handleUploadSubmit}
                    disabled={isUploading}
                    className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isUploading ? (
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
                        Uploading...
                      </>
                    ) : (
                      "Get Invite Code"
                    )}
                  </button>
                )}
              </div>
            )}

            {inviteCode && !isUploading && <InviteCode code={inviteCode} />}
          </div>
        ) : (
          <FileDownload
            onDownload={handleDownload}
            isDownloading={isDownloading}
            downloadProgress={downloadProgress}
          />
        )}
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>
          QuickDrop &copy; {new Date().getFullYear()} - Built with the MERN
          Stack
        </p>
      </footer>
    </div>
  );
}
