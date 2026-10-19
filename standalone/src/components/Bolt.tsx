export function Bolt({ className = "", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 120 400" fill="none" aria-hidden="true" className={className}>
      <path d="M78 0 L30 190 L62 190 L22 400 L100 150 L66 150 Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="miter" />
    </svg>
  );
}
