import React from "react";

function IconSidebar() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}
function IconChevronLeft() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.35 }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconRefresh() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 8 12 16" />
      <polyline points="8 12 12 16 16 12" />
    </svg>
  );
}
function IconShare() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconTabs() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="14" height="14" rx="2" />
      <path d="M16 3h3a2 2 0 0 1 2 2v3" />
      <path d="M22 8v5" />
      <path d="M16 21h3" />
    </svg>
  );
}

export default function BrowserMockup({
  url = "quickdrop.app",
  videoSrc,
  posterSrc,
  children,
}) {
  return (
    <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-[#d1d1d1] text-xs">
      {/* Safari Bar */}
      <div className="bg-[#f0f0f0] h-[36px] sm:h-[46px] flex items-center px-2 sm:px-3.5 gap-1.5 sm:gap-2.5 border-b border-[#d1d1d1]">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="flex gap-[5px] sm:gap-[7px] items-center">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[#6b6b6b] hidden sm:flex items-center cursor-pointer">
            <IconSidebar />
          </span>
          <div className="hidden sm:flex items-center text-[#6b6b6b]">
            <IconChevronLeft />
            <IconChevronRight />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-2">
          <span className="text-[#6b6b6b] flex items-center">
            <IconShield />
          </span>
          <div className="bg-[#e0e0e0] rounded-md h-[24px] sm:h-[30px] flex items-center px-2 sm:px-3 gap-1 sm:gap-2 w-full max-w-[280px] min-w-0">
            <span className="flex-1 text-[10px] sm:text-[12.5px] text-[#1f1f1f] text-center font-medium truncate">
              {url}
            </span>
            <span className="text-[#6b6b6b] hidden sm:flex items-center">
              <IconRefresh />
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 flex-shrink-0 text-[#6b6b6b]">
          <IconDownload />
          <IconShare />
          <IconPlus />
          <IconTabs />
        </div>
      </div>

      {/* Screen */}
      <div className="relative bg-[#f0f4ff]" style={{ aspectRatio: "16/9" }}>
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={posterSrc}
            controls
            className="w-full h-full object-cover"
          />
        ) : children ? (
          children
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <p className="text-white text-[13px] font-medium drop-shadow-md">
                Watch how it works
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
