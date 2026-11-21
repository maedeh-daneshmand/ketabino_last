"use client";

import { useState } from "react";
import { Book } from "@/types";
import BookPreviewModal from "./BookPreviewModal";

interface BookSpine3DProps {
  book: Book;
  customLabel?: string;
  heightClass?: string;
  widthClass?: string;
  tiltAngle?: number;
  spineColor?: string;
  textColor?: string;
}

export default function BookSpine3D({
  book,
  customLabel,
  heightClass = "h-72 sm:h-84",
  widthClass = "w-11 sm:w-13",
  tiltAngle = 0,
  spineColor,
  textColor,
}: BookSpine3DProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Background gradient based on spineColor
  const bg = spineColor || book.spineColor || "#1e3f20";
  const fg = textColor || book.spineTextColor || "#f5efeb";

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className={`group relative ${widthClass} ${heightClass} flex-shrink-0 cursor-pointer select-none transition-all duration-300 transform rounded-t-sm rounded-b-sm`}
        style={{
          transform: `rotate(${tiltAngle}deg)`,
        }}
      >
        {/* Standing 3D Book Spine */}
        <div
          className="w-full h-full rounded-sm relative flex flex-col justify-between items-center py-4 px-1 shadow-md group-hover:-translate-y-4 group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300"
          style={{
            backgroundColor: bg,
            color: fg,
            boxShadow:
              "-5px 0 12px rgba(0,0,0,0.4), inset 3px 0 6px rgba(255,255,255,0.25), inset -3px 0 6px rgba(0,0,0,0.35)",
          }}
        >
          {/* Top Spine Ribs / Gold Emboss Lines */}
          <div className="w-full flex flex-col items-center gap-1 opacity-75">
            <div className="w-4/5 h-[1.5px] bg-honey-400/80 rounded" />
            <div className="w-4/5 h-[1.5px] bg-honey-400/80 rounded" />
          </div>

          {/* Vertical Book Title */}
          <div className="flex-1 flex items-center justify-center overflow-hidden my-2">
            <span
              className="text-xs sm:text-sm font-bold tracking-wide font-serif whitespace-nowrap text-center opacity-95 group-hover:opacity-100 transition-opacity"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              {customLabel || book.title}
            </span>
          </div>

          {/* Author or Publisher Mark at Bottom */}
          <div className="w-full flex flex-col items-center gap-1.5 opacity-80">
            <span
              className="text-[9px] font-sans truncate max-w-[40px] text-center"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              {book.author.split(" ")[0]}
            </span>
            <div className="w-3/5 h-[1px] bg-honey-400/80 rounded" />
          </div>

          {/* Spine light reflection highlight */}
          <div className="absolute inset-y-0 left-1 w-1 bg-white/20 rounded-full blur-[0.5px] pointer-events-none" />
        </div>

        {/* Shelf shadow under book */}
        <div className="absolute -bottom-2 inset-x-0 h-2 bg-black/40 blur-[3px] rounded-full group-hover:scale-75 group-hover:opacity-60 transition-all" />
      </div>

      <BookPreviewModal book={book} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
