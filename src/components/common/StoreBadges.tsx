/** "Download" buttons (App Store / Google Play style) drawn with plain markup. */
function StoreBadge({ small, big }: { small: string; big: string }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="flex items-center gap-1.5 rounded-md border border-white/40 bg-black px-2.5 py-1 text-left text-white transition hover:bg-neutral-800"
    >
      <span className="text-lg leading-none" aria-hidden="true">{big === "App Store" ? "" : "▶"}</span>
      <span className="leading-none">
        <span className="block text-[8px] opacity-80">{small}</span>
        <span className="block text-sm font-semibold">{big}</span>
      </span>
    </a>
  );
}

export function StoreBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <StoreBadge small="Download on the" big="App Store" />
      <StoreBadge small="GET IT ON" big="Google Play" />
    </div>
  );
}
