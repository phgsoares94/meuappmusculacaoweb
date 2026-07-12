import Link from "next/link";
import type { Exercicio } from "@/lib/data";

interface ExercicioCardProps {
  exercicio: Exercicio;
  ordem: number;
}

const TIPO_LABEL: Record<Exercicio["tipo"], string | null> = {
  forca: "Força",
  finalizador: "Finalizador",
  normal: null,
};

export default function ExercicioCard({
  exercicio,
  ordem,
}: ExercicioCardProps) {
  const tipoLabel = TIPO_LABEL[exercicio.tipo];

  return (
    <Link
      href={`/exercicios/${exercicio.id}`}
      className="flex items-center gap-4 rounded-2xl border border-[#222222]/10 bg-white p-4 shadow-sm transition-transform active:scale-[0.98] hover:shadow-md"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7F7F7] text-sm font-bold text-[#ac1a1a]">
        {ordem}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-[#222222]">{exercicio.nome}</h3>
        <p className="text-sm text-[#222222]/70">
          {exercicio.series}x{exercicio.repeticoes}
          {tipoLabel && (
            <span className="ml-2 rounded-full bg-[#ac1a1a]/10 px-2 py-0.5 text-xs font-medium text-[#ac1a1a]">
              {tipoLabel}
            </span>
          )}
        </p>
      </div>
      <span className="shrink-0 text-[#222222]/30" aria-hidden>
        →
      </span>
    </Link>
  );
}
