const Loader = ({ variant = "spinner", size = "md", label = "Loading…" }) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-[3px]",
    lg: "w-16 h-16 border-4",
  };

  if (variant === "dots") {
    return (
      <div
        className="flex items-center gap-1.5"
        role="status"
        aria-label={label}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-2 h-2 rounded-full bg-zinc-500 animate-pulse-dot"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center gap-3"
      role="status"
    >
      <div
        className={`${sizes[size]} rounded-full border-zinc-200 border-t-accent animate-spin`}
      />
      <p className="text-sm text-zinc-400 font-body">{label}</p>
    </div>
  );
};

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface">
    <Loader
      size="lg"
      label="Loading your workspace…"
    />
  </div>
);

export default Loader;
