import Link from "next/link";
import type { Treino } from "@/lib/data";

interface TreinoCardProps {
  treino: Treino;
}

export default function TreinoCard({ treino }: TreinoCardProps) {
  return (
    <Link
      href={`/treinos/${treino.id}`}
      className="block rounded-2xl border border-[#222222]/10 bg-white p-5 shadow-sm transition-transform active:scale-[0.98] hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#ac1a1a] px-3 py-1 text-xs font-semibold text-white">
          {treino.diaAbrev} · {treino.diaSemana}
        </span>
        <span className="text-sm text-[#222222]/60">
          {treino.exercicios.length} exercícios
        </span>
      </div>
      <h2 className="mt-3 text-lg font-bold text-[#222222]">{treino.nome}</h2>
      <p className="mt-1 text-sm text-[#222222]/70">{treino.grupoMuscular}</p>
    </Link>
  );
}
