const Pagination = ({ page, totalPages, onChange, loading = false }) => {
  if (totalPages <= 1) return null;

  const isFirst = page === 0;
  const isLast = page >= totalPages - 1;

  const btnBase =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium font-display " +
    "transition-all duration-200 border select-none";

  const activeBtn =
    btnBase +
    " border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-700 active:scale-95";

  const disabledBtn =
    btnBase + " border-zinc-200 bg-white text-zinc-300 cursor-not-allowed";

  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100">
      {/* ── Prev ── */}
      <button
        onClick={() => !isFirst && !loading && onChange(page - 1)}
        disabled={isFirst || loading}
        className={isFirst || loading ? disabledBtn : activeBtn}
        aria-label="Previous page"
      >
        {/* Arrow left */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M10 12L6 8l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Prev
      </button>

      {/* ── Page indicator ── */}
      <span className="text-sm text-zinc-400 font-mono">
        <span className="text-zinc-900 font-semibold">{page + 1}</span> /{" "}
        {totalPages}
      </span>

      {/* ── Next ── */}
      <button
        onClick={() => !isLast && !loading && onChange(page + 1)}
        disabled={isLast || loading}
        className={isLast || loading ? disabledBtn : activeBtn}
        aria-label="Next page"
      >
        Next
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
