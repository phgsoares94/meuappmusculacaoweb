import Link from "next/link";

interface HeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
}

export default function Header({ title, subtitle, backHref }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-[#ac1a1a] px-4 py-5 text-white shadow-md sm:px-6">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg transition-colors hover:bg-white/25"
              aria-label="Voltar"
            >
              ←
            </Link>
          )}
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold leading-tight sm:text-2xl">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-sm text-white/80">{subtitle}</p>
            )}
          </div>
        </div>
        <Link
          href="/calendario"
          className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-white/25 sm:text-sm"
        >
          Calendário
        </Link>
      </div>
    </header>
  );
}
