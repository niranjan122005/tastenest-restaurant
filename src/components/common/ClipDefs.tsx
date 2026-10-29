/** Hidden SVG that defines the pinched "card" silhouettes referenced by .shape-card / .shape-wide. */
export function ClipDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="clip-card" clipPathUnits="objectBoundingBox">
          <path d="M0.14,0 C0.22,0.012 0.78,0.012 0.86,0 C0.97,-0.01 1,0.07 0.985,0.16 C0.955,0.32 0.955,0.68 0.985,0.84 C1,0.93 0.97,1.01 0.86,1 C0.78,0.988 0.22,0.988 0.14,1 C0.03,1.01 0,0.93 0.015,0.84 C0.045,0.68 0.045,0.32 0.015,0.16 C0,0.07 0.03,-0.01 0.14,0 Z" />
        </clipPath>
        <clipPath id="clip-wide" clipPathUnits="objectBoundingBox">
          <path d="M0.06,0 C0.2,0.03 0.8,0.03 0.94,0 C0.99,-0.01 1,0.08 0.99,0.2 C0.975,0.4 0.975,0.6 0.99,0.8 C1,0.92 0.99,1.01 0.94,1 C0.8,0.97 0.2,0.97 0.06,1 C0.01,1.01 0,0.92 0.01,0.8 C0.025,0.6 0.025,0.4 0.01,0.2 C0,0.08 0.01,-0.01 0.06,0 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
