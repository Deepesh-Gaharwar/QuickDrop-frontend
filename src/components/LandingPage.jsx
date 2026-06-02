import React from "react";
import { useNavigate } from "react-router-dom";
import { FiShield, FiZap, FiUserX } from "react-icons/fi";
import BrowserMockup from "./BrowserMockup";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 transition-colors duration-300 font-sans">
      <nav className="w-full px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            QuickDrop
          </span>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-8 pb-16">
        <header className="text-center mb-10 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-gray-800 to-blue-700 mb-6 tracking-tight leading-tight">
            File Sharing, <br /> Simplified.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 px-4">
            Secure, fast, and anonymous file sharing. Drop your files, generate
            a code, and share instantly without limits.
          </p>

          <button
            onClick={() => navigate("/app")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transform hover:-translate-y-1 cursor-pointer"
          >
            Start Sharing Files
          </button>
        </header>

        <div className="w-full max-w-4xl mb-20 px-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl blur opacity-20"></div>
            <div className="relative">
              <BrowserMockup
                url="quickdrop.app"
                videoSrc="/QuickDrop_Demo.mp4"
                posterSrc="/thumbnail.png"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          <div className="p-8 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <FiZap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Lightning Fast
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Upload multiple files at once with no bottlenecks. Speed is our
              priority.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <FiUserX className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              100% Anonymous
            </h3>
            <p className="text-gray-600 leading-relaxed">
              No accounts, no emails, no tracking. Just generate a secure
              4-digit code.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <FiShield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Auto-Deleting
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Your privacy matters. Files are automatically wiped from our
              servers after 24 hours.
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500 font-medium">
          QuickDrop &copy; {new Date().getFullYear()} - Built with the MERN
          Stack
        </p>
      </footer>
      
    </div>
  );
}
