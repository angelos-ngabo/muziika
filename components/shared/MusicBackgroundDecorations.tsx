const EQ_HEIGHTS = [20, 40, 60, 80, 60, 40, 20, 30, 55, 75, 45, 25];

const FLOATING_SYMBOLS: { top: string; left?: string; right?: string; symbol: string }[] = [
  { top: "15%", left: "8%", symbol: "♪" },
  { top: "28%", right: "12%", symbol: "♫" },
  { top: "55%", left: "3%", symbol: "♩" },
  { top: "70%", right: "6%", symbol: "♬" },
  { top: "82%", left: "15%", symbol: "♪" },
  { top: "12%", left: "45%", symbol: "♫" },
  { top: "90%", right: "20%", symbol: "♩" },
  { top: "45%", right: "3%", symbol: "♬" },
];

export function MusicBackgroundDecorations() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <span className="absolute -left-10 -top-[60px] rotate-[-15deg] font-serif text-[320px] leading-none text-[#FF6B00] opacity-[0.04]">
        ♪
      </span>

      <span className="absolute -bottom-10 -right-5 rotate-[10deg] font-serif text-[280px] leading-none text-[#FF6B00] opacity-[0.04]">
        ♫
      </span>

      <svg
        className="absolute left-[6%] top-[40%] rotate-[-8deg] opacity-[0.06]"
        width="180"
        height="180"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect x="9" y="2" width="6" height="11" rx="3" stroke="#FF6B00" strokeWidth="1.5" />
        <path d="M12 13v4" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 21h8" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 17h6" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <div className="absolute right-12 top-[60px] flex items-end gap-[5px]">
        {EQ_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="w-[6px] rounded-[3px] bg-[#FF6B00] opacity-[0.08]"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>

      {FLOATING_SYMBOLS.map((item, i) => (
        <span
          key={i}
          className="absolute text-2xl text-[#FF6B00] opacity-[0.12]"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
          }}
        >
          {item.symbol}
        </span>
      ))}

      <svg
        className="absolute right-[4%] top-[35%] opacity-[0.04]"
        width="160"
        height="160"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M4 14v3a2 2 0 002 2h1M20 14v3a2 2 0 01-2 2h-1M4 14a8 8 0 0116 0M4 14V10a8 8 0 0116 0v4"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
